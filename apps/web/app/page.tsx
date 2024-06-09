"use client";

import { LoginButton } from "@/components/login-btn";
import { errorHandler, trpc } from "@/utils/trpc";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import type { JSX } from "react";
import styles from "./page.module.css";

const Page = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <LoginButton className={styles.button} />
      <Button className={styles.button}>
        <Link href="/ssr">SSRページ</Link>
      </Button>
      <Button
        className={styles.button}
        onClick={() => {
          trpc.getUser
            .query()
            .then((user) => {
              window.alert(JSON.stringify(user, null, 2));
            })
            .catch(
              errorHandler((error) => {
                window.alert(JSON.stringify(error.meta.responseJSON, null, 2));
              }),
            );
        }}
      >
        Click me!
      </Button>
    </main>
  );
};

// biome-ignore lint/style/noDefaultExport: <explanation>
export default Page;
