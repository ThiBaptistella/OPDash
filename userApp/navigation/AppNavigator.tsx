import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoyaltyProgramList from "../screens/LoyaltyProgramList";
import LoyaltyProgramDetails from "../screens/LoyaltyProgramDetails";

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="LoyaltyProgramList"
          component={LoyaltyProgramList}
        />
        <Stack.Screen
          name="LoyaltyProgramDetails"
          component={LoyaltyProgramDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
