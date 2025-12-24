import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UseNotesHookReturns {
	postNote: (chapterNumber: string, chapterVerse: string, note: string) => void;
}

export default function useNotes(): UseNotesHookReturns {
	const { mutate: postNoteMutation } = useMutation({
		mutationFn: async (data: {
			chapterNumber: string;
			chapterVerse: string;
			note: string;
		}) => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/quran/${
						data.chapterNumber
					}/${data.chapterVerse}/note`,
					{
						note: data.note
					},
					{
						withCredentials: true
					}
				);

				return response;
			} catch (error) {
				console.error(error);
			}
		}
	});

	const postNote = (
		chapterNumber: string,
		chapterVerse: string,
		note: string
	) => {
		if (!chapterNumber || !chapterVerse || !note) {
			alert("All fields are required");
			return;
		}

		const data = {
			chapterNumber,
			chapterVerse,
			note
		};

		postNoteMutation(data);
	};

	return { postNote };
}
