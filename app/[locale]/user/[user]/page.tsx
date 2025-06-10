import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";
import "dayjs/locale/en";
import { getUserPosts } from "@/sanity/sanity-utils";
import AvatarUpload from "./avatar-upload";
import ProfileTabs from "./profile-tabs";
import { getProfile, getProfileStats } from "./actions";
import { type ProfilePageProps } from "./types";

dayjs.extend(relativeTime);

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale, user: username } = params;
  const t = await getTranslations("Profile");
  const supabase = await createClient();

  try {
    // Parallel fetching of initial data
    const [
      {
        data: { user: currentUser },
      },
      profile,
    ] = await Promise.all([supabase.auth.getUser(), getProfile(username)]);

    if (!profile) {
      return (
        <div className="py-20 text-center text-gray-500">{t("notFound")}</div>
      );
    }

    // Parallel fetching of profile related data
    const [profileStats, posts, { data: favorites }] = await Promise.all([
      getProfileStats(profile.id),
      getUserPosts(profile.id),
      supabase.from("favorites").select("*").eq("user_id", profile.id),
    ]);

    const memberSince = dayjs(profile.created_at).locale(locale).fromNow();
    const isOwnProfile = currentUser?.user_metadata.username === username;

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Profil Başlığı */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <div className="relative h-32 w-32 md:h-40 md:w-40">
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-white">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name || "Profile"}
                    fill
                    sizes="(max-width: 768px) 128px, 160px"
                    className="object-cover"
                    priority
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-4xl font-bold text-gray-400">
                    {profile.full_name
                      ? profile.full_name[0].toUpperCase()
                      : profile.email[0].toUpperCase()}
                  </div>
                )}
              </div>
              {isOwnProfile && <AvatarUpload isOwnProfile />}
            </div>
            <div>
              <h1 className="text-center text-3xl font-bold md:text-left">
                {profile.full_name}
              </h1>
              <p className="text-center text-lg text-blue-100 md:text-left">
                @{profile.username}
              </p>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm md:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold">{profileStats.followers}</p>
                  <p className="text-blue-100">{t("followers")}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{profileStats.following}</p>
                  <p className="text-blue-100">{t("following")}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{profileStats.reviews}</p>
                  <p className="text-blue-100">{t("reviews")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Sol Kolon */}
          <div className="space-y-6 md:col-span-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">
                {t("personalInfo")}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">{t("email")}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {isOwnProfile && profile.email && (
                      <p className="break-all">{profile.email}</p>
                    )}
                    {profile.email_verified && (
                      <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
                        {t("emailVerified")}
                      </span>
                    )}
                  </div>
                </div>

                {isOwnProfile && profile.phone && (
                  <div>
                    <p className="text-sm text-gray-500">{t("phone")}</p>
                    <div className="flex items-center gap-2">
                      <p>{profile.phone}</p>
                      {profile.phone_verified && (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
                          {t("phoneVerified")}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">{t("memberSince")}</p>
                  <p>{memberSince}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon */}
          <div className="md:col-span-9">
            <ProfileTabs
              posts={posts}
              favorites={favorites || []}
              locale={locale}
              translations={{
                posts: t("posts"),
                recentReviews: t("recentReviews"),
                noPostsYet: t("noPostsYet"),
                noReviewsYet: t("noReviewsYet"),
                favorites: t("favorites"),
                noFavoritesYet: t("noFavoritesYet"),
              }}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in profile page:", error);
    return <div className="py-20 text-center text-gray-500">{t("error")}</div>;
  }
}
