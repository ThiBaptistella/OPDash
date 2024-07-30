import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
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

  const transactions = [
    {
      id: "1",
      name: "Name of Program",
      date: "27/05/2024",
      points: "+10",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      name: "Name of Program",
      date: "27/05/2024",
      points: "+10",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "3",
      name: "Name of Program",
      date: "27/05/2024",
      points: "+10",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: program.image }} style={styles.programImage} />
          <View style={styles.programInfo}>
            <Text style={styles.programTitle}>{program.name}</Text>
            <Text style={styles.programSubtitle}>{program.description}</Text>
          </View>
        </View>
        <View style={styles.sectionDivider} />
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Tiers</Text>
            <Text style={styles.statValue}>Free</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Points</Text>
            <Text style={styles.statValue}>52 pts</Text>
            <View style={styles.progressBar}>
              <View style={styles.progress} />
            </View>
          </View>
        </View>
        <View style={styles.sectionDivider} />
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsValue}>48 pts</Text>
          <Text style={styles.pointsText}>
            Collect more, to get one free thing.
          </Text>
        </View>
        {qrCodeImage ? (
          <>
            <Image style={styles.qrCode} source={{ uri: qrCodeImage }} />
            <Text style={styles.totalPoints}>Total Point saved: 6000 pts</Text>
            <Button
              title={loading ? "Unsubscribing..." : "Unsubscribe"}
              onPress={handleUnsubscribe}
              disabled={loading}
            />
          </>
        ) : (
          <Button
            title={loading ? "Subscribing..." : "Subscribe"}
            onPress={handleSubscribe}
            disabled={loading}
          />
        )}
        <Text style={styles.transactionsTitle}>Transactions</Text>
        <View style={styles.transactionsContainer}>
          {transactions.map((item) => (
            <View key={item.id} style={styles.transactionCard}>
              <Image
                style={styles.transactionImage}
                source={{ uri: item.image }}
              />
              <View style={styles.transactionTextContainer}>
                <Text style={styles.transactionTitle}>{item.name}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={styles.transactionPoints}>{item.points} pts</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#7351E4",
    padding: 16,
    paddingTop: 40,
  },
  programImage: {
    width: 50,
    height: 50,
    backgroundColor: "#CCCCCC",
    borderRadius: 10,
    marginRight: 16,
  },
  programInfo: {
    justifyContent: "center",
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  programSubtitle: {
    fontSize: 14,
    color: "#D3D3D3",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#7351E4",
    paddingVertical: 16,
  },
  statBox: {
    alignItems: "center",
  },
  statTitle: {
    fontSize: 14,
    color: "#D3D3D3",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  progressBar: {
    width: "80%",
    height: 6,
    backgroundColor: "#D3D3D3",
    borderRadius: 3,
    marginTop: 4,
  },
  progress: {
    width: "50%",
    height: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
  },
  pointsContainer: {
    alignItems: "center",
    backgroundColor: "#7351E4",
    paddingVertical: 16,
    height: 200,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  pointsText: {
    fontSize: 14,
    color: "#D3D3D3",
  },
  qrCode: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginVertical: 20,
    marginTop: -90,
    borderRadius: 10,
  },
  totalPoints: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  transactionsContainer: {
    paddingBottom: 20,
    marginBottom: 60,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#CCCCCC",
    marginRight: 10,
  },
  transactionTextContainer: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  transactionDate: {
    fontSize: 14,
    color: "#888",
  },
  transactionPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default LoyaltyProgramDetails;
