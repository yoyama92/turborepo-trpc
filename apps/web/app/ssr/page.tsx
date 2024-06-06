import styles from "../page.module.css";
import { trpc } from "@/utils/trpc";

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
      <div>Server Component</div>
      <div>{user && JSON.stringify(user, null, 2)}</div>
    </main>
  );
}
