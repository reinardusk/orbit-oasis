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
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import NotFound from "../components/NotFound";
import ScrollLoading from "../components/ScrollLoading";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const HorizontalLinearGradient =
  Animated.createAnimatedComponent(LinearGradient);

export default function ListPlanet() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [scrollLoading, setScrollLoading] = useState<boolean>(false);
  const [planets, setPlanets] = useState<PlanetsData>({} as PlanetsData);
  const [search, setSearch] = useState<string>("");

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const moveToDetail = (name: string, url: string) => {
    navigation.navigate("DetailPlanet", { name, url });
  };

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://swapi.dev/api/planets/`);
      setPlanets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchPlanets = async () => {
    try {
      setLoadingSearch(true);
      const { data } = await axios.get(
        `https://swapi.dev/api/planets/?search=${search}`
      );
      setPlanets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const fetchNextPage = async () => {
    if (planets && planets.next && planets.results) {
      try {
        setScrollLoading(true);
        const { data } = await axios.get(planets.next);
        // const prevPlanetResults = planets.results;
        setPlanets({
          ...data,
          results: [...planets.results, ...data.results],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setScrollLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={{ flex: 1 }}>
      <AnimatedLinearGradient
        colors={["rgba(0,0,0, 1)", "rgba(142, 5, 194, 0.4)"]}
        style={styles.container}
      >
        {scrollLoading && <ScrollLoading />}
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
            onSubmitEditing={fetchSearchPlanets}
          />
          <TouchableOpacity onPress={fetchSearchPlanets}>
            <Text style={styles.searchButton}>Search</Text>
          </TouchableOpacity>
        </View>
        {loadingSearch && <Loading />}
        {!loadingSearch &&
          planets &&
          planets.results &&
          planets.results.length > 0 && (
            <FlatList
              data={planets.results}
              onEndReached={fetchNextPage}
              extraData={planets.results}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <HorizontalLinearGradient
                  start={[0, 1]}
                  end={[1, 1]}
                  colors={["rgba(255, 101, 132, 0.6)", "rgba(0,0,0, 0.9)"]}
                  style={styles.cardContainer}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <TouchableOpacity
                      style={styles.detailButton}
                      onPress={() => moveToDetail(item.name, item.url)}
                    >
                      <Text style={styles.detailText}>Detail</Text>
                      <AntDesign
                        name="arrowright"
                        size={18}
                        color="black"
                        style={styles.detailText}
                      />
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
        {!loadingSearch && planets?.results?.length === 0 && <NotFound />}
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
    color: "white",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#ff6584",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#393e46",
    borderRadius: 5,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  cardContainer: {
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    textShadowRadius: 5,
    margin: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  cardBodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
    color: "#ff6584",
  },
});
