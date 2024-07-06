import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ChatPresence from "./ChatPresence";

export default async function ChatHeader() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="h-20">
      <div className="p-5 border-b flex justify-between items-center h-full">
        <div>
          <h1 className="text-xl font-bold">Hoopchat</h1>
          {/* <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-sm text-gray-400">2 onlines</h1>
          </div> */}
          <ChatPresence/>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user !== null ? (
            <form action={signOut} className="flex items-center gap-2">
              <p>{user.email}</p>
              <Button variant="outline">Sign Out</Button>
            </form>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
