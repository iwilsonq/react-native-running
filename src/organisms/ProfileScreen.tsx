import React from 'react';
import {View, Text} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Layout from 'templates/Layout';
import { RootStackParamList } from "types/app";

function ProfileScreen({navigation}: NativeStackScreenProps<RootStackParamList, "Profile">) {
  return (
    <Layout>
      <View>
        <Text>Profile</Text>
      </View>
    </Layout>
  );
}

export default ProfileScreen;
