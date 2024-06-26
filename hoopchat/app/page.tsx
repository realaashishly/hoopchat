import React from "react";
import ChatHeader from "@/components/ChatHeader"; 
import { createClient } from "@/lib/supabase/client";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = createClient();
  // const { data, error } = await supabase.auth.getUser();
  // if (!data?.user) {
  //   console.log("first")
  // }
  
  // const supabase = supabaseServer();
  const { data } = await supabase.auth.getSession();
  console.log(data.session?.user);

  return (
    <div className="max-w-3xl mx-auto md:py-10 h-screen">
      <div className="h-full border rounded-md">
        <ChatHeader />
      </div>
    </div>
  );
}
