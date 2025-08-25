import { useNavigation } from "@react-navigation/native";

import { ScrollView, Text, View, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../CustomStylings";
import CustomSheet from "../../layouts/CustomSheet";
import { Colors } from "../Color";
import { useTribe } from "./hooks/useTribe";
import styles from "./Actionsheet.styles";

const TribeScreenSheet = (props) => {
  const { filteredMenu } = useTribe();

  const navigation = useNavigation();

  const handleNavigate = (value) => {
    navigation.navigate(value);
    props.reference.current?.hide();
  };

  return (
    <CustomSheet moduleScreenSheet={true} reference={props.reference}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
        {filteredMenu?.map((item, idx) => {
          return (
            <Pressable
              key={idx}
              onPress={() => handleNavigate(item?.name)}
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

<<<<<<< HEAD
<<<<<<< HEAD
        {/* <Pressable onPress={() => handleNavigate("Overtime")} style={styles.wrapper}>
          <View style={styles.content}>
            <View style={styles.item}>
              <MaterialCommunityIcons
                size={20}
                name="clock-outline"
                color={Colors.iconDark}
              />
            </View>
            <Text style={[{ fontSize: 14 }, TextProps]}>Overtime</Text>
          </View>
        </Pressable> */}
        <Pressable
<<<<<<< HEAD
          onPress={() => handleNavigate("Calendar Tribe")}
=======
          onPress={() => {
            navigation.navigate("Overtime");
            props.reference.current?.hide();
          }}
          style={styles.wrapper}
        >
=======
        <Pressable onPress={() => handleNavigate("Overtime")} style={styles.wrapper}>
>>>>>>> b7832b11 (chore: refactor code)
=======
        {/* <Pressable onPress={() => handleNavigate("Overtime")} style={styles.wrapper}>
>>>>>>> 9b726145 (fix: disable necessary)
          <View style={styles.content}>
            <View style={styles.item}>
              <MaterialCommunityIcons
                size={20}
                name="clock-outline"
                color={Colors.iconDark}
              />
            </View>
            <Text style={[{ fontSize: 14 }, TextProps]}>Overtime</Text>
          </View>
        </Pressable> */}
        <Pressable
<<<<<<< HEAD
          onPress={() => {
            navigation.navigate("Calendar Tribe");
            props.reference.current?.hide();
          }}
>>>>>>> 9c219588 (feat: overtime)
=======
          onPress={() => handleNavigate("Calendar Tribe")}
>>>>>>> b7832b11 (chore: refactor code)
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

export default TribeScreenSheet;
<<<<<<< HEAD
<<<<<<< HEAD
=======

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
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
>>>>>>> b7832b11 (chore: refactor code)
