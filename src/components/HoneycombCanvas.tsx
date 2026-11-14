"use client";

import { useEffect, useRef } from "react";

type Props = { colors: string[] };

// One 3D moment: a slab of honeycomb whose cells fill with the six honey colours as it scrolls in.
// Loads three.js only on wide screens with motion allowed; the SVG underneath is the fallback.
export function HoneycombCanvas({ colors }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (
      !window.matchMedia("(min-width: 768px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      nav.connection?.saveData
    ) {
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

      const lerpColor = (t: number) => {
        const x = t * (colors.length - 1);
        const i = Math.min(Math.floor(x), colors.length - 2);
        return new THREE.Color(colors[i]).lerp(new THREE.Color(colors[i + 1]), x - i);
      };

      const cells: { honey: import("three").Mesh; delay: number }[] = [];
      const w = Math.sqrt(3) * R;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c - (cols - 1) / 2) * w + (r % 2 ? w / 2 : 0);
          const z = (r - (rows - 1) / 2) * 1.5 * R;
          const cell = new THREE.Group();
          cell.position.set(x, 0, z);
          cell.rotation.y = Math.PI / 6;
          const wall = new THREE.Mesh(wallGeo, wax);
          const floor = new THREE.Mesh(floorGeo, wax);
          floor.position.y = -DEPTH / 2;
          const t = (c + (r % 2 ? 0.5 : 0)) / (cols - 0.5);
          const honey = new THREE.Mesh(
            honeyGeo,
            new THREE.MeshStandardMaterial({ color: lerpColor(t), roughness: 0.12, metalness: 0.05, emissive: lerpColor(t), emissiveIntensity: 0.12 }),
          );
          honey.scale.y = 0.001;
          honey.position.y = -DEPTH / 2;
          cell.add(wall, floor, honey);
          group.add(cell);
          cells.push({ honey, delay: t * 0.55 + r * 0.06 });
        }
      }

      let raf = 0;
      let visible = false;
      let tiltX = 0;
      let tiltY = 0;
      let targetX = 0;
      let targetY = 0;
      let shown = false;

      const size = () => {
        const { width, height } = el.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        // keep the slab inside narrower canvases
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
        for (const { honey, delay } of cells) {
          const k = Math.min(1, Math.max(0, (p * 1.7 - delay) / 0.6));
          const eased = 1 - Math.pow(1 - k, 3);
          const h = Math.max(0.001, eased * DEPTH * 0.86);
          honey.scale.y = h;
          honey.position.y = -DEPTH / 2 + h / 2;
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

      const onPointer = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        targetX = (e.clientX - rect.left) / rect.width - 0.5;
        targetY = (e.clientY - rect.top) / rect.height - 0.5;
      };
      const viewIo = new IntersectionObserver((entries) => {
        visible = entries.some((e) => e.isIntersecting);
        kick();
      });
      viewIo.observe(el);
      const ro = new ResizeObserver(size);
      ro.observe(el);
      window.addEventListener("pointermove", onPointer, { passive: true });
      size();

      dispose = () => {
        cancelAnimationFrame(raf);
        viewIo.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        wallGeo.dispose();
        floorGeo.dispose();
        honeyGeo.dispose();
        wax.dispose();
        cells.forEach(({ honey }) => (honey.material as import("three").Material).dispose());
        renderer.dispose();
        renderer.domElement.remove();
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
