import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Layout from "templates/Layout";
import { BottomTabParamList } from "types/app";
import { Button } from "atoms/Button";
import { Text } from "atoms/Text";
import { theme } from "theme/theme";

export function ComponentScreen({
  navigation,
}: BottomTabScreenProps<BottomTabParamList, "Component">) {
  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.heading}>
          <Text size="lg">Components</Text>
        </View>
        <View style={styles.section}>
          <Text size="lg">Typography</Text>
          <View style={styles.sectionItems}>
            <Text size="xs">xs for fine print</Text>
            <Text size="sm">sm for most copy</Text>
            <Text size="md">md for section headers</Text>
            <Text size="lg">lg for screen headings</Text>
            <Text size="xl">xl for big text</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text size="lg">Buttons</Text>
          <View style={styles.sectionItems}>
            <Button variant="primary" onPress={() => undefined}>
              Primary
            </Button>
            <Button variant="secondary" onPress={() => undefined}>
              Secondary
            </Button>
            <Button variant="danger" onPress={() => undefined}>
              Danger
            </Button>
            <Button variant="success" onPress={() => undefined}>
              Success
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
  },
  heading: {
    marginBottom: 16,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.light,
    paddingHorizontal: 8,
    marginBottom: 16,
    paddingBottom: 8,
  },
  sectionItems: {},
});
