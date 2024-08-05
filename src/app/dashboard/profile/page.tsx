"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Hello Page</h1>
      <hr />
      <div className="flex flex-col">
        <span>{session?.user?.name || "no data"}</span>
        <span>{session?.user?.email || "no data"}</span>
        <span>{session?.user?.image || "no data"}</span>
        <span>{session?.user?.roles.join(",") ?? "no-roles"}</span>
        <span>{session?.user.id ?? "no id"}</span>
      </div>
    </div>
  );
}
