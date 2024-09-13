import { Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../styles/CustomCard";

const ItemMinimumListItem = ({ name, code, available_qty, ordered_qty, requested_qty, index, length, navigation }) => {
  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Sales Order Detail", { id: id })}
    >
      <Text style={[TextProps]}>{name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={[TextProps]}>{code}</Text>
        <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(null)} />
      </View>
      <Text style={[TextProps]}>{available_qty}</Text>
      <Text style={[TextProps]}>{ordered_qty}</Text>
      <Text style={[TextProps]}>{requested_qty}</Text>
    </CustomCard>
  );
};

export default ItemMinimumListItem;
