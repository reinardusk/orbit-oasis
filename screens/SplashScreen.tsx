import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <AnimatedLinearGradient
      colors={["rgba(0,0,0, 1)", "rgba(142, 5, 194, 0.4)"]}
      style={styles.container}
    >
      <Animated.View style={[{}, { opacity: fadeAnim }]}>
        <Text style={styles.text}>Orbit Oasis</Text>
      </Animated.View>
    </AnimatedLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#381bf5",
    opacity: 0.7,
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
});

export default SplashScreen;
