import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import CodeSnippetForm  from "@/components/code-snippet-form"

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col w-screen">
      <div className="w-1/2 space-y-8">
        <h2 className="font-bold text-2xl mb-4">Welcome back</h2>
        <CodeSnippetForm />
      </div>
    </div>
  );
}
