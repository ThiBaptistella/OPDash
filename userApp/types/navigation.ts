import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoyaltyProgram } from "./loyaltyProgram";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  LoyaltyProgramList: undefined;
  LoyaltyProgramDetails: { program: LoyaltyProgram };
};
export type LoginRouteProp = RouteProp<RootStackParamList, "Login">;

export type RegisterRouteProp = RouteProp<RootStackParamList, "Register">;

export type LoyaltyProgramDetailsRouteProp = RouteProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;
export type LoyaltyProgramDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;
