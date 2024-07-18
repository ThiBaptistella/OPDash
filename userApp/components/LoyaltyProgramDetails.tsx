import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LoyaltyProgramDetailsRouteProp } from "../types/navigation";
import useLoyaltyPrograms from "../hooks/useLoyaltyPrograms";

const LoyaltyProgramDetails: React.FC = () => {
  const route = useRoute<LoyaltyProgramDetailsRouteProp>();
  const { program } = route.params;
  const { subscribeToProgram } = useLoyaltyPrograms();

  const handleSubscribe = () => {
    subscribeToProgram(program._id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{program.name}</Text>
      <Text style={styles.description}>{program.description}</Text>
      {/* Display other program details as needed */}
      <Button title="Subscribe" onPress={handleSubscribe} />
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
});

export default LoyaltyProgramDetails;
