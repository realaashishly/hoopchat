import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import InitUser from "@/utils/store/InitUser";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    return (
        <div className='max-w-3xl mx-auto md:py-10 h-screen'>
            <div className='h-full border rounded-md flex flex-col'>
                <ChatHeader />
                <ChatMessages />
                <ChatInput />
            </div>
            <InitUser user={data.session?.user}/>
        </div>
    );
}
