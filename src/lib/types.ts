export type ProfilePicType = "upload" | "preset" | "initials";

export interface Review {
  id: string;
  user_id: string;
  reviewer_name: string;
  star_rating: number;
  review_text: string;
  profile_pic_type: ProfilePicType;
  profile_pic_value: string;
  created_at: string;
}

export interface ReviewFormData {
  reviewerName: string;
  starRating: number;
  reviewText: string;
  profilePicType: ProfilePicType;
  profilePicValue: string;
}
