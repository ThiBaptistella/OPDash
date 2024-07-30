import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoyaltyProgramList from "../screens/LoyaltyProgramList";
import LoyaltyProgramDetails from "../screens/LoyaltyProgramDetails";
import FooterNavigation from "./FooterNavigation";
import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

const LoggedInNavigator: React.FC = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="LoyaltyProgramList"
          component={LoyaltyProgramList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoyaltyProgramDetails"
          component={LoyaltyProgramDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <FooterNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default LoggedInNavigator;
