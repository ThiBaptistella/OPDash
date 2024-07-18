import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoyaltyProgram } from "./loyaltyProgram";

export type RootStackParamList = {
  LoyaltyProgramList: undefined;
  LoyaltyProgramDetails: { program: LoyaltyProgram };
};

export type LoyaltyProgramDetailsRouteProp = RouteProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;
export type LoyaltyProgramDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;
