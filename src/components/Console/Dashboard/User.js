import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const User = ({ data, isLoading }) => {
  let renderUser;
  if (isLoading) {
    renderUser = <ActivityIndicator />;
  } else if (data) {
    renderUser = data.map((item, index) => {
      return (
        <View key={index} style={styles.content}>
          <Text style={TextProps}>{item?.["type"]}</Text>
          <Text style={TextProps}>{item?.["count"]}</Text>
        </View>
      );
    });
  } else {
    renderUser = <EmptyPlaceholder text="No Data" />;
  }

  return <CustomCard>{renderUser}</CustomCard>;
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
