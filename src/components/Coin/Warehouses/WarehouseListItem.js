import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";
import { TextProps } from "../../../styles/CustomStylings";

const WarehouseListItem = ({ id, navigation, name, length, index, address }) => {
  const dataArr = [{ title: "Address", value: address || "No Data" }];

  return (
    <CustomCard index={index} length={length} gap={8}>
      <Text style={[TextProps, { fontWeight: "600" }]}>{name || "-"}</Text>
      <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{address || "-"}</Text>
    </CustomCard>
  );
};

export default WarehouseListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
