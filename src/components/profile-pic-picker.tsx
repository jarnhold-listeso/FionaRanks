"use client";

import { PRESET_AVATARS } from "@/lib/constants";
import type { ProfilePicType } from "@/lib/types";

interface ProfilePicPickerProps {
  reviewerName: string;
  profilePicType: ProfilePicType;
  profilePicValue: string;
  onTypeChange: (type: ProfilePicType) => void;
  onValueChange: (value: string) => void;
  onPicUrlChange: (url: string | null) => void;
  onNameChange?: (name: string) => void;
}

export default function ProfilePicPicker({
  profilePicValue,
  onTypeChange,
  onValueChange,
  onPicUrlChange,
  onNameChange,
}: ProfilePicPickerProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Choose a Pet
      </label>
      <div className="flex gap-4">
        {PRESET_AVATARS.map((avatar) => (
          <button
            key={avatar.key}
            type="button"
            onClick={() => {
              onTypeChange("preset");
              onValueChange(avatar.key);
              onPicUrlChange(avatar.src);
              onNameChange?.(avatar.label);
            }}
            className={`flex flex-col items-center gap-1.5 transition-transform ${
              profilePicValue === avatar.key
                ? "scale-110"
                : "hover:scale-105"
            }`}
          >
            <div
              className={`h-16 w-16 overflow-hidden rounded-full ${
                profilePicValue === avatar.key
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : ""
              }`}
            >
              <img
                src={avatar.src}
                alt={avatar.label}
                className="h-full w-full object-cover"
              />
            </div>
            <span className={`text-xs font-medium ${
              profilePicValue === avatar.key ? "text-blue-600" : "text-gray-500"
            }`}>
              {avatar.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
