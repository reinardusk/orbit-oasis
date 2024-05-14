import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListPlanet from "../screens/ListPlanet";
import WishlistPlanet from "../screens/WishlistPlanet";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { TabIconName } from "../types/types";
import { StyleSheet, Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#222831",
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: TabIconName = "planet-outline";
          if (route.name === "Planets") {
            focused
              ? ((iconName = "planet"), (color = "#8563ff"))
              : ((iconName = "planet-outline"), (color = "gray"));
          } else if (route.name === "Wishlist") {
            focused
              ? ((iconName = "heart"), (color = "#8563ff"))
              : ((iconName = "heart-outline"), (color = "gray"));
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          if (route.name === "Planets") {
            focused ? (color = "#8563ff") : (color = "gray");
          } else if (route.name === "Wishlist") {
            focused ? (color = "#8563ff") : (color = "gray");
          }
          return <Text style={{ ...styles.label, color }}>{route.name}</Text>;
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Planets" component={ListPlanet} />
      <Tab.Screen name="Wishlist" component={WishlistPlanet} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    paddingBottom: 3,
  },
});
