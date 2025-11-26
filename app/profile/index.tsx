import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, Clipboard } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { deleteAccount } from "../../lib/supabaseApi";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Fetch profile data
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const userRes = await supabase.auth.getUser();
      const userId = userRes.data.user?.id;

      if (!userId) {
        router.replace("/auth/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch profile");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCopy = () => {
    if (!profile?.referral_code) return;
    Clipboard.setString(profile.referral_code);
    Alert.alert("Copied!", "Referral code copied to clipboard");
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteAccount();
              Alert.alert("Deleted", "Your account has been deleted");
              router.replace("/auth/register");
            } catch (error: any) {
              Alert.alert("Error", error.message || "Failed to delete account");
            }
            setDeleting(false);
          },
        },
      ]
    );
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#6C5CE7" />;

  return (
    <View style={styles.container}>
      {profile?.avatar_url ? (
        <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={styles.avatarPlaceholderText}>{profile?.username?.[0]?.toUpperCase() || "U"}</Text>
        </View>
      )}

      <Text style={styles.username}>{profile?.username || "Unknown User"}</Text>

      <View style={styles.referralContainer}>
        <Text style={styles.referralLabel}>Your Referral Code:</Text>
        <TouchableOpacity onPress={handleCopy}>
          <Text style={styles.referralCode}>{profile?.referral_code || "Not generated"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>VAD Balance: {profile?.vad_balance?.toFixed(2) || 0}</Text>
        {profile?.referred_by && (
          <Text style={styles.statsText}>Referred by: {profile.referred_by}</Text>
        )}
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#FF4D4F" }]} onPress={handleDelete} disabled={deleting}>
        {deleting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Delete Account</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#000", alignItems: "center" },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  avatarPlaceholder: { backgroundColor: "#222", justifyContent: "center", alignItems: "center" },
  avatarPlaceholderText: { color: "#aaa", fontSize: 40, fontWeight: "700" },
  username: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 10 },
  referralContainer: { marginBottom: 20, alignItems: "center" },
  referralLabel: { color: "#aaa", fontSize: 14 },
  referralCode: { color: "#6C5CE7", fontSize: 18, fontWeight: "600", marginTop: 5 },
  statsContainer: { marginBottom: 30, alignItems: "center" },
  statsText: { color: "#fff", fontSize: 16, marginVertical: 2 },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
