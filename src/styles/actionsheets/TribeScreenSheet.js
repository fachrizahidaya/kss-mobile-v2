import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useGetSubMenu } from "../../hooks/useGetSubMenu";
import { TextProps } from "../CustomStylings";
import CustomSheet from "../../layouts/CustomSheet";
import { Colors } from "../Color";

const TribeScreenSheet = (props) => {
  const navigation = useNavigation();
  const menuSelector = useSelector((state) => state.user_menu);

  const { mergedMenu } = useGetSubMenu(menuSelector.user_menu);
  const excludeSubscreen = [
    "Leave History",
    "Employee KPI",
    "Employee Appraisal",
    "Employee Review",
    "Performance Result",
  ];
  const filteredMenu = mergedMenu.filter(
    (item) => !excludeSubscreen.includes(item.name) && item?.is_allow === true && item?.is_mobile === true
  );

  return (
    <CustomSheet moduleScreenSheet={true} reference={props.reference}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
        {filteredMenu?.map((item, idx) => {
          return (
            <Pressable
              key={idx}
              onPress={() => {
                navigation.navigate(item.name);
                props.reference.current?.hide();
              }}
              style={[styles.wrapper]}
            >
              <View style={styles.content}>
                <View style={styles.item}>
                  <MaterialCommunityIcons
                    size={20}
                    name={item.mobile_icon ? item.mobile_icon : item.icon}
                    color="#3F434A"
                  />
                </View>
                <Text style={[{ fontSize: 14 }, TextProps]}>{item.name}</Text>
              </View>
            </Pressable>
          );
        })}

        <Pressable
          onPress={() => {
            navigation.navigate("Evaluation");
            props.reference.current?.hide();
          }}
          style={styles.wrapper}
        >
          <View style={styles.content}>
            <View style={styles.item}>
              <MaterialCommunityIcons size={20} name="file-check-outline" color="#3F434A" />
            </View>
            <Text style={[{ fontSize: 14 }, TextProps]}>Evaluation</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("My Information");
            props.reference.current?.hide();
          }}
          style={styles.wrapper}
        >
          <View style={styles.content}>
            <View style={styles.item}>
              <MaterialCommunityIcons size={20} name="account-outline" color="#3F434A" />
            </View>
            <Text style={[{ fontSize: 14 }, TextProps]}>My Information</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Calendar Tribe");
            props.reference.current?.hide();
          }}
          style={styles.wrapper}
        >
          <View style={styles.content}>
            <View style={styles.item}>
              <MaterialCommunityIcons size={20} name="calendar-clock" color="#3F434A" />
            </View>
            <Text style={[{ fontSize: 14 }, TextProps]}>Calendar</Text>
          </View>
        </Pressable>
      </ScrollView>
    </CustomSheet>
  );
};

export default TribeScreenSheet;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  item: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 5,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "800",
    color: Colors.fontDark,
  },
});
