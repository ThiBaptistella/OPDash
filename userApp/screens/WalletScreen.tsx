import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import useLoyaltyPrograms from "../hooks/useLoyaltyPrograms";
import FooterNavigation from "../navigation/FooterNavigation";
import { LoyaltyProgram } from "../types/loyaltyProgram";

type WalletScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;

const WalletScreen: React.FC = () => {
  const navigation = useNavigation<WalletScreenNavigationProp>();
  const { loyaltyPrograms } = useLoyaltyPrograms();
  const [subscribedPrograms, setSubscribedPrograms] = useState<
    LoyaltyProgram[]
  >([]);
  console.debug("loyaltyPrograms", loyaltyPrograms);
  useEffect(() => {
    // Filter subscribed programs
    const subscribed = loyaltyPrograms.filter(
      (program) => program.isSubscribed
    );
    setSubscribedPrograms(subscribed);
  }, [loyaltyPrograms]);

  const renderProgramCard = (program: LoyaltyProgram, index: number) => {
    const translateY = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const handlePressIn = () => {
      translateY.value = withSpring(-10);
    };

    const handlePressOut = () => {
      translateY.value = withSpring(0);
    };

    return (
      <Animated.View key={program._id} style={[styles.card, animatedStyle]}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() =>
            navigation.navigate("LoyaltyProgramDetails", { program })
          }
        >
          <View style={styles.cardContent}>
            <Image
              source={{ uri: program.image }}
              style={styles.programImage}
            />
            <View style={styles.programInfo}>
              <Text style={styles.programTitle}>{program.name}</Text>
              <Text style={styles.programSubtitle}>{program.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Programs</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by local"
          placeholderTextColor="#bdbdbd"
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {subscribedPrograms.map((program, index) =>
          renderProgramCard(program, index)
        )}
      </ScrollView>
      <FooterNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    margin: 16,
    color: "#000000",
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    color: "#000",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  programImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#CCCCCC",
    marginRight: 16,
  },
  programInfo: {
    justifyContent: "center",
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  programSubtitle: {
    fontSize: 14,
    color: "#888888",
  },
});

export default WalletScreen;
