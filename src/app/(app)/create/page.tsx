"use client";

import { useRef, useState } from "react";
import ReviewCard from "@/components/review-card";
import StarRating from "@/components/star-rating";
import ProfilePicPicker from "@/components/profile-pic-picker";
import { useReviewForm } from "@/hooks/use-review-form";
import { useDownloadImage } from "@/hooks/use-download-image";
import { createClient } from "@/lib/supabase/client";

export default function CreatePage() {
  const { formData, updateField, profilePicUrl, presetColor, setUploadedPicUrl } =
    useReviewForm();
  const cardRef = useRef<HTMLDivElement>(null);
  const { download, isGenerating } = useDownloadImage(cardRef);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!formData.reviewerName) {
      alert("Please select a pet avatar.");
      return;
    }
    if (!formData.reviewText) {
      alert("Please write some review text.");
      return;
    }

    setSaving(true);
    setSaved(false);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("reviews").insert({
        user_id: user.id,
        reviewer_name: formData.reviewerName,
        star_rating: formData.starRating,
        review_text: formData.reviewText,
        profile_pic_type: formData.profilePicType,
        profile_pic_value: formData.profilePicValue,
      });

      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save review. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Form */}
      <div className="w-full space-y-5 lg:w-80">
        <h1 className="text-xl font-bold text-gray-900">Create Review</h1>

        {/* Pet avatar selection */}
        <ProfilePicPicker
          reviewerName={formData.reviewerName}
          profilePicType={formData.profilePicType}
          profilePicValue={formData.profilePicValue}
          onTypeChange={(type) => updateField("profilePicType", type)}
          onValueChange={(value) => updateField("profilePicValue", value)}
          onPicUrlChange={setUploadedPicUrl}
          onNameChange={(name) => updateField("reviewerName", name)}
        />

        {/* Star rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="mt-1">
            <StarRating
              rating={formData.starRating}
              onChange={(r) => updateField("starRating", r)}
              interactive
              size={28}
            />
          </div>
        </div>

        {/* Review text */}
        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            Review Text
          </label>
          <textarea
            id="review"
            rows={4}
            value={formData.reviewText}
            onChange={(e) => updateField("reviewText", e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm italic shadow-sm placeholder:italic focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:not-placeholder-shown:not-italic"
            placeholder="Type your review here..."
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={download}
            disabled={isGenerating}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Download PNG"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save Review"}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1">
        <h2 className="mb-4 text-sm font-medium text-gray-500">Preview</h2>
        <div ref={cardRef} className="inline-block">
          <ReviewCard
            reviewerName={formData.reviewerName}
            starRating={formData.starRating}
            reviewText={formData.reviewText}
            profilePicUrl={profilePicUrl}
            presetColor={presetColor}
          />
        </div>
      </div>
    </div>
  );
}
