import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import useAuth from "../hooks/useAuth";

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const { resetPassword, loading, error } = useAuth();

  const handleResetPassword = async () => {
    console.log("Attempting password reset for:", email);
    try {
      await resetPassword(email);
      console.log("Password reset email sent");
      navigation.navigate("Login");
    } catch (err) {
      console.error("Password reset error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleTopLeft} />
      <View style={styles.circleTopRight} />
      <View style={styles.circleTopCenter} />
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bdbdbd"
        value={email}
        onChangeText={setEmail}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Sending..." : "Done"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.registerLinkText}>
          Already have an account?{" "}
          <Text style={styles.createAccountText}>sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  circleTopLeft: {
    position: "absolute",
    top: -70,
    left: -50,
    width: 150,
    height: 150,
    backgroundColor: "#D9D9D9",
    borderRadius: 75,
  },
  circleTopCenter: {
    position: "absolute",
    top: -80,
    left: 90,
    width: 200,
    height: 200,
    backgroundColor: "#7351E4",
    borderRadius: 100,
  },
  circleTopRight: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    backgroundColor: "#D9D9D9",
    borderRadius: 75,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "left",
    color: "#000000",
  },
  input: {
    height: 48,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 16,
    color: "#000",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#7351E4",
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  registerLink: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  registerLinkText: {
    color: "#757575",
    fontSize: 14,
  },
  createAccountText: {
    color: "#000000",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
});

export default ForgotPasswordScreen;
