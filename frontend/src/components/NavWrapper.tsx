// NavWrapper.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export default function NavWrapper() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
