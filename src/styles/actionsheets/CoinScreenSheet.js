import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { StyleSheet, Text, View, Pressable } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { ScrollView } from "react-native-gesture-handler";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useGetSubMenu } from "../../hooks/useGetSubMenu";
import { TextProps } from "../CustomStylings";

const CoinScreenSheet = (props) => {
  const navigation = useNavigation();
  const menuSelector = useSelector((state) => state.user_menu);
  const { mergedMenu } = useGetSubMenu(menuSelector.user_menu);
  const excludeSubscreen = [
    "Document Number",
    "Bank",
    "Terms Of Payment",
    "Tax",
    "Currency",
    "Courier",
    "FOB",
    "COA",
    "Units",
    "Item Categories",
    "Brands",
    "Items",
    "Warehouses",
    "Stock Adjustments",
    "Stock Opname Order",
    "Stock Opname",
    "Transfer Item",
    "Suppliers",
    "Customer Category",
    "Sales Person",
  ];
  const filteredMenu = mergedMenu.filter((item) => !excludeSubscreen.includes(item.name));

  const arrayOptions = [
    { title: "Ledger", screen: "Ledger", icon: "book-outline" },
    { title: "Cash Bank", screen: "Cash Bank", icon: "cash" },
    { title: "Sales", screen: "Sales", icon: "tag-outline" },
    { title: "Purchase", screen: "Purchase", icon: "cart-outline" },
    { title: "Inventory", screen: "Inventory", icon: "archive-outline" },
  ];

  return (
    <ActionSheet ref={props.reference}>
      <View style={{ paddingBottom: 40 }}>
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
      </View>
    </ActionSheet>
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
