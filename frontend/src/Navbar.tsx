import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="bg-gray-800 text-white p-4 w-full">
			<div className="max-w-7xl mx-auto flex justify-between">
				<ul className="flex items-center justify-center">
					<li className="inline mx-4 hover:cursor-pointer">
						<Link to="/">Home</Link>
					</li>
					<li className="inline mx-4 hover:cursor-pointer">
						<Link to="/about">About</Link>
					</li>
				</ul>
				<ul className="flex text-right justify-end items-center">
					<li className="inline mx-4 hover:cursor-pointer">
						<Link to="/sign-in">Sign In</Link>
					</li>
					<li className="inline mx-4 hover:cursor-pointer p-2 bg-sky-900 w-20 text-center rounded-md">
						<Link to="/sign-up">Sign Up</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
