import { Imessage, useMessage } from "@/utils/store/messages";
import { useUser } from "@/utils/store/user";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function Message({ message }: { message: Imessage }) {
    const user = useUser((state) => state.user);
    return (
        <div className='flex gap-2'>
            <div className='h-10 w-10 bg-green-500 rounded-full overflow-hidden ring-2'>
                <img
                    src={message.user?.avatar_url}
                    alt={message.user?.username}
                    className='h-full w-full'
                />
            </div>
            <div className='flex-1'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <h1 className='font-bold'>{message.user?.username}</h1>
                        <h1 className='text-sm text-gray-400'>
                            {new Date(message.created_at).toDateString()}
                        </h1>
                        {message.is_edit && (
                            <h1 className='text-sm text-gray-400'>edited</h1>
                        )}
                    </div>
                    {message.user?.id === user?.id && (
                        <MessageMenu message={message} />
                    )}
                </div>
                <p className='text-gray-300'>{message.text}</p>
            </div>
        </div>
    );
}

const MessageMenu = ({ message }: { message: Imessage }) => {
    const setActionMessage = useMessage((state) => state.setActionMessage);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        document.getElementById("trigger-edit")?.click();
                        setActionMessage(message);
                    }}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        document.getElementById("trigger-delete")?.click();
                        setActionMessage(message);
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
