import { HoneyList, listMeta } from "@/views/Honey";

export const metadata = listMeta("sl");

export default function Page() {
  return <HoneyList lang="sl" />;
}
