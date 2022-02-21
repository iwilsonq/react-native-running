import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryScreen from "organisms/HistoryScreen";
import ProfileScreen from "organisms/ProfileScreen";
import RunScreen from "organisms/RunScreen";
import type { RootStackParamList } from "types/app";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Run" component={RunScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
