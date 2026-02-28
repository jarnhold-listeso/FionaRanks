"use client";

import { useRef, useState } from "react";
import type { Review } from "@/lib/types";
import { PRESET_AVATARS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import ReviewCard from "@/components/review-card";
import { useDownloadImage } from "@/hooks/use-download-image";
import { useRouter } from "next/navigation";

function HistoryItem({ review, onDelete }: { review: Review; onDelete: (id: string) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { download, isGenerating } = useDownloadImage(cardRef);

  const profilePicUrl =
    review.profile_pic_type === "upload"
      ? createClient()
          .storage.from("profile-pics")
          .getPublicUrl(review.profile_pic_value).data.publicUrl
      : review.profile_pic_type === "preset"
        ? PRESET_AVATARS.find((a) => a.key === review.profile_pic_value)?.src ?? null
        : null;

  const presetColor =
    review.profile_pic_type === "preset"
      ? PRESET_AVATARS.find((a) => a.key === review.profile_pic_value)?.color
      : undefined;

  return (
    <div className="space-y-3">
      <div ref={cardRef} className="inline-block">
        <ReviewCard
          reviewerName={review.reviewer_name}
          starRating={review.star_rating}
          reviewText={review.review_text}
          profilePicUrl={profilePicUrl}
          presetColor={presetColor}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={download}
          disabled={isGenerating}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Download"}
        </button>
        <button
          onClick={() => onDelete(review.id)}
          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function HistoryList({ reviews: initialReviews }: { reviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      alert("Failed to delete review.");
      return;
    }
    setReviews((prev) => prev.filter((r) => r.id !== id));
    router.refresh();
  };

  if (reviews.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500">
        No saved reviews yet. Create one to get started!
      </p>
    );
  }

  return (
    <div className="mt-6 grid gap-8 md:grid-cols-2">
      {reviews.map((review) => (
        <HistoryItem key={review.id} review={review} onDelete={handleDelete} />
      ))}
    </div>
  );
}
