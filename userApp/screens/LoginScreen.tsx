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
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    console.log("Attempting login with:", { email, password });
    try {
      const user = await login(email, password);
      console.log("Login response:", user);
      if (user) {
        await AsyncStorage.setItem("userId", user.user._id);
        console.log("Stored userId:", user.user._id);
        navigation.navigate("LoggedIn");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleTopLeft} />
      <View style={styles.circleTopRight} />
      <View style={styles.circleTopCenter} />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bdbdbd"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#bdbdbd"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Done"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerLinkText}>
          Dont have an account?{" "}
          <Text style={styles.createAccountText}>create account</Text>
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
  forgotPassword: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "#9e9e9e",
    fontSize: 14,
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

export default LoginScreen;
