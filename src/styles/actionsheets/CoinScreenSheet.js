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

  return (
    <ActionSheet ref={props.reference}>
      <View style={{ paddingBottom: 40 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
          {/* {filteredMenu?.map((item, idx) => {
            return (
              <Pressable
                key={idx}
                onPress={() => {
                  navigation.navigate(item.name);
                  props.reference.current?.hide();
                }}
                style={{
                  ...styles.wrapper,
                  borderBottomWidth: 1,
                  borderColor: "#E8E9EB",
                }}
              >
                <View style={styles.flex}>
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
          })} */}
          <Pressable
            onPress={() => {
              navigation.navigate("Purchase");
              props.reference.current?.hide();
            }}
            style={{
              ...styles.wrapper,
              borderBottomWidth: 1,
              borderColor: "#E8E9EB",
            }}
          >
            <View style={styles.flex}>
              <View style={styles.item}>
                <MaterialCommunityIcons size={20} name="cart-outline" color="#3F434A" />
              </View>
              <Text style={[{ fontSize: 14 }, TextProps]}>Purchase</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Sales");
              props.reference.current?.hide();
            }}
            style={{
              ...styles.wrapper,
              borderBottomWidth: 1,
              borderColor: "#E8E9EB",
            }}
          >
            <View style={styles.flex}>
              <View style={styles.item}>
                <MaterialCommunityIcons size={20} name="tag-outline" color="#3F434A" />
              </View>
              <Text style={[{ fontSize: 14 }, TextProps]}>Sales</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate("Ledger");
              props.reference.current?.hide();
            }}
            style={{
              ...styles.wrapper,
              borderBottomWidth: 1,
              borderColor: "#E8E9EB",
            }}
          >
            <View style={styles.flex}>
              <View style={styles.item}>
                <MaterialCommunityIcons size={20} name="book-outline" color="#3F434A" />
              </View>
              <Text style={[{ fontSize: 14 }, TextProps]}>Ledger</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Cash Bank");
              props.reference.current?.hide();
            }}
            style={{
              ...styles.wrapper,
              borderBottomWidth: 1,
              borderColor: "#E8E9EB",
            }}
          >
            <View style={styles.flex}>
              <View style={styles.item}>
                <MaterialCommunityIcons size={20} name="cash" color="#3F434A" />
              </View>
              <Text style={[{ fontSize: 14 }, TextProps]}>Cash & Bank</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Inventory");
              props.reference.current?.hide();
            }}
            style={{
              ...styles.wrapper,
              borderBottomWidth: 1,
              borderColor: "#E8E9EB",
            }}
          >
            <View style={styles.flex}>
              <View style={styles.item}>
                <MaterialCommunityIcons size={20} name="archive-outline" color="#3F434A" />
              </View>
              <Text style={[{ fontSize: 14 }, TextProps]}>Inventory</Text>
            </View>
          </Pressable>
          {/* <Pressable
            onPress={() => {
              navigation.navigate("Customer");
              props.reference.current?.hide();
            }}
            style={{
              ...styles.wrapper,
              borderBottomWidth: 1,
              borderColor: "#E8E9EB",
            }}
          >
            <View style={styles.flex}>
              <View style={styles.item}>
                <MaterialCommunityIcons size={20} name="account-outline" color="#3F434A" />
              </View>
              <Text style={[{ fontSize: 14 }, TextProps]}>Customer</Text>
            </View>
          </Pressable> */}
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
  },
  flex: {
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
  text: {
    fontWeight: "800",
    color: "#000000",
  },
});
