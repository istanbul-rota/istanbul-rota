import { createClient } from "@/utils/supabase/server";

export async function getProfile(username: string) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error) throw new Error(error.message);

  return profile;
}

export async function getProfileStats(userId: string) {
  const supabase = await createClient();

  const [reviews, followers, following] = await Promise.all([
    supabase
      .from("reviews")
      .select("*", { count: "exact" })
      .eq("user_id", userId),
    supabase
      .from("followers")
      .select("*", { count: "exact" })
      .eq("following_id", userId),
    supabase
      .from("followers")
      .select("*", { count: "exact" })
      .eq("follower_id", userId),
  ]);

  return {
    reviews: reviews.count || 0,
    followers: followers.count || 0,
    following: following.count || 0,
  };
}
