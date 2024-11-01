import { Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const ReturnListItem = ({
  id,
  navigation,
  doc_no,
  status,
  doc_date,
  index,
  length,
  supplier,
  amount,
  converter,
  currency,
}) => {
  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Purchase Return Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {doc_no}
        </Text>
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{doc_date || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{supplier || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "600" }]}>
          {currency} {amount < 0 ? `(${converter.format(Math.abs(amount))})` : converter.format(amount) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default ReturnListItem;
