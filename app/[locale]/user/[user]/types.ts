export interface Profile {
  id: string;
  created_at: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string;
  email_verified: boolean;
  phone: string | null;
  phone_verified: boolean;
}

export interface ProfilePageProps {
  params: {
    locale: string;
    user: string;
  };
}

export interface ProfileStats {
  reviews: number;
  followers: number;
  following: number;
}
