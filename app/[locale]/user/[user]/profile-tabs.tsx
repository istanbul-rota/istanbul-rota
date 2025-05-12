"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import Image from "next/image";

interface ProfileTabsProps {
  posts: any[];
  favorites: any[]; // Add this
  locale: string;
  translations: {
    posts: string;
    recentReviews: string;
    noPostsYet: string;
    noReviewsYet: string;
    favorites: string; // Add this
    noFavoritesYet: string; // Add this
  };
}

export default function ProfileTabs({
  posts,
  favorites,
  translations,
}: ProfileTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="space-y-6">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
          <Tab label={translations.posts} disableTouchRipple />
          <Tab label={translations.recentReviews} disableTouchRipple />
          <Tab label={translations.favorites} disableTouchRipple />
        </Tabs>
      </Box>

      {/* Posts Tab */}
      <div role="tabpanel" hidden={value !== 0}>
        {value === 0 && (
          <div className="rounded-lg p-6 shadow-sm">
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post._id} className="rounded-lg border p-4">
                    {/* ...existing post item code... */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">{translations.noPostsYet}</div>
            )}
          </div>
        )}
      </div>

      {/* Reviews Tab */}
      <div role="tabpanel" hidden={value !== 1}>
        {value === 1 && (
          <div className="rounded-lg p-6 shadow-sm">
            <div className="text-center">{translations.noReviewsYet}</div>
          </div>
        )}
      </div>

      {/* Favorites Tab */}
      <div role="tabpanel" hidden={value !== 2}>
        {value === 2 && (
          <div className="rounded-lg p-6 shadow-sm">
            {favorites && favorites.length > 0 ? (
              <div className="space-y-4">
                {favorites.map((place) => (
                  <div key={place.id} className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      {place.image && (
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={place.image}
                            alt={place.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{place.title}</h3>
                        <p className="mt-2 text-sm">{place.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">{translations.noFavoritesYet}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
