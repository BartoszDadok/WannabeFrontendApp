import { StyleSheet, View, Image } from "react-native";
import React from "react";

interface Props {
  lockOpen: boolean;
}
const LockIcon = ({ lockOpen }: Props) => {
  return lockOpen ? (
    <View>
      <Image
        style={{ width: 20, height: 20, marginRight: 10 }}
        source={require("../../assets/images/lock-opened.png")}
      />
    </View>
  ) : (
    <View>
      <Image
        style={{ width: 20, height: 20, marginRight: 10 }}
        source={require("../../assets/images/lock-closed.png")}
      />
    </View>
  );
};

export default LockIcon;

const styles = StyleSheet.create({});
