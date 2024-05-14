import { Provider } from "react-redux";
import StacksHolder from "./navigations/StacksHolder";
import { SafeAreaView } from "react-native-safe-area-context";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StacksHolder />
      </SafeAreaView>
    </Provider>
  );
}
