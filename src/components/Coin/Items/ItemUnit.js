import { Dimensions, StyleSheet, Text, View } from "react-native";
import CustomCard from "../../../layouts/CustomCard";
import { TextProps } from "../../../styles/CustomStylings";

const ItemUnit = ({
  isAccount,
  isStock,
  isMutation,
  name,
  code,
  description,
  warehouse,
  source_no,
  stock,
  whs_name,
  desc,
  type,
  date,
  unit,
  price,
  convert_amount,
  qty_in,
  qty_out,
  qty_stock,
  index,
  length,
}) => {
  return (
    <CustomCard gap={8} index={index} length={length}>
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ gap: 5 }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12, textAlign: "right" }]}>Name</Text>
            <Text style={[TextProps, { textAlign: "left" }]}>{unit || "No Data"}</Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Unit Price</Text>
            <Text style={[TextProps]}>{price || 0}</Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12, textAlign: "right" }]}>Convertion</Text>
            <Text style={[TextProps, { textAlign: "right" }]}>{convert_amount || "No Data"}</Text>
          </View>
        </View>
      </View>
    </CustomCard>
  );
};

export default ItemUnit;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
