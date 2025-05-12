"use client";

import { createClient } from "@/utils/supabase/client";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function AvatarUpload({
  isOwnProfile,
}: {
  isOwnProfile: boolean;
}) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useUser();

  if (!isOwnProfile) return null;

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Lütfen bir resim seçin");
      }

      if (!user?.id) {
        throw new Error("Kullanıcı girişi gerekli");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      // Önceki avatarı sil
      const { data: existingFiles } = await supabase.storage
        .from("avatars")
        .list(`${user.id}`);

      if (existingFiles?.length) {
        await supabase.storage
          .from("avatars")
          .remove(existingFiles.map((f) => `${user.id}/${f.name}`));
      }

      // Yeni avatarı yükle
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(`${user.id}/${fileName}`, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Yeni avatar URL'ini oluştur
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${user.id}/${fileName}`);

      // Kullanıcı profilini güncelle
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      if (updateError) {
        throw updateError;
      }

      // Profiles tablosunu da güncelle
      const { error: profileUpdateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (profileUpdateError) {
        throw profileUpdateError;
      }

      if (updateError) {
        throw updateError;
      }

      toast.success("Profil fotoğrafı güncellendi");
      window.location.reload();
    } catch (error) {
      toast.error("Hata: " + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <label
        htmlFor="single"
        className="hover:bg-primary absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md transition-all hover:text-white"
      >
        <EditRoundedIcon sx={{ fontSize: 16 }} />
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
            width: 0,
            height: 0,
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </label>
      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}
    </>
  );
}
