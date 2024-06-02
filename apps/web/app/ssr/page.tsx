import styles from "../page.module.css";
import { trpc } from "@/utils/serverTrpc";

const fetchUser = async () => {
  try {
    return await trpc.getUser.query();
  } catch (error) {
    return undefined;
  }
};

export default async function Page(): Promise<JSX.Element> {
  const user = await fetchUser();
  return (
    <main className={styles.main}>
      <div>{user && JSON.stringify(user, null, 2)}</div>
    </main>
  );
}
