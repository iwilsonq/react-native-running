import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "atoms/Text";
import Layout from "templates/Layout";

export function Countdown({ countdown }: { countdown: number }) {
  const [counter, setCounter] = React.useState(countdown / 1000);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [counter]);

  return (
    <Layout>
      <View style={styles.container}>
        <Text size="xl">{counter}</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});
