import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoyaltyProgram } from "./loyaltyProgram";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  LoggedIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  LoyaltyProgramList: undefined;
  LoyaltyProgramDetails: { program: LoyaltyProgram };
  Map: undefined;
  Wallet: undefined;
  Settings: undefined;
};

export type LoginRouteProp = RouteProp<RootStackParamList, "Login">;
export type RegisterRouteProp = RouteProp<RootStackParamList, "Register">;
export type ForgotPasswordRouteProp = RouteProp<
  RootStackParamList,
  "ForgotPassword"
>;
export type LoyaltyProgramDetailsRouteProp = RouteProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;
export type LoyaltyProgramDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoyaltyProgramDetails"
>;
export type FooterNavigationProp = StackNavigationProp<RootStackParamList>;
