import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";

const City = ({ route, navigation }) => {
  const cityName = route.params.cityName;
  const lat = route.params.lat;
  const long = route.params.long;

  const [forecast, setForecast] = useState();
  const [current, setCurrent] = useState("");
  const fiveDaysOnly = [];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const API_key = "YOUR_API_KEY_HERE"; // Replace with your API key

  const setNewData = (json) => {
     let previousDate = new Date().toISOString().slice(0, 10);
   

    var minSoFar = Number.MAX_VALUE;
    var maxSoFar = Number.MIN_VALUE;

    for (let item of json.list) {
      let currentMinTemp = item.main.temp_min;
      let currentMaxTemp = item.main.temp_max;
      if (minSoFar > currentMinTemp) {
        minSoFar = currentMinTemp;
      }
      if (maxSoFar < currentMaxTemp) {
        maxSoFar = currentMaxTemp;
      }

      let dtTxt = item.dt_txt;
      let date = new Date(dtTxt);

      let currentDate = date.toISOString().slice(0, 10);
      if (currentDate !== previousDate) {
        const day = dayNames[date.getDay()];

        fiveDaysOnly.push({
          day: day,
          maxTemp: maxSoFar,
          minTemp: minSoFar,
        });
        minSoFar = Number.MAX_VALUE;
        maxSoFar = Number.MIN_VALUE;
      }

      previousDate = currentDate;
    }
  };

  const getWeatherAPI = async () => {
    try {
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_key}&units=metric`
      )
        .then((response) => response.json())
        .then((json) => {
          setNewData(json);
          setCurrent(json.list[0].main.temp);
        })
        .then(() => {
          setForecast(fiveDaysOnly);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWeatherAPI();
    console.log(forecast)
  }, []);

  const listHeaderComponent = () => (
    <View style={styles.separator}>
      <Text style={styles.txtSep}>Tomorrow</Text>
    </View>
  );

  const ItemSeparator = ({ leadingItem }) => {
    return leadingItem ? (
      <View style={styles.separator}>
        <Text style={styles.txtSep}>{leadingItem.day}</Text>
      </View>
    ) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.cityName}>{cityName}</Text>
        <Text style={styles.temp}>{current}°C</Text>
        <Image
          source={require("../../assets/images/weather.jpg")}
          style={{ width: 130, height: 100 }}
        />
      </View>
      <View style={styles.body}>
        <FlatList
          data={forecast}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={styles.item}>
                <Text style={styles.txtTemp}>Min {item.minTemp}°C</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.txtTemp}>Max {item.maxTemp}°C</Text>
              </View>
            </View>
          )}
          ListHeaderComponent={listHeaderComponent}
          ItemSeparatorComponent={(props) => (
            <ItemSeparator leadingItem={props.leadingItem} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default City;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4fc1e0",
  },
  titleContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    padding: 20,
  },
  body: {
    flex: 6,
    padding: 20,
    justifyContent: "center",
  },
  cityName: {
    fontSize: 60,
    color: "#ffffff",
    textAlign: "center",
    textTransform: "capitalize",
  },
  item: {
    backgroundColor: "#77bd42",
    height: 60,
    margin: 3,
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
  },
  temp: {
    fontSize: 70,
    textAlign: "center",
    color: "#002674",
  },
  separator: {
    color: "#002674",
    fontSize: 30,
  },
  txtSep: {
    fontSize: 20,
  },
  txtTemp: {
    fontSize: 20,
  },
});
