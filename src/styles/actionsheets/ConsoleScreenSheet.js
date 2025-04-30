import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useGetSubMenu } from "../../hooks/useGetSubMenu";
import CustomSheet from "../../layouts/CustomSheet";
import { TextProps } from "../CustomStylings";
import { Colors } from "../Color";

const ConsoleScreenSheet = (props) => {
  const navigation = useNavigation();
  const menuSelector = useSelector((state) => state.user_menu);
  const { mergedMenu } = useGetSubMenu(menuSelector.user_menu);
  const excludeSubscreen = [];
  const filteredMenu = mergedMenu.filter(
    (item) =>
      !excludeSubscreen.includes(item.name) &&
      item?.is_allow === true &&
      item?.is_mobile === true
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
                    color={Colors.iconDark}
                  />
                </View>
                <Text style={[{ fontSize: 14 }, TextProps]}>{item.name}</Text>
              </View>
            </Pressable>
          );
        })}

        <Pressable
          onPress={() => {
            navigation.navigate("Calendar Tribe");
            props.reference.current?.hide();
          }}
          style={styles.wrapper}
        >
          <View style={styles.content}>
            <View style={styles.item}>
              <MaterialCommunityIcons
                size={20}
                name="calendar-clock"
                color={Colors.iconDark}
              />
            </View>
            <Text style={[{ fontSize: 14 }, TextProps]}>Calendar</Text>
          </View>
        </Pressable>
      </ScrollView>
    </CustomSheet>
  );
};

export default ConsoleScreenSheet;

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
