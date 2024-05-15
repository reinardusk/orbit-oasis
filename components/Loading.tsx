import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, ActivityIndicator, Animated, StyleSheet } from "react-native";
function Loading() {
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);
  return (
    <>
      <AnimatedLinearGradient
        colors={["rgba(0,0,0, 0.9)", "rgba(142, 5, 194, 0.4)"]}
        style={styles.container}
      >
        <ActivityIndicator size="large" color="#ff6584" />
      </AnimatedLinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#381bf5",
    opacity: 0.7,
  },
});

export default Loading;
