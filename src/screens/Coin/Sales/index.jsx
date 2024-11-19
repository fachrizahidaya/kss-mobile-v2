import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../layouts/CustomCard";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const Sales = () => {
  const navigation = useNavigation();
  const userSelector = useSelector((state) => state.auth);
  const menu = JSON.parse(userSelector?.user_role_menu)?.menu;
  const subMenu = menu[5]?.sub;

  const excludeSubMenu = [
    "Price Category",
    "Discount Category",
    "Price Adjustment",
    "Discount Adjustment",
    "Customer Category",
    "Sales Person",
    "Exchange Invoice",
  ];

  const filteredInventoryOptions = subMenu?.filter((item) => !excludeSubMenu?.includes(item?.name));

  const filteredAuthorizationOptions = filteredInventoryOptions?.filter((item) => item?.is_allow === true);

  const salesOptions = filteredAuthorizationOptions?.map((item) => ({
    name: item?.name,
    navigate: item?.name,
  }));

  return (
    <Screen screenTitle="Sales">
      {salesOptions?.length > 0 ? (
        salesOptions.map((item, index) => {
          return (
            <CustomCard
              key={index}
              index={index}
              length={salesOptions.length}
              handlePress={() => navigation.navigate(item.navigate)}
            >
              <View style={styles.content}>
                <Text style={[TextProps]}>{item.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
              </View>
            </CustomCard>
          );
        })
      ) : (
        <EmptyPlaceholder text="No Data" />
      )}
    </Screen>
  );
};

export default Sales;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
