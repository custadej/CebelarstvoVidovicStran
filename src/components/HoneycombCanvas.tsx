"use client";

import { useEffect, useRef } from "react";

type Props = { colors: string[]; active: number; onSelect: (index: number) => void };

// The 3D honeycomb: each cell belongs to one honey (same mapping as the SVG fallback). Hovering lifts that
// honey's cells a little, clicking selects it, the selected honey stays raised and brighter.
// Loads three.js only on wide screens with motion allowed; the SVG underneath is the fallback and the phone version.
export function HoneycombCanvas({ colors, active, onSelect }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const selectRef = useRef(onSelect);

  useEffect(() => {
    activeRef.current = active;
    selectRef.current = onSelect;
  }, [active, onSelect]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!window.matchMedia("(min-width: 768px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) {
      return;
    }

    let disposed = false;
    let dispose: (() => void) | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        void init();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);

    async function init() {
      const THREE = await import("three");
      if (disposed || !el) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block;opacity:0;transition:opacity 700ms cubic-bezier(0.16,1,0.3,1)";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 5.9, 5.3);
      camera.lookAt(0, 0, 0.2);

      scene.add(new THREE.AmbientLight(0xfff1d6, 1.5));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(-4, 9, 5);
      scene.add(key);
      const glow = new THREE.PointLight(0xffc35a, 30, 30);
      glow.position.set(5, 4, 3);
      scene.add(glow);

      const group = new THREE.Group();
      scene.add(group);

      const R = 0.62;
      const DEPTH = 0.9;
      const cols = 9;
      const rows = 3;
      const wallGeo = new THREE.CylinderGeometry(R, R, DEPTH, 6, 1, true);
      const floorGeo = new THREE.CylinderGeometry(R, R, 0.06, 6);
      const honeyGeo = new THREE.CylinderGeometry(R * 0.93, R * 0.93, 1, 6);
      const wax = new THREE.MeshStandardMaterial({ color: 0xf0d9a0, roughness: 0.55, side: THREE.DoubleSide });

      type Cell = { root: import("three").Group; honey: import("three").Mesh; mat: import("three").MeshStandardMaterial; delay: number; index: number; lift: number; glow: number };
      const cells: Cell[] = [];
      const pickable: import("three").Object3D[] = [];
      const w = Math.sqrt(3) * R;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c - (cols - 1) / 2) * w + (r % 2 ? w / 2 : 0);
          const z = (r - (rows - 1) / 2) * 1.5 * R;
          const t = (c + (r % 2 ? 0.5 : 0)) / (cols - 0.5);
          const index = Math.min(colors.length - 1, Math.round(t * (colors.length - 1)));
          const root = new THREE.Group();
          root.position.set(x, 0, z);
          root.rotation.y = Math.PI / 6;
          const wall = new THREE.Mesh(wallGeo, wax);
          const floor = new THREE.Mesh(floorGeo, wax);
          floor.position.y = -DEPTH / 2;
          const color = new THREE.Color(colors[index]);
          const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.12, metalness: 0.05, emissive: color, emissiveIntensity: 0.12 });
          const honey = new THREE.Mesh(honeyGeo, mat);
          honey.scale.y = 0.001;
          honey.position.y = -DEPTH / 2;
          root.add(wall, floor, honey);
          for (const m of [wall, floor, honey]) {
            m.userData.index = index;
            pickable.push(m);
          }
          group.add(root);
          cells.push({ root, honey, mat, delay: t * 0.55 + r * 0.06, index, lift: 0, glow: 0.12 });
        }
      }

      let raf = 0;
      let visible = false;
      let tiltX = 0;
      let tiltY = 0;
      let targetX = 0;
      let targetY = 0;
      let shown = false;
      let hovered = -1;
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();

      const size = () => {
        const { width, height } = el.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        const fit = Math.max(1, 3 / camera.aspect);
        camera.position.z = 5.3 * fit;
        camera.position.y = 5.9 * fit;
        camera.updateProjectionMatrix();
      };

      const frame = () => {
        raf = 0;
        if (!visible) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.85)));
        const sel = activeRef.current;
        for (const cell of cells) {
          const k = Math.min(1, Math.max(0, (p * 1.7 - cell.delay) / 0.6));
          const eased = 1 - Math.pow(1 - k, 3);
          const h = Math.max(0.001, eased * DEPTH * 0.86);
          cell.honey.scale.y = h;
          cell.honey.position.y = -DEPTH / 2 + h / 2;
          const on = cell.index === sel;
          const over = cell.index === hovered;
          cell.lift += ((on ? 0.2 : over ? 0.09 : 0) - cell.lift) * 0.16;
          cell.glow += ((on ? 0.42 : over ? 0.26 : 0.1) - cell.glow) * 0.16;
          cell.root.position.y = cell.lift;
          cell.mat.emissiveIntensity = cell.glow;
        }
        tiltX += (targetX - tiltX) * 0.06;
        tiltY += (targetY - tiltY) * 0.06;
        group.rotation.x = tiltY * 0.08;
        group.rotation.y = -0.12 + tiltX * 0.16 + (p - 0.5) * 0.12;
        renderer.render(scene, camera);
        if (!shown) {
          shown = true;
          renderer.domElement.style.opacity = "1";
          el.dataset.ready = "1";
        }
        raf = requestAnimationFrame(frame);
      };
      const kick = () => {
        if (!raf && visible) raf = requestAnimationFrame(frame);
      };

      const pick = (e: PointerEvent | MouseEvent) => {
        const rect = el.getBoundingClientRect();
        ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        const hit = raycaster.intersectObjects(pickable, false)[0];
        return hit ? (hit.object.userData.index as number) : -1;
      };
      const onWindowPointer = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        targetX = (e.clientX - rect.left) / rect.width - 0.5;
        targetY = (e.clientY - rect.top) / rect.height - 0.5;
      };
      const onMove = (e: PointerEvent) => {
        hovered = pick(e);
        el.style.cursor = hovered >= 0 ? "pointer" : "";
      };
      const onLeave = () => {
        hovered = -1;
        el.style.cursor = "";
      };
      const onClick = (e: MouseEvent) => {
        const index = pick(e);
        if (index >= 0) selectRef.current(index);
      };

      const viewIo = new IntersectionObserver((entries) => {
        visible = entries.some((e) => e.isIntersecting);
        kick();
      });
      viewIo.observe(el);
      const ro = new ResizeObserver(size);
      ro.observe(el);
      window.addEventListener("pointermove", onWindowPointer, { passive: true });
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("click", onClick);
      size();

      dispose = () => {
        cancelAnimationFrame(raf);
        viewIo.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onWindowPointer);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("click", onClick);
        wallGeo.dispose();
        floorGeo.dispose();
        honeyGeo.dispose();
        wax.dispose();
        cells.forEach((c) => c.mat.dispose());
        renderer.dispose();
        renderer.domElement.remove();
        delete el.dataset.ready;
      };
      if (disposed) dispose();
    }

    return () => {
      disposed = true;
      io.disconnect();
      dispose?.();
    };
  }, [colors]);

  return <div ref={host} className="honeycomb-canvas absolute inset-0" aria-hidden="true" />;
}
