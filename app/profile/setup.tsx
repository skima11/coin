// ProfileSetupScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import AvatarPicker from "../../src/components/AvatarPicker";
import { updateProfile, applyReferralCode, generateReferralCode } from "../../lib/supabaseApi";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Update profile
      await updateProfile({ username, avatar_url: avatarUrl });

      // Apply referral if entered
      if (referralCode) {
        await applyReferralCode(referralCode);
      }

      // Generate user referral code
      await generateReferralCode();

      // Navigate to the profile page or another screen after successful profile setup
      router.replace("/(tabs)/home"); // Adjust to the correct route
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    }

    setLoading(false);
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      await updateProfile({}); // Update profile without any info
      await generateReferralCode(); // Generate referral code

      // Navigate to the MiningDashboard or similar screen after skipping
      router.replace("/(tabs)/home"); // Adjust this to match the correct route
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Your Profile</Text>
      <Text style={styles.subtitle}>Add a username, avatar, and referral code (optional)</Text>

      <AvatarPicker onUpload={setAvatarUrl} initialUrl={avatarUrl} />

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Referral Code (optional)"
        placeholderTextColor="#999"
        value={referralCode}
        onChangeText={setReferralCode}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} disabled={loading} onPress={handleSubmit}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSkip}>
        <Text style={styles.link}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#000", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", color: "#fff", marginBottom: 5, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#aaa", marginBottom: 20, textAlign: "center" },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    marginBottom: 15,
    backgroundColor: "#111",
  },
  button: {
    backgroundColor: "#6C5CE7",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#6C5CE7", textAlign: "center", marginTop: 10 },
});
