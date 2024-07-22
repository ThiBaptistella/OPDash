import React, { useState } from "react";
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
  const { subscribeToProgram } = useLoyaltyPrograms();
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleSubscribe = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log("userId", userId);
    if (userId) {
      const qrCode = await subscribeToProgram(userId, program._id);
      console.log("qrCode", qrCode);
      setQrCode(qrCode);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{program.name}</Text>
      <Text style={styles.description}>{program.description}</Text>
      <Button title="Subscribe" onPress={handleSubscribe} />
      {qrCode && <Image style={styles.qrCode} source={{ uri: qrCode }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
