'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import ProjectsCrud from "./ProjectsCrud";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <button onClick={() => signIn()}>Sign in with Keycloak</button>;

  // Check for admin role
  if (!session.user?.roles?.includes("admin")) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>Admin Project Management</h1>
      <button onClick={() => signOut()}>Sign out</button>
      <ProjectsCrud />
    </div>
  );
}
