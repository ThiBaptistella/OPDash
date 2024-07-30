import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FooterNavigationProp } from "../types/navigation";
//@ts-ignore
import DiscoverIcon from "../assets/discover.svg";
//@ts-ignore
import MapIcon from "../assets/map.svg";
//@ts-ignore
import WalletIcon from "../assets/wallet.svg";
//@ts-ignore
import SettingsIcon from "../assets/settings.svg";

const FooterNavigation: React.FC = () => {
  const navigation = useNavigation<FooterNavigationProp>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerIcon}
        onPress={() => navigation.navigate("LoyaltyProgramList")}
      >
        <DiscoverIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerIcon}
        onPress={() => navigation.navigate("LoyaltyProgramList")}
      >
        <MapIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerIcon}
        onPress={() => navigation.navigate("LoyaltyProgramList")}
      >
        <WalletIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerIcon}
        onPress={() => navigation.navigate("LoyaltyProgramList")}
      >
        <SettingsIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    padding: 16,
  },
  footerIcon: {
    alignItems: "center",
  },
});

export default FooterNavigation;
