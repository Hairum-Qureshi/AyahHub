import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UseQuranHookData } from "../interfaces";

export default function useQuran(chapterNumber?: string): UseQuranHookData {
	const { data: allQuranicChaptersData } = useQuery({
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

	const { data: chapterData } = useQuery({
		queryKey: ["chapter", chapterNumber],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/api/quran/chapter/${chapterNumber}`
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	return { allQuranicChaptersData, chapterData };
}
