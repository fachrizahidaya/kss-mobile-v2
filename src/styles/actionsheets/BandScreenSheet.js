import { useNavigation } from "@react-navigation/native";

import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../CustomStylings";
import CustomSheet from "../../layouts/CustomSheet";
import { Colors } from "../Color";
import { useBand } from "./hooks/useBand";
import styles from "./Actionsheet.styles";

const BandScreenSheet = (props) => {
  const { screensToRender } = useBand();
  const navigation = useNavigation();

  const handleNavigate = (value) => {
    if (value === "My Team") {
      navigation.navigate(value, { passedTeam: null });
    } else {
      navigation.navigate(value);
    }
    props.reference.current?.hide();
  };

  return (
    <CustomSheet moduleScreenSheet={true} reference={props.reference}>
      {screensToRender()?.map((item, idx) => {
        return (
          <Pressable
            key={idx}
            onPress={() => handleNavigate(item?.name)}
            style={styles.wrapper}
          >
            <View style={styles.content}>
              <View style={styles.item}>
                <MaterialCommunityIcons
                  size={20}
                  name={item.mobile_icon}
                  color={Colors.iconDark}
                />
              </View>
              <Text style={TextProps}>{item.name}</Text>
            </View>
          </Pressable>
        );
      })}
      <Pressable onPress={() => handleNavigate("Calendar Band")} style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.item}>
            <MaterialCommunityIcons
              size={20}
              name="calendar-clock"
              color={Colors.iconDark}
            />
          </View>
          <Text style={TextProps}>Calendar</Text>
        </View>
      </Pressable>
    </CustomSheet>
  );
};

export default BandScreenSheet;
