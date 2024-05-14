import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../components/Loading";
import { PlanetsData } from "../types/types";
import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const HorizontalLinearGradient =
  Animated.createAnimatedComponent(LinearGradient);

export default function ListPlanet() {
  const [loading, setLoading] = useState<boolean>(false);
  const [planets, setPlanets] = useState<PlanetsData>({} as PlanetsData);
  const [search, setSearch] = useState<string>("");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const moveToDetail = (name: string, url: string) => {
    navigation.navigate("DetailPlanet", { name, url });
  };

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://swapi.dev/api/planets/?search=${search}`
      );
      setPlanets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSearch("");
      setLoading(false);
    }
  };

  const fetchNextPage = async () => {
    if (planets && planets.next && planets.results) {
      try {
        const { data } = await axios.get(planets.next);
        // const prevPlanetResults = planets.results;
        setPlanets({
          ...data,
          results: [...planets.results, ...data.results],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fadeIn();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={{ flex: 1 }}>
      <AnimatedLinearGradient
        colors={["rgba(0,0,0, 1)", "rgba(142, 5, 194, 0.4)"]}
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>Orbit Oasis</Text>
          <Text style={styles.headerText}>
            "Fuel your curiosity! Search for planets and delve into their unique
            characteristics. What wonders await?"
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={setSearch}
            onSubmitEditing={fetchPlanets}
          />
          <TouchableOpacity onPress={fetchPlanets}>
            <Text style={styles.searchButton}>Search</Text>
          </TouchableOpacity>
        </View>
        {planets && planets.results && planets.results.length > 0 && (
          <FlatList
            data={planets.results}
            onEndReached={fetchNextPage}
            extraData={planets.results}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <HorizontalLinearGradient
                start={[0, 1]}
                end={[1, 0]}
                colors={["rgba(255, 255, 255, 0.98)", "rgba(255, 255, 255, 1)"]}
                style={styles.cardContainer}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => moveToDetail(item.name, item.url)}
                  >
                    <Text style={styles.detailText}>Detail</Text>
                    <AntDesign name="arrowright" size={18} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardBodyContainer}>
                  <View>
                    <Text style={styles.text}>
                      Rotation Period: {item.rotation_period} hours
                    </Text>
                    <Text style={styles.text}>
                      Orbital Period: {item.orbital_period} days
                    </Text>
                    <Text style={styles.text}>Climate: {item.climate}</Text>
                  </View>
                  {Number(
                    item.url
                      .split("https://swapi.dev/api/planets/")[1]
                      .split("/")[0]
                  ) %
                    2 ==
                  0 ? (
                    <Image
                      source={require("../assets/spaceship.png")}
                      style={styles.cardImage}
                    />
                  ) : (
                    <Image
                      source={require("../assets/astronout.png")}
                      style={styles.cardImage}
                    />
                  )}
                </View>
              </HorizontalLinearGradient>
            )}
          />
        )}
      </AnimatedLinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingBottom: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  text: {
    color: "gray",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  searchButton: {
    backgroundColor: "#393e46",
    color: "white",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#393e46",
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  cardContainer: {
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    textShadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  cardBodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardImage: {
    width: 70,
    height: 70,
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 5,
  },
  detailText: {
    color: "black",
  },
});