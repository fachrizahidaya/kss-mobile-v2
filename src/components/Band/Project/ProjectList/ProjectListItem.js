import { useNavigation } from "@react-navigation/native";

import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

import { Dimensions, Pressable, View, Text, StyleSheet } from "react-native";

import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../../styles/CustomStylings";

const ProjectListItem = ({ id, title, status, deadline, isArchive, image, ownerName, ownerEmail, index, length }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("screen");

  return (
    <Pressable onPress={() => navigation.navigate("Project Detail", { projectId: id })}>
      <View style={[styles.container, { marginBottom: index === length - 1 ? 14 : null }]}>
        <View style={{ gap: 1 }}>
          <Text style={[{ width: width / 2, fontWeight: "500" }, TextProps]} numberOfLines={1}>
            {title}
          </Text>

          <Text
            style={{
              color: isArchive
                ? "#979797"
                : status === "Open"
                ? "#E8A30A"
                : status === "On Progress"
                ? "#0090FF"
                : "#49C96D",
            }}
          >
            {isArchive ? "Archived" : status}
          </Text>

          <View style={{ alignSelf: "flex-start" }}>
            <AvatarPlaceholder size="xs" name={ownerName} image={image} email={ownerEmail} isPressable={true} />
          </View>
        </View>
        <View
          style={[
            styles.wrapper,
            { backgroundColor: dayjs(deadline).fromNow().includes("ago") ? "#fff5ef" : "#f8f8f8" },
          ]}
        >
          <Text style={{ color: dayjs(deadline).fromNow().includes("ago") ? "#e56e19" : "#3f434a", fontWeight: "500" }}>
            {dayjs(deadline).fromNow().includes("ago") ? "Overdue" : `Ends ${dayjs(deadline).fromNow()}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProjectListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 14,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
