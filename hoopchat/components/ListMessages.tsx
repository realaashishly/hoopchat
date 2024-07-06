"use client";

import { Imessage, useMessage } from "@/utils/store/messages";
import Message from "./Message";
import { DeleteAlert, EditAlert } from "./MessageActions";
import { useEffect, useRef, useState } from "react";
import { supabaseBrowser } from "@/utils/supabase/browser";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";
import LoadMoreMessages from "./LoadMoreMessages";

export default function ListMessages() {
    const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [userScrolled, setUserScrolled] = useState(false);
    const [notification, setNotification] = useState(0);
    const supabase = supabaseBrowser();
    const {
        messages,
        addMessage,
        optimisticIds,
        optimisticDeleteMessage,
        optimisticUpdateMessage,
    } = useMessage((state) => state);
    useEffect(() => {
        const channel = supabase
            .channel("chat-room")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "messages" },
                async (payload) => {
                    if (!optimisticIds.includes(payload.new.id)) {
                        const { error, data } = await supabase
                            .from("user")
                            .select("*")
                            .eq("id", payload.new.send_by)
                            .single();
                        if (error) {
                            toast.error(error.message);
                        } else {
                            const newMessage = {
                                ...payload.new,
                                user: data,
                            };
                            addMessage(newMessage as Imessage);
                        }
                    }

                    const scrollContainer = scrollRef.current;
                    if (
                        scrollContainer.scrollTop <
                        scrollContainer.scrollHeight -
                            scrollContainer.clientHeight -
                            10
                    ) {
                        setNotification((current) => current + 1);
                    }
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public", table: "messages" },
                (payload) => {
                    optimisticDeleteMessage(payload.old.id);
                }
            )
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "messages" },
                (payload) => {
                    optimisticUpdateMessage(payload.new as Imessage);
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, [messages]);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer && !userScrolled) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [messages]);

    const handleOnScroll = () => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            const isScroll =
                scrollContainer.scrollTop <
                scrollContainer.scrollHeight -
                    scrollContainer.clientHeight -
                    10;
            setUserScrolled(isScroll);
            if (
                scrollContainer.scrollTop ===
                scrollContainer.scrollHeight - scrollContainer.clientHeight
            ) {
                setNotification(0);
            }
        }
    };

    const scrollDown = () => {
        setNotification(0);
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };

    return (
        <>
            <div
                className='flex-1 flex flex-col p-5 h-full overflow-y-auto'
                ref={scrollRef}
                onScroll={handleOnScroll}
            >
                <div className='flex-1 pb-5 '>
                    <LoadMoreMessages />
                </div>
                <div className='space-y-7'>
                    {messages.map((value, index) => (
                        <Message key={index} message={value} />
                    ))}
                </div>
                <DeleteAlert />
                <EditAlert />
            </div>
            {userScrolled && (
                <div className='bg-red-800 w-full relative'>
                    <div className='absolute bottom-4 w-full'>
                        {notification ? (
                            <div
                                className='w-36 mx-auto bg-indigo-500 p-1 rounded-md cursor-pointer'
                                onClick={scrollDown}
                            >
                                <h1>New {notification} messages</h1>
                            </div>
                        ) : (
                            <div
                                className='w-10 h-10 bg-blue-500 rounded-full justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all'
                                onClick={scrollDown}
                            >
                                <ArrowDown />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
