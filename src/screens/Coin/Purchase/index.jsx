import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../layouts/CustomCard";

const Purchase = () => {
  const navigation = useNavigation();
  const userSelector = useSelector((state) => state.auth);
  const menu = JSON.parse(userSelector?.user_role_menu)?.menu;
  const subMenu = menu[6]?.sub;

  const excludeSubMenu = ["Supplier Category", "Supplier Price"];

  const filteredSalesOptions = subMenu?.filter((item) => !excludeSubMenu?.includes(item?.name));

  const filteredAuthorizationOptions = filteredSalesOptions?.filter((item) => item?.is_allow === true);

  const purchaseOptions = filteredAuthorizationOptions?.map((item) => ({
    name: item?.name,
    navigate: item?.name,
  }));

  return (
    <Screen screenTitle="Purchase" returnButton={true} onPress={() => navigation.goBack()}>
      {purchaseOptions.map((item, index) => {
        return (
          <CustomCard
            key={index}
            index={index}
            length={purchaseOptions.length}
            handlePress={() => navigation.navigate(item.navigate)}
          >
            <View style={styles.content}>
              <Text style={[TextProps]}>{item.name}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
            </View>
          </CustomCard>
        );
      })}
    </Screen>
  );
};

export default Purchase;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
