import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { theme } from "theme/theme";

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
    backgroundColor: theme.colors.white,
  },
  content: {
    paddingTop: 20,
  },
});

export default Layout;
