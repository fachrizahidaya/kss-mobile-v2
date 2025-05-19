import { StyleSheet, Text, View } from "react-native";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";

const User = ({ data }) => {
  return (
    <CustomCard>
      {data.map((item, index) => {
        return (
          <View key={index} style={styles.content}>
            <Text style={TextProps}>{item?.["type"]}</Text>
            <Text style={TextProps}>{item?.["count"]}</Text>
          </View>
        );
      })}
    </CustomCard>
  );
};

export default User;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundLight,
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
  },
});
