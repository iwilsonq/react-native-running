import type { BottomTabParamList, RunStackParamList } from "types/app";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HistoryScreen } from "screens/HistoryScreen";
import { ProfileScreen } from "screens/ProfileScreen";
import { StartRunScreen } from "screens/StartRunScreen";
import { ComponentScreen } from "screens/ComponentScreen";
import { RunDashboardScreen } from "screens/RunDashboardScreen";
import { RunSummaryScreen } from "screens/RunSummaryScreen";
import { RunStateProvider } from "contexts/RunStateContext";

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();
const RunStack = createNativeStackNavigator<RunStackParamList>();

function Tabs() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <BottomTabs.Screen
        name="StartRun"
        component={StartRunScreen}
        options={{ headerShown: false }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <BottomTabs.Screen
        name="Component"
        component={ComponentScreen}
        options={{ headerShown: false }}
      />
    </BottomTabs.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RunStateProvider>
        <RunStack.Navigator>
          <RunStack.Screen
            name="Run"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <RunStack.Screen
            name="RunDashboard"
            component={RunDashboardScreen}
            options={{ headerShown: false }}
          />
          <RunStack.Screen
            name="RunSummary"
            component={RunSummaryScreen}
            options={{ headerShown: false }}
          />
        </RunStack.Navigator>
      </RunStateProvider>
    </NavigationContainer>
  );
}

export default App;
