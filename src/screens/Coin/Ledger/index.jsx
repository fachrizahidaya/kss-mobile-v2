import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../layouts/CustomCard";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import { Colors } from "../../../styles/Color";

const Ledger = () => {
  const navigation = useNavigation();

  const userSelector = useSelector((state) => state.auth);
  const userMenu = JSON.parse(userSelector?.user_role_menu)?.menu;
  const userSubMenu = userMenu[3]?.sub;

  const excludeSubMenu = [];

  const filteredLedgerOptions = userSubMenu?.filter((item) => !excludeSubMenu?.includes(item?.name));

  const filteredAuthorizationOptions = filteredLedgerOptions?.filter((item) => item?.is_allow === true);

  const ledgerOptions = filteredAuthorizationOptions?.map((item) => ({
    name: item?.name,
    navigate: item?.name,
  }));

  return (
    <Screen screenTitle="Ledger">
      {ledgerOptions?.length > 0 ? (
        ledgerOptions.map((item, index) => {
          return (
            <CustomCard
              key={index}
              index={index}
              length={ledgerOptions.length}
              handlePress={() => navigation.navigate(item.navigate)}
            >
              <View style={styles.content}>
                <Text style={[TextProps]}>{item.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.iconDark} />
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

export default Ledger;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
