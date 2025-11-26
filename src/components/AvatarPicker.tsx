import React, { useState } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../lib/supabase";

interface AvatarPickerProps {
  onUpload: (url: string) => void;
  initialUrl?: string;
}

export default function AvatarPicker({ onUpload, initialUrl }: AvatarPickerProps) {
  const [avatar, setAvatar] = useState(initialUrl || "");
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return alert("Permission required!");

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (pickerResult.cancelled) return;

    setUploading(true);
    const fileUri = pickerResult.assets[0].uri;
    const fileExt = fileUri.split(".").pop();
    const fileName = `avatar_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const response = await fetch(fileUri);
    const blob = await response.blob();

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, blob, { upsert: true });

    if (error) {
      alert("Upload failed: " + error.message);
    } else {
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setAvatar(urlData.publicUrl);
      onUpload(urlData.publicUrl);
    }

    setUploading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.placeholder}>Select Avatar</Text>
        )}
      </TouchableOpacity>
      {uploading && <Text style={styles.uploading}>Uploading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 20 },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: { width: "100%", height: "100%", borderRadius: 60 },
  placeholder: { color: "#aaa", textAlign: "center" },
  uploading: { marginTop: 5, color: "#6C5CE7" },
});
