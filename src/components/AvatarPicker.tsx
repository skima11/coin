import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { supabase } from "../../lib/supabase";

interface AvatarPickerProps {
  onUpload: (url: string) => void;
  initialUrl?: string;
}

export default function AvatarPicker({ onUpload, initialUrl }: AvatarPickerProps) {
  const [avatar, setAvatar] = useState(initialUrl || "");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const openPickerMenu = () => {
    Alert.alert("Select Avatar", "Choose an option", [
      { text: "Take Photo", onPress: pickFromCamera },
      { text: "Choose from Gallery", onPress: pickFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return alert("Permission required!");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;
    handleImage(result.assets[0].uri);
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return alert("Camera permission required!");

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;
    handleImage(result.assets[0].uri);
  };

  const handleImage = async (uri: string) => {
    setUploading(true);

    // 🔥 Compress the image to reduce file size
    const compressed = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 600 } }],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
    );

    const fileExt = compressed.uri.split(".").pop();
    const fileName = `avatar_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Fetch and convert to Blob
    const response = await fetch(compressed.uri);
    const blob = await response.blob();

    // Fake progress bar (Supabase doesn't give upload progress yet)
    simulateProgress();

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, blob, { upsert: true });

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);

    setAvatar(urlData.publicUrl);
    onUpload(urlData.publicUrl);

    setUploading(false);
    setProgress(100);
    setTimeout(() => setProgress(0), 1500);
  };

  const simulateProgress = () => {
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 90) clearInterval(interval);
    }, 150);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openPickerMenu} style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.placeholder}>Tap to Add Avatar</Text>
        )}
      </TouchableOpacity>

      {uploading && (
        <View style={styles.progressContainer}>
          <ActivityIndicator color="#6C5CE7" />
          <Text style={styles.progressText}>Uploading... {progress}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 20 },

  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: { width: "100%", height: "100%" },
  placeholder: { color: "#aaa", textAlign: "center" },

  progressContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressText: { color: "#6C5CE7", fontSize: 14 },
});
