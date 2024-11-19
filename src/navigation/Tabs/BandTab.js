import { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet, Pressable, View, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BandDashboard from "../../screens/Band/Dashboard";
import ProjectList from "../../screens/Band/Project";
import AdHoc from "../../screens/Band/AdHoc";
import MyTeam from "../../screens/Band/Team";
import Notes from "../../screens/Band/Notes";
import CalendarScreen from "../../screens/Calendar";
import BandScreenSheet from "../../styles/actionsheets/BandScreenSheet";
import BandAddNewSheet from "../../styles/actionsheets/BandAddNewSheet";
import ModuleSelectSheet from "../../styles/actionsheets/ModuleSelectSheet";

const Tab = createBottomTabNavigator();

function EmptyScreen() {
  return null; // Empty component
}

const BandTab = () => {
  const bandScreenSheetRef = useRef(null);
  const bandAddNewSheetRef = useRef(null);
  const moduleSelectSheetRef = useRef(null);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { height: 80 },
          tabBarHideOnKeyboard: true,
          // Hide these certain screens from bottom tab navigation
          tabBarButton: ["Projects", "Tasks", "My Team", "Notes", "Calendar Band"].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={BandDashboard}
          options={{
            tabBarIcon: ({ size, color }) => (
              <View style={styles.menuIcon}>
                <MaterialCommunityIcons name="home-outline" size={20} color="#3F434A" />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <View style={styles.menuIcon}>
                <MaterialCommunityIcons name="magnify" size={20} color="#3F434A" />
              </View>
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Global Search");
            },
          })}
        />
        <Tab.Screen
          name="Add"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <View style={styles.menuIcon}>
                <MaterialCommunityIcons name="plus" size={20} color="#3F434A" />
              </View>
            ),
            tabBarButton: (props) => (
              <Pressable {...props} onPress={() => bandAddNewSheetRef.current?.show()}>
                {props.children}
              </Pressable>
            ),
          }}
        />
        <Tab.Screen
          name="Screen List"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <View style={styles.menuIcon}>
                <MaterialCommunityIcons name="menu" size={20} color="#3F434A" />
              </View>
            ),
            tabBarButton: (props) => (
              <Pressable {...props} onPress={() => bandScreenSheetRef.current?.show()}>
                {props.children}
              </Pressable>
            ),
          }}
        />
        <Tab.Screen
          name="Module Selection"
          component={EmptyScreen}
          options={{
            tabBarIcon: () => (
              <Image source={require("../../assets/icons/band_logo.png")} alt="band logo" style={styles.moduleImage} />
            ),
            tabBarButton: (props) => (
              <Pressable {...props} onPress={() => moduleSelectSheetRef.current?.show()}>
                {props.children}
              </Pressable>
            ),
          }}
        />
        <Tab.Screen name="Projects" component={ProjectList} />

        <Tab.Screen name="Tasks" component={AdHoc} />

        <Tab.Screen name="My Team" component={MyTeam} />

        <Tab.Screen name="Notes" component={Notes} />

        <Tab.Screen name="Calendar Band" component={CalendarScreen} />
      </Tab.Navigator>

      {/* Sheets */}
      <BandScreenSheet reference={bandScreenSheetRef} />

      <BandAddNewSheet reference={bandAddNewSheetRef} />

      <ModuleSelectSheet reference={moduleSelectSheetRef} />
    </>
  );
};

export default BandTab;

const styles = StyleSheet.create({
  menuIcon: {
    backgroundColor: "#fbfbfb",
    borderRadius: 50,
    padding: 2,
  },
  moduleImage: {
    resizeMode: "contain",
    height: 35,
    width: 35,
  },
});
