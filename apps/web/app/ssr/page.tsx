import { trpc } from "@/utils/trpc";
import type { JSX } from "react";
import styles from "../page.module.css";

const fetchUser = async () => {
  try {
    return await trpc.getUser.query();
  } catch {
    return undefined;
  }
};

const Page = async (): Promise<JSX.Element> => {
  const user = await fetchUser();
  return (
    <main className={styles.main}>
      <div>Server Component</div>
      <div>{user && JSON.stringify(user, null, 2)}</div>
    </main>
  );
};

// biome-ignore lint/style/noDefaultExport: <explanation>
export default Page;
