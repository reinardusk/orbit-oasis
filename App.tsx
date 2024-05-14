import { Provider } from "react-redux";
import StacksHolder from "./navigations/StacksHolder";
import { SafeAreaView } from "react-native-safe-area-context";
import { store } from "./redux/store";
import { useEffect, useState } from "react";
import SplashScreen from "./screens/SplashScreen";
import * as SplashScreenExpo from "expo-splash-screen";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);
  SplashScreenExpo.preventAutoHideAsync();
  setTimeout(SplashScreenExpo.hideAsync, 3000);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 5000);
  }, []);

  if (isShowSplash) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StacksHolder />
      </SafeAreaView>
    </Provider>
  );
}
