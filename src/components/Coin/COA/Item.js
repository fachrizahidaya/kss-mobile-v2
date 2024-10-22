import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const Item = ({ name, code, balance, date }) => {
  const dataArr = [
    { title: "Qty", value: `${code} (${name})` || "No Data" },
    { title: "Date", value: date || "No Data" },
    { title: "Balance", value: balance || "No Data" },
  ];

  return (
    <CustomCard gap={8}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 300, fontSize: 12, fontWeight: "600" }]}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {`${code} - ${name}`}
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
