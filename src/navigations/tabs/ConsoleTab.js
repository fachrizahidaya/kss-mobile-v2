import { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Image, Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ModuleSelectSheet from "../../styles/actionsheets/ModuleSelectSheet";
import ConsoleScreenSheet from "../../styles/actionsheets/ConsoleScreenSheet";
import ConsoleAddNewSheet from "../../styles/actionsheets/ConsoleAddNewSheet";
import { Colors } from "../../styles/Color";
import ConsoleDashboard from "../../screens/Console/Dashboard";
import Users from "../../screens/Console/Users";

const Tab = createBottomTabNavigator();

function EmptyScreen() {
  return null; // Empty component
}

const ConsoleTab = () => {
  const consoleScreenSheetRef = useRef(null);
  const consoleAddNewSheetRef = useRef(null);
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
          tabBarButton: ["Users"].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={ConsoleDashboard}
          options={{
            tabBarIcon: ({ size, color }) => (
              <View style={styles.menuIcon}>
                <MaterialCommunityIcons
                  name="home-outline"
                  size={20}
                  color={Colors.iconDark}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Add"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <View style={styles.addMenuIcon}>
                <MaterialCommunityIcons name="plus" size={20} color={Colors.iconDark} />
              </View>
            ),
            tabBarButton: (props) => (
              <Pressable {...props} onPress={() => consoleAddNewSheetRef.current?.show()}>
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
                <MaterialCommunityIcons name="menu" size={20} color={Colors.iconDark} />
              </View>
            ),
            tabBarButton: (props) => (
              <Pressable {...props} onPress={() => consoleScreenSheetRef.current?.show()}>
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
              <Image
                source={require("../../assets/icons/ruler_logo.png")}
                style={styles.moduleImage}
                alt="tribe logo"
              />
            ),
            tabBarButton: (props) => (
              <Pressable {...props} onPress={() => moduleSelectSheetRef.current?.show()}>
                {props.children}
              </Pressable>
            ),
          }}
        />
        <Tab.Screen name="Users" component={Users} />
      </Tab.Navigator>

      {/* Sheets */}
      <ConsoleScreenSheet reference={consoleScreenSheetRef} />

      <ConsoleAddNewSheet reference={consoleAddNewSheetRef} />

      <ModuleSelectSheet reference={moduleSelectSheetRef} />
    </>
  );
};

export default ConsoleTab;

const styles = StyleSheet.create({
  menuIcon: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    padding: 2,
  },
  addMenuIcon: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    padding: 2,
    // position: "absolute",
    // bottom: Platform.OS === "ios" ? 10 : 25,
  },
  moduleImage: {
    resizeMode: "contain",
    height: 35,
    width: 35,
  },
});
