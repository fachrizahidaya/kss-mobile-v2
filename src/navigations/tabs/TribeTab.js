import { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet, View, Image, Pressable, Platform } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Feed from "../../screens/Tribe/Dashboard";
import MyInformation from "../../screens/Tribe/Information";
import Payslip from "../../screens/Tribe/Payslip";
import Contact from "../../screens/Tribe/Contact";
import PersonalLeave from "../../screens/Tribe/Leave";
import CalendarScreen from "../../screens/Calendar";
import Attendance from "../../screens/Tribe/Attendance";
import Reimbursement from "../../screens/Tribe/Reimbursement/Reimbursement";
import TribeScreenSheet from "../../styles/actionsheets/TribeScreenSheet";
import TribeAddNewSheet from "../../styles/actionsheets/TribeAddNewSheet";
import ModuleSelectSheet from "../../styles/actionsheets/ModuleSelectSheet";
import Evaluation from "../../screens/Tribe/Performance";
import { Colors } from "../../styles/Color";
import LiveBrand from "../../screens/Tribe/LiveHost/Brand";
import LiveSchedule from "../../screens/Tribe/LiveHost/Schedule";
import LiveHistory from "../../screens/Tribe/LiveHost/History";
import LiveSession from "../../screens/Tribe/LiveHost/Session";
import Host from "../../screens/Tribe/LiveHost/Host";
import KPIAppraisalReview from "../../screens/Tribe/Performance/Review/KPIAppraisalReview";
import PerformanceListScreen from "../../screens/Tribe/Performance/Result/PerformanceListScreen";
import KPIListScreen from "../../screens/Tribe/Performance/KPI/KPIListScreen";
import AppraisalListScreen from "../../screens/Tribe/Performance/Appraisal/AppraisalListScreen";
import Overtime from "../../screens/Tribe/Overtime";

const Tab = createBottomTabNavigator();

function EmptyScreen() {
  return null; // Empty component
}

const TribeTab = () => {
  const tribeScreenSheetRef = useRef(null);
  const tribeAddNewSheetRef = useRef(null);
  const moduleSelectSheetRef = useRef(null);

  /**
   * Toggles the specified state and resets other states to false.
   * @param {string} stateToToggle - The state key to toggle.
   */

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { height: 80 },
          tabBarHideOnKeyboard: true,
          // Hide these certain screens from bottom tab navigation
          tabBarButton: [
            "My Information",
            "Attendance",
            "Overtime",
            "Leave Requests",
            "Reimbursement",
            "Payslip",
            "Calendar Tribe",
            "Contact",
            "Employee KPI",
            "Employee Appraisal",
            "Employee Review",
            "Performance Result",
            "Comment List Screen",
            // "Evaluation",
            "E-Commerce Brand",
            "E-Commerce Live Schedule",
            "E-Commerce Live Host",
            "E-Commerce Live History",
            "E-Commerce Live Session",
          ].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={Feed}
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
          name="Search"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <View style={styles.menuIcon}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={20}
                  color={Colors.iconDark}
                />
              </View>
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Global Search Tribe");
            },
          })}
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
              <Pressable {...props} onPress={() => tribeAddNewSheetRef.current?.show()}>
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
              <Pressable {...props} onPress={() => tribeScreenSheetRef.current?.show()}>
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
                source={require("../../assets/icons/tribe_logo.png")}
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
        <Tab.Screen name="My Information" component={MyInformation} />

        <Tab.Screen name="Attendance" component={Attendance} />

        <Tab.Screen name="Overtime" component={Overtime} />

        <Tab.Screen name="Leave Requests" component={PersonalLeave} />

        <Tab.Screen name="Reimbursement" component={Reimbursement} />

        <Tab.Screen name="Payslip" component={Payslip} />

        <Tab.Screen name="Calendar Tribe" component={CalendarScreen} />

        <Tab.Screen name="E-Commerce Brand" component={LiveBrand} />

        <Tab.Screen name="E-Commerce Live Schedule" component={LiveSchedule} />

        <Tab.Screen name="E-Commerce Live History" component={LiveHistory} />

        <Tab.Screen name="E-Commerce Live Session" component={LiveSession} />

        <Tab.Screen name="E-Commerce Live Host" component={Host} />

        <Tab.Screen name="Contact" component={Contact} />

        {/* <Tab.Screen name="Evaluation" component={Evaluation} /> */}

        <Tab.Screen name="Employee KPI" component={KPIListScreen} />

        <Tab.Screen name="Employee Appraisal" component={AppraisalListScreen} />

        <Tab.Screen name="Employee Review" component={KPIAppraisalReview} />

        <Tab.Screen name="Performance Result" component={PerformanceListScreen} />
      </Tab.Navigator>

      {/* Sheets */}
      <TribeScreenSheet reference={tribeScreenSheetRef} />

      <TribeAddNewSheet reference={tribeAddNewSheetRef} />

      <ModuleSelectSheet reference={moduleSelectSheetRef} />
    </>
  );
};

export default TribeTab;

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
