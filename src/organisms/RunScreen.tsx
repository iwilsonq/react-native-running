import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "types/app";
import Layout from "templates/Layout";
import useGeolocation from "hooks/useGeolocation";
import { MapView } from "molecules/MapView";

function RunScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Run">) {
  const { region } = useGeolocation();

  return (
    <Layout>
      <MapView region={region} />
    </Layout>
  );
}

export default RunScreen;
