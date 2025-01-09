import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../CustomStylings";
import CustomSheet from "../../layouts/CustomSheet";
import { Colors } from "../Color";

const BandScreenSheet = (props) => {
  const navigation = useNavigation();
  const menuSelector = useSelector((state) => state.user_menu);

  const screensToRender = () => {
    return menuSelector.user_menu.menu?.filter((screen) => {
      return screen.name !== "Dashboard";
    });
  };

  return (
    <CustomSheet moduleScreenSheet={true} reference={props.reference}>
      {screensToRender()?.map((item, idx) => {
        return (
          <Pressable
            key={idx}
            onPress={() => {
              if (item.name === "My Team") {
                navigation.navigate(item.name, { passedTeam: null });
              } else {
                navigation.navigate(item.name);
              }
              props.reference.current?.hide();
            }}
            style={styles.wrapper}
          >
            <View style={styles.content}>
              <View style={styles.item}>
                <MaterialCommunityIcons size={20} name={item.mobile_icon} color={Colors.iconDark} />
              </View>
              <Text style={TextProps}>{item.name}</Text>
            </View>
          </Pressable>
        );
      })}
      <Pressable
        onPress={() => {
          navigation.navigate("Calendar Band");
          props.reference.current?.hide();
        }}
        style={styles.wrapper}
      >
        <View style={styles.content}>
          <View style={styles.item}>
            <MaterialCommunityIcons size={20} name="calendar-clock" color={Colors.iconDark} />
          </View>
          <Text style={TextProps}>Calendar</Text>
        </View>
      </Pressable>
    </CustomSheet>
  );
};

export default BandScreenSheet;

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
});
