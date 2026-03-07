import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[#f2f2f2] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-[#006457]">404</h1>
        <p className="mt-4 text-xl sm:text-2xl text-gray-700">Page not found</p>
        <p className="mt-2 text-base sm:text-lg text-gray-500 max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-[#006457] hover:bg-[#043d36] text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
