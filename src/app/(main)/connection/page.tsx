import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function ConnectionPage() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
      {session ? <p>{session.user.name}</p> : null}
    </main>
  );
}
