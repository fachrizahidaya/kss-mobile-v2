import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../layouts/CustomCard";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const Inventory = () => {
  const navigation = useNavigation();

  const userSelector = useSelector((state) => state.auth);
  const userMenu = JSON.parse(userSelector?.user_role_menu)?.menu;
  const userSubMenu = userMenu[7]?.sub;

  const excludeSubMenu = ["Units", "Item Categories", "Stock Adjustments", "Stock Opname Order"];

  const filteredInventoryOptions = userSubMenu?.filter((item) => !excludeSubMenu?.includes(item?.name));

  const filteredAuthorizationOptions = filteredInventoryOptions?.filter((item) => item?.is_allow === true);

  const inventoryOptions = filteredAuthorizationOptions?.map((item) => ({
    name: item?.name,
    navigate: item?.name,
  }));

  return (
    <Screen screenTitle="Inventory">
      {inventoryOptions?.length > 0 ? (
        inventoryOptions.map((item, index) => {
          return (
            <CustomCard
              key={index}
              index={index}
              length={inventoryOptions.length}
              handlePress={() => navigation.navigate(item.navigate)}
            >
              <View style={styles.container}>
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

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
