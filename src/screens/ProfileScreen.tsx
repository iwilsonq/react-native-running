import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Layout from "templates/Layout";
import { BottomTabParamList } from "types/app";

export function ProfileScreen({
  navigation,
}: NativeStackScreenProps<BottomTabParamList, "Profile">) {
  return (
    <Layout>
      <View>
        <Text>Profile</Text>
      </View>
    </Layout>
  );
}
