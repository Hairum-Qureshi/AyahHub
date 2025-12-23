import "../css/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import QuranChapter from "./pages/QuranChapter";
import NavWrapper from "./NavWrapper";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route element={<NavWrapper />}>
					<Route path="/" element={<Landing />} />
					<Route
						path="/quran/chapter/:chapterNumber"
						element={<QuranChapter />}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
