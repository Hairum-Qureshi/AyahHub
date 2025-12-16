import "../css/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Navbar from "../Navbar";
import QuranChapter from "./pages/QuranChapter";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route
					path="/quran/chapter/:chapterNumber"
					element={<QuranChapter />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
