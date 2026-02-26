import { toast } from "@/components/toast";
import { supabase } from "@/utilities/supabase";
import {
  getUserProfile,
  updateUserProfile,
} from "@/utilities/supabase/profile";
import { create } from "zustand";

interface ProfileState {
  profile: {
    email: string | null;
  } | null;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;

  // Form fields - Basic Info
  email: string;

  // Actions
  loadProfile: (userId: string) => Promise<void>;
  setEmail: (value: string) => void;
  saveProfile: (userId: string) => Promise<boolean>;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  isSaving: false,

  // Initial form state
  email: "",

  loadProfile: async (userId) => {
    try {
      set({ isLoading: true });
      const profile = await getUserProfile(userId);

      if (!profile) {
        // No profile row exists yet — keep defaults
        set({ profile: null });
        return;
      }

      set({
        profile,
        email: profile.email || "",
      });
    } catch (error: any) {
      console.error("Error loading profile:", error);
      toast.error(error.message || "Failed to load profile");
    } finally {
      set({ isLoading: false });
    }
  },

  setEmail: (value) => set({ email: value }),

  saveProfile: async (userId) => {
    const { email } = get();

    try {
      set({ isSaving: true });

      const updates: Record<string, any> = {};

      if (email) updates.email = email;

      await updateUserProfile(userId, updates);

      // Also update auth metadata to keep in sync
      if (updates.avatar_url || updates.first_name || updates.last_name) {
        try {
          const fullName =
            `${updates.first_name || ""} ${updates.last_name || ""}`.trim();
          await supabase.auth.updateUser({
            data: {
              ...(fullName && { name: fullName }),
              ...(updates.avatar_url && { avatar_url: updates.avatar_url }),
            },
          });
        } catch (authError) {
          console.error("Error updating auth metadata:", authError);
          // Don't fail the save if auth metadata update fails
        }
      }

      set({ isSaving: false });
      toast.success("Profile updated successfully");
      return true;
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast.error(error.message || "Failed to save profile");
      set({ isSaving: false });
      return false;
    }
  },

  reset: () => ({
    profile: null,
    isLoading: false,
    isSaving: false,
    email: "",
  }),
}));
