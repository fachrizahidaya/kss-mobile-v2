import { StyleSheet, Text, View } from "react-native";

import CustomCard from "../../layouts/CustomCard";
import { TextProps } from "../../styles/CustomStylings";

const UserListItem = ({ index, length, name, role, type, role_name }) => {
  return (
    <CustomCard index={index} length={length}>
      <View style={styles.content}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[TextProps, { overflow: "hidden", width: 100 }]}
        >
          {name}
        </Text>
        <Text style={[TextProps]}>{role_name}</Text>
        <Text style={[TextProps]}>{type}</Text>
      </View>
    </CustomCard>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
