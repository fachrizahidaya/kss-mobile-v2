import { Dimensions, StyleSheet, Text, View } from "react-native";

import CustomCard from "../../../layouts/CustomCard";
import { TextProps } from "../../../styles/CustomStylings";
import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { Colors } from "../../../styles/Color";

const UserListItem = ({ index, length, name, role, type, role_name }) => {
  const screenWidth = Dimensions.get("screen");

  return (
    <CustomCard index={index} length={length}>
      <View style={styles.content}>
        <View style={styles.wrapper}>
          <AvatarPlaceholder image={null} name={name} size="md" isThumb={false} />
          <View style={{ width: screenWidth.width - 230 }}>
            <Text
              style={[TextProps, { overflow: "hidden", fontWeight: "500" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <Text style={styles.status} numberOfLines={1} ellipsizeMode="tail">
              {role_name}
            </Text>
          </View>
        </View>
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
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  status: {
    fontSize: 12,
    fontWeight: "400",
    color: "#20A144",
    width: 140,
    overflow: "hidden",
  },
});
