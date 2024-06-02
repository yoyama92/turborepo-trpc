"use client";

import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import { trpc } from "@/utils/trpc";
import { LoginButton } from "@/components/login-btn";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <LoginButton className={styles.button} />
      <Button
        className={styles.button}
        onClick={() => {
          trpc.getUser
            .query()
            .then((user) => {
              window.alert(JSON.stringify(user, null, 2));
            })
            .catch((error) => {
              window.alert(JSON.stringify(error, null, 2));
            });
        }}
      >
        Click me!
      </Button>
    </main>
  );
}
