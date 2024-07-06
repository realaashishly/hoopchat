import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useMessage } from "@/utils/store/messages";
import { supabaseBrowser } from "@/utils/supabase/browser";
import { LIMIT_MESSAGE } from "@/lib/constants";
import { getFromAndTo } from "@/lib/utils";

export default function LoadMoreMessages() {
	const page = useMessage((state) => state.page);
	const setMesssages = useMessage((state) => state.setMesssages);
	const hasMore = useMessage((state) => state.hasMore);

	const fetchMore = async () => {
		const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);

		const supabase = supabaseBrowser();

		const { data, error } = await supabase
			.from("messages")
			.select("*,user(*)")
			.range(from, to)
			.order("created_at", { ascending: false });

		if (error) {
			toast.error(error.message);
		} else {
			setMesssages(data.reverse());
		}
	};

	if (hasMore) {
		return (
			<Button variant="outline" className="w-full" onClick={fetchMore}>
				Load More
			</Button>
		);
	}
	return <></>;
}