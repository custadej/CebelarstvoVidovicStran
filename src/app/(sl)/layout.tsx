import type { ReactNode } from "react";
import { layoutMeta, Shell } from "@/components/Shell";

export { viewport } from "@/components/Shell";
export const metadata = layoutMeta("sl");

export default function Layout({ children }: { children: ReactNode }) {
  return <Shell lang="sl">{children}</Shell>;
}
