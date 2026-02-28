"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NavBar() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/create" className="text-lg font-bold text-gray-900">
          Listeso Pets Rate Things
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/create"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Create
          </Link>
          <Link
            href="/history"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            History
          </Link>
          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
