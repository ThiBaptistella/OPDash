import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
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
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#757575"
        value={email}
        onChangeText={setEmail}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F4F6F8",
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
    textAlign: "center",
    color: "#673AB7",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "#000",
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
  },
  link: {
    marginTop: 10,
    alignItems: "center",
  },
  linkText: {
    color: "#1E88E5",
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
});

export default ForgotPasswordScreen;
