import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import Details from "../screens/Details";

export type RootParams = {
  Home: undefined;
  Details: { item: any };
};

const Stack = createNativeStackNavigator<RootParams>();

const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
