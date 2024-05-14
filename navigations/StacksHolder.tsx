import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import DetailPlanet from "../screens/DetailPlanet";

const Stack = createNativeStackNavigator();

const StacksHolder = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RootNavigation" component={TabNavigation} />
        <Stack.Screen
          name="DetailPlanet"
          component={DetailPlanet}
          options={{ headerShown: true, title: "Planet's Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StacksHolder;
