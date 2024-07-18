import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import useLoyaltyPrograms from "../hooks/useLoyaltyPrograms";

type LoyaltyProgramListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;

const LoyaltyProgramList: React.FC = () => {
  const { loyaltyPrograms, fetchLoyaltyPrograms } = useLoyaltyPrograms();
  const navigation = useNavigation<LoyaltyProgramListNavigationProp>();

  useEffect(() => {
    fetchLoyaltyPrograms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={loyaltyPrograms}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("LoyaltyProgramDetails", { program: item })
            }
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default LoyaltyProgramList;
