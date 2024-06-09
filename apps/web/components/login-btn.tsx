"use client";

import { Button } from "@repo/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export const LoginButton = ({ className }: { className?: string }) => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Button className={className} onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button className={className} onClick={() => signIn("github")}>
        Sign in
      </Button>
    </>
  );
};
