import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import FooterNavigation from "../navigation/FooterNavigation";
import useLoyaltyPrograms from "../hooks/useLoyaltyPrograms";

type LoyaltyProgramListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;

const { width } = Dimensions.get("window");

const LoyaltyProgramList: React.FC = () => {
  const { loyaltyPrograms, loading, error } = useLoyaltyPrograms();
  const navigation = useNavigation<LoyaltyProgramListNavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState(loyaltyPrograms);

  useEffect(() => {
    setFilteredPrograms(
      loyaltyPrograms.filter((program) =>
        program.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, loyaltyPrograms]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const featuredPrograms = loyaltyPrograms.slice(0, 3);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          padding: 12,
          marginTop: 22,
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Discover</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name"
                placeholderTextColor="#bdbdbd"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <Text style={styles.sectionTitle}>Featured</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.featuredContainer}
            >
              {featuredPrograms.map((program) => (
                <View key={program._id} style={styles.featuredCard}>
                  <Text style={styles.featuredTitle}>{program.name}</Text>
                  <Text style={styles.featuredDescription}>
                    {program.description}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.tabsContainer}>
              <Text style={styles.tab}>Featured</Text>
              <Text style={styles.tabInactive}>Location</Text>
              <Text style={styles.tabInactive}>Category</Text>
            </View>
          </>
        }
        data={filteredPrograms}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("LoyaltyProgramDetails", { program: item })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.programTitle}>{item.name}</Text>
              <Text style={styles.programDescription}>{item.description}</Text>
              <TouchableOpacity style={styles.activeButton}>
                <Text style={styles.activeButtonText}>
                  {item.isActive ? "Activated" : "Active"}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <FooterNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000000",
  },
  searchContainer: {
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000000",
  },
  featuredContainer: {
    marginBottom: 20,
  },
  featuredCard: {
    width: width * 0.6,
    height: 150,
    backgroundColor: "#7351E4",
    borderRadius: 8,
    marginRight: 10,
    padding: 16,
    justifyContent: "center",
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 16,
  },
  tabInactive: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#bdbdbd",
    marginRight: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: width * 0.2,
    height: 80,
    backgroundColor: "#7351E4",
    borderRadius: 8,
    marginRight: 10,
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  programDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  activeButton: {
    backgroundColor: "#7351E4",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    width: 100,
  },
  activeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footerIcon: {
    alignItems: "center",
  },
});

export default LoyaltyProgramList;
