import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { StyleSheet, Text, View, Pressable } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { ScrollView } from "react-native-gesture-handler";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useGetSubMenu } from "../../hooks/useGetSubMenu";
import { TextProps } from "../CustomStylings";
import CustomSheet from "../../layouts/CustomSheet";

const CoinScreenSheet = (props) => {
  const navigation = useNavigation();
  const menuSelector = useSelector((state) => state.user_menu);
  const excludeScreen = ["Dashboard"];

  const filteredMenu = menuSelector?.user_menu?.menu?.filter(
    (item) => !excludeScreen.includes(item.name) && item?.is_allow === true && item?.is_mobile === true
  );

  const arrayOptions = filteredMenu?.map((item) => ({
    title: item?.name,
    screen: item?.name,
    icon: item?.mobile_icon,
  }));

  return (
    <CustomSheet moduleScreenSheet={true} reference={props.reference}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
        {arrayOptions.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                navigation.navigate(item.screen);
                props.reference.current?.hide();
              }}
              style={[styles.wrapper]}
            >
              <View style={styles.content}>
                <View style={styles.item}>
                  <MaterialCommunityIcons size={20} name={item.icon} color="#3F434A" />
                </View>
                <Text style={[{ fontSize: 14 }, TextProps]}>{item.title}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </CustomSheet>
  );
};

export default CoinScreenSheet;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E9EB",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  item: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
