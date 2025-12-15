import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UseQuranHookData } from "../interfaces";

export default function useQuran(): UseQuranHookData {
	const { data: chapterData } = useQuery({
		queryKey: ["chapters"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/quran/all-chapters`
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	return { chapterData };
}
