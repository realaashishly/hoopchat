"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import React from "react";

export default function ChatHeader() {

  const handleLoginWithGithub = () => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  }; 

  return (
    <div className="h-20">
      <div className="p-5 border-b flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Hoopchat</h1>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-sm text-gray-400">2 onlines</h1>
          </div>
        </div>
        <Button variant="outline" onClick={handleLoginWithGithub}>
          Login
        </Button>
      </div>
    </div>
  );
}
