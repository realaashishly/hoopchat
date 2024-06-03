import React from "react";
import { Button } from "@/components/ui/button";
// import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto md:py-10 h-screen">
      <div className="h-full border rounded-md">
        <div className="h-20">
          <div className="p-5 border-b flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Hoopchat</h1>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <h1 className="text-sm text-gray-400">2 onlines</h1>
              </div>
            </div>
            <Button variant="outline">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
