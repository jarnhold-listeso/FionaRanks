import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/lib/types";
import HistoryList from "@/components/history-list";

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Review[]>();

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">Saved Reviews</h1>
      {!reviews || reviews.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          No saved reviews yet. Create one to get started!
        </p>
      ) : (
        <HistoryList reviews={reviews} />
      )}
    </div>
  );
}
