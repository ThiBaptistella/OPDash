import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoyaltyProgramList from "./components/LoyaltyProgramList";
import LoyaltyProgramDetails from "./components/LoyaltyProgramDetails";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoyaltyProgramList">
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

export default App;
