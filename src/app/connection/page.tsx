import { useSession } from "next-auth/react";

export default function ConnectionPage() {
  const { data: session } = useSession();
  return (
    <main>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
      {session ? <p>{session.user.name}</p> : null}
    </main>
  );
}
