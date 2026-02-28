import Link from "next/link";
import ReviewCard from "@/components/review-card";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Listeso Pets Rate Things</h1>
        <p className="mt-3 text-lg text-gray-600">
          Impersonate the pets of Listeso and create Google Review-style images.
        </p>
      </div>

      {/* Sample review card */}
      <div className="mt-10">
        <ReviewCard
          reviewerName="Fiona"
          starRating={1}
          reviewText="meow"
          profilePicUrl="/avatars/fiona.jpg"
        />
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/login"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Get Started
        </Link>
        <Link
          href="/signup"
          className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
