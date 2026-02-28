"use client";

import { useState, useMemo } from "react";
import type { ReviewFormData, ProfilePicType } from "@/lib/types";
import { PRESET_AVATARS } from "@/lib/constants";
import { getAvatarColor } from "@/lib/utils";

export function useReviewForm() {
  const [formData, setFormData] = useState<ReviewFormData>({
    reviewerName: "Dasha",
    starRating: 2,
    reviewText: "",
    profilePicType: "preset",
    profilePicValue: "dasha",
  });

  const [uploadedPicUrl, setUploadedPicUrl] = useState<string | null>(null);

  const profilePicUrl = useMemo(() => {
    if (formData.profilePicType === "upload" && uploadedPicUrl) {
      return uploadedPicUrl;
    }
    if (formData.profilePicType === "preset") {
      const preset = PRESET_AVATARS.find(
        (a) => a.key === formData.profilePicValue
      );
      if (preset) {
        return preset.src;
      }
    }
    return null;
  }, [formData.profilePicType, formData.profilePicValue, uploadedPicUrl]);

  const presetColor = undefined;

  const updateField = <K extends keyof ReviewFormData>(
    key: K,
    value: ReviewFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    formData,
    updateField,
    profilePicUrl,
    presetColor,
    uploadedPicUrl,
    setUploadedPicUrl,
  };
}
