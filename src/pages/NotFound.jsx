import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="mb-8">The event or page you are looking for does not exist.</p>
            <Link to="/" className="text-indigo-600 hover:underline">Go back home</Link>
        </div>
    );
}
