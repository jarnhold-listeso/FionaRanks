import Link from "next/link";
import ReviewCard from "@/components/review-card";

export default function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Listeso Pets Rate Things
        </h1>
        <p className="mt-2 text-base text-gray-600 sm:text-lg">
          Impersonate the pets of Listeso and create Google Review-style images.
        </p>
      </div>

      {/* Sample review card – scale down on small screens to preserve proportions */}
      <div className="mt-6 origin-top scale-[0.85] sm:mt-10 sm:scale-100">
        <ReviewCard
          reviewerName="Fiona"
          starRating={1}
          reviewText="meow"
          profilePicUrl="/avatars/fiona.jpg"
        />
      </div>

      <div className="mt-6 flex gap-3 sm:mt-8">
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
