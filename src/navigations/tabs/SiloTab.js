import { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Pressable, StyleSheet, View, Image } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ModuleSelectSheet from "../../styles/actionsheets/ModuleSelectSheet";
import SiloDashboard from "../../screens/Silo/Dashboard";
import SiloScreenSheet from "../../styles/actionsheets/SiloScreenSheet";
import CourierPickupScreen from "../../screens/Silo/CourierPickup";
import Courier from "../../screens/Silo/Courier";
import { Colors } from "../../styles/Color";

const Tab = createBottomTabNavigator();

function EmptyScreen() {
  return null; // Empty component
}

const SiloTab = () => {
  const siloScreenSheetRef = useRef(null);
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
          tabBarButton: ["Courier", "Courier Pickup"].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={SiloDashboard}
          options={{
            tabBarIcon: ({ size, color }) => (
              <View style={styles.menuIcon}>
                <MaterialCommunityIcons name="home-outline" size={20} color={Colors.iconDark} />
              </View>
            ),
          }}
        />

        {/* <Tab.Screen
      name="Add"
      component={EmptyScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <View style={styles.menuIcon}>
            <MaterialCommunityIcons name="plus" size={20} color="#3F434A" />
          </View>
        ),
        tabBarButton: (props) => (
          <Pressable {...props} onPress={() => tribeAddNewSheetRef.current?.show()}>
            {props.children}
          </Pressable>
        ),
      }}
    /> */}
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
              <Pressable {...props} onPress={() => siloScreenSheetRef.current?.show()}>
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
              <Image source={require("../../assets/icons/silo_logo.png")} style={styles.moduleImage} alt="silo logo" />
            ),
            tabBarButton: (props) => (
              <Pressable {...props} onPress={() => moduleSelectSheetRef.current?.show()}>
                {props.children}
              </Pressable>
            ),
          }}
        />

        <Tab.Screen name="Courier" component={Courier} />
        <Tab.Screen name="Courier Pickup" component={CourierPickupScreen} />
      </Tab.Navigator>

      {/* Sheets */}
      <SiloScreenSheet reference={siloScreenSheetRef} />

      <ModuleSelectSheet reference={moduleSelectSheetRef} />
    </>
  );
};

export default SiloTab;

const styles = StyleSheet.create({
  menuIcon: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 50,
    padding: 2,
  },
  moduleImage: {
    resizeMode: "contain",
    height: 35,
    width: 35,
  },
});
