import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

// ----------------------
// 1. Update Profile
// ----------------------
export const updateProfile = async ({
  username,
  avatar_url,
}: {
  username?: string;
  avatar_url?: string;
}) => {
  // Ensure that the user exists
  const userRes = await supabase.auth.getUser();
  const userId = userRes.data?.user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ username, avatar_url, updated_at: new Date() })
    .eq("id", userId);

  if (error) throw error;
  return data;
};

// ----------------------
// 2. Apply Referral Code
// ----------------------
export const applyReferralCode = async (enteredCode: string) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const userId = userData?.user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  // Get my own profile to prevent self-referral
  const { data: myProfile } = await supabase
    .from("profiles")
    .select("referral_code")
    .eq("id", userId)
    .single();

  if (!myProfile) throw new Error("Profile not found");

  if (enteredCode === myProfile.referral_code) {
    throw new Error("You cannot refer yourself.");
  }

  // Check if entered code exists
  const { data: referrerProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("referral_code", enteredCode)
    .single();

  if (!referrerProfile) throw new Error("Invalid referral code");

  // Update balances
  const { error: rewardError } = await supabase.rpc("apply_referral_rewards", {
    referrer_id: referrerProfile.id,
    referee_id: userId,
  });

  if (rewardError) throw rewardError;

  // Update my profile with referred_by
  await supabase
    .from("profiles")
    .update({ referred_by: enteredCode })
    .eq("id", userId);

  return true;
};

// ----------------------
// 3. Generate Referral Code
// ----------------------
export const generateReferralCode = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  const code = "vad" + Math.floor(100000 + Math.random() * 900000);

  const { data, error } = await supabase
    .from("profiles")
    .update({ referral_code: code })
    .eq("id", userId);

  if (error) throw error;
  return code;
};

// ----------------------
// 4. Delete Account
// ----------------------
export const deleteAccount = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  // Delete avatar from storage
  const { data: profile } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (profile?.avatar_url) {
    await supabase.storage
      .from("avatars")
      .remove([profile.avatar_url])
      .catch(() => {}); // Prevent errors from interrupting the process
  }

  // Delete profile row
  await supabase.from("profiles").delete().eq("id", userId);

  // Delete auth user
  await supabase.auth.admin.deleteUser(userId);
};
