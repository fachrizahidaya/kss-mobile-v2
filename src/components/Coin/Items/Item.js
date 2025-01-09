import { StyleSheet, Text, View } from "react-native";
import CustomCard from "../../../layouts/CustomCard";
import { TextProps } from "../../../styles/CustomStylings";

const Item = ({
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
  const dataArr = isAccount
    ? [
        { title: "Code", value: code || "No Data" },
        { title: "Name", value: name || "No Data" },
      ]
    : isStock
    ? [{ title: "Qty", value: `${stock}` || "No Data" }]
    : isMutation
    ? [
        { title: "Date", value: date || "No Data" },
        { title: "Transaction Type", value: type || "No Data" },
        { title: "Description", value: desc || "No Data" },
        { title: "Warehouse", value: whs_name || "No Data" },
        { title: "In", value: `${qty_in}` || "No Data" },
        { title: "Out", value: `${qty_out}` || "No Data" },
        { title: "Stock", value: `${qty_stock}` || "No Data" },
      ]
    : [
        { title: "Convert Amount", value: `${convert_amount}` || "No Data" },
        { title: "Unit Price", value: `${price}` || "No Data" },
      ];

  return (
    <CustomCard gap={8} index={index} length={length}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 300, fontSize: 12, fontWeight: "600" }]}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {isAccount ? description : isStock ? warehouse : isMutation ? source_no : unit}
      </Text>
      <View style={{ gap: 5 }}>
        {dataArr.map((item, index) => {
          return (
            <View key={index} style={styles.data}>
              <Text style={[TextProps, { fontSize: 12 }]}>{item.title}</Text>
              <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%", fontSize: 12 }]}>
                {item.value}
              </Text>
            </View>
          );
        })}
      </View>
    </CustomCard>
  );
};

export default Item;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
