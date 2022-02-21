import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    paddingTop: 20,
  },
});

export default Layout;
