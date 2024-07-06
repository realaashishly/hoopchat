"use client";
import { supabaseBrowser } from "@/utils/supabase/browser";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/utils/store/user";
import { Imessage, useMessage } from "@/utils/store/messages";

export default async function ChatInput() {
    const supabase = supabaseBrowser();

    const user = useUser((state) => state.user);
    const addMessage = useMessage((state) => state.addMessage);
    const setOptimisticIds = useMessage((state) => state.setOptimisticIds);

    const handleSendMessage = async (text: string) => {
        if (text.trim()) {
            const id = uuidv4();
            const newMessage = {
                id,
                text,
                send_by: user?.id,
                is_edit: false,
                created_at: new Date().toISOString(),
                user: {
                    id: user?.id,
                    email: user?.user_metadata.email,
                    avatar_url: user?.user_metadata.avatar_url,
                    created_at: new Date().toISOString(),
                    username: user?.user_metadata.username,
                },
            };
            addMessage(newMessage as Imessage);
            setOptimisticIds(newMessage.id);
            const { error } = await supabase
                .from("messages")
                .insert({ text, id });
            if (error) {
                toast.error(error.message);
            }
        } else {
            toast.error("Message can not be empty!!");
        }
    };

    return (
        <div className='p-5 relative'>
            <Input
                placeholder='send message'
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendMessage(e.currentTarget.value);
                        e.currentTarget.value = "";
                    }
                }}
            />
        </div>
    );
}
