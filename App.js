import React, { useEffect, useState, useNa } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import City from "./City.js";
import Home from "./Home.js";

const Stack = createNativeStackNavigator();

const ExampleAPIs = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
         
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="City" component={City} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ExampleAPIs;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "blue",
    fontSize: 25,
    padding: 5,
  },
  title: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  min: {
    backgroundColor: "#CAF4FF",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  textMin: {
    fontSize: 20,
    color: "black",
  },
  max: {
    backgroundColor: "#F28585",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  textMax: {
    fontSize: 20,
    color: "black",
  },
  temps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
