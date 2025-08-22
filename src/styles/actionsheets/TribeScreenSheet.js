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

        <Pressable onPress={() => handleNavigate("Overtime")} style={styles.wrapper}>
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
        </Pressable>
        <Pressable
          onPress={() => handleNavigate("Calendar Tribe")}
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
