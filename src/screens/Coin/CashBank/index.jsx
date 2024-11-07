import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../layouts/CustomCard";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const CashBank = () => {
  const navigation = useNavigation();

  const userSelector = useSelector((state) => state.auth);
  const userMenu = JSON.parse(userSelector?.user_role_menu)?.menu;
  const userSubMenu = userMenu[4]?.sub;

  const excludeSubMenu = ["Units", "Item Categories", "Stock Adjustments", "Stock Opname Order"];

  const filteredCashBankOptions = userSubMenu?.filter((item) => !excludeSubMenu?.includes(item?.name));

  const filteredAuthorizationOptions = filteredCashBankOptions?.filter((item) => item?.is_allow === true);

  const cashBankOptions = filteredAuthorizationOptions?.map((item) => ({
    name: item?.name,
    navigate: item?.name,
  }));

  return (
    <Screen screenTitle="Cash & Bank" returnButton={true} onPress={() => navigation.goBack()}>
      {cashBankOptions?.length > 0 ? (
        cashBankOptions.map((item, index) => {
          return (
            <CustomCard
              key={index}
              index={index}
              length={cashBankOptions.length}
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

export default CashBank;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
