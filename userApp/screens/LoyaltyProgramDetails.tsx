import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { LoyaltyProgram } from "../types/loyaltyProgram";
import useLoyaltyPrograms from "../hooks/useLoyaltyPrograms";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  LoyaltyProgramDetails: { program: LoyaltyProgram };
};

type LoyaltyProgramDetailsRouteProp = RouteProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;

const LoyaltyProgramDetails: React.FC = () => {
  const route = useRoute<LoyaltyProgramDetailsRouteProp>();
  const { program } = route.params;
  const { subscribeToProgram, unsubscribeFromProgram } = useLoyaltyPrograms();
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQrCodeImage = async () => {
      const storedQrCodeImage = await AsyncStorage.getItem(
        `qrCodeImage_${program._id}`
      );
      if (storedQrCodeImage) {
        setQrCodeImage(storedQrCodeImage);
      }
    };
    loadQrCodeImage();
  }, [program._id]);

  const handleSubscribe = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      try {
        const response = await subscribeToProgram(userId, program._id);
        const { qrCodeImage } = response;
        if (qrCodeImage) {
          setQrCodeImage(qrCodeImage);
          await AsyncStorage.setItem(`qrCodeImage_${program._id}`, qrCodeImage);
        } else {
          console.error("Received undefined qrCodeImage");
        }
      } catch (error) {
        console.error("Error during subscription:", error);
      }
    }
    setLoading(false);
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      try {
        await unsubscribeFromProgram(userId, program._id);
        setQrCodeImage(null);
        await AsyncStorage.removeItem(`qrCodeImage_${program._id}`);
      } catch (error) {
        console.error("Error during unsubscription:", error);
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: program.image }} style={styles.image} /> */}
      <Text style={styles.title}>{program.name}</Text>
      <Text style={styles.description}>{program.description}</Text>
      {!qrCodeImage ? (
        <Button
          title={loading ? "Subscribing..." : "Subscribe"}
          onPress={handleSubscribe}
          disabled={loading}
        />
      ) : (
        <>
          <Image style={styles.qrCode} source={{ uri: qrCodeImage }} />
          <Button
            title={loading ? "Unsubscribing..." : "Unsubscribe"}
            onPress={handleUnsubscribe}
            disabled={loading}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  qrCode: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
});

export default LoyaltyProgramDetails;
