import { LIMIT_MESSAGE } from "@/lib/constants";
import InitMessages from "@/utils/store/InitMessages";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import ListMessages from "./ListMessages";

export default async function ChatMessages() {
    const supabase = createClient();
    const { data } = await supabase
		.from("messages")
		.select("*,user(*)")
		.range(0, LIMIT_MESSAGE)
		.order("created_at", { ascending: false });

    return (
        <Suspense fallback={"loading.."}>
            <ListMessages />
            <InitMessages messages={data?.reverse() || []} />
        </Suspense>
    );
}
