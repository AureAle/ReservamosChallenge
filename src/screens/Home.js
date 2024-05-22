import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const Home = ({ navigation: { navigate } }) => {
  const [cities, setCities] = useState();
  const [city, setCity] = useState("");

  const getCity = () => {
    fetch(`https://search.reservamos.mx/api/v2/places?q=${city}`)
      .then((response) => response.json())
      .then((json) => {
        setCities(json);
      });
  };

  useEffect(() => {
    setCity("");
    getCity();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.header}>Reservamos Weather API</Text>
        <Image
          source={require("../../assets/images/reservamos.webp")}
          style={{ width: "auto", height: 70 }}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.txtLabel}>Search for a city</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Search for a city"
          value={city}
          onChangeText={(city) => {
            setCity(city);
          }}
        />
        <Button title="Search" onPress={getCity} color={"#002674"} />
        <FlatList
          data={cities}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                getCity();
                navigate("City", {
                  cityName: item.city_slug,
                  lat: item.lat,
                  long: item.long,
                });
              }}
            >
              <View style={styles.item}>
                <Text style={styles.cityName}>{item.city_slug}</Text>

                <Text style={styles.display}>{item.display}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4fc1e0",
  },
  title: {
    flex: 1,
    padding: 20,
  },
  body: {
    flex: 6,
    padding: 20,
  },
  item: {
    backgroundColor: "#77bd42",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  txtLabel: {
    fontSize: 20,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  cityName: {
    fontSize: 30,
    color: "#002674",
  },
  display: {
    fontSize: 20,
    color: "#ffffff",
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
  },
  textInput: {
    fontSize: 25,
    padding: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  button: {
    color: "#002674",
    size: 20,
  }
});
