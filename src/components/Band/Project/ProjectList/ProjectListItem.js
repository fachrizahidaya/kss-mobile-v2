import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

import { Dimensions, Pressable, View, Text, StyleSheet } from "react-native";

import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomBadge from "../../../../styles/CustomBadge";
import { Colors } from "../../../../styles/Color";

const ProjectListItem = ({
  id,
  title,
  status,
  deadline,
  isArchive,
  image,
  ownerName,
  ownerEmail,
  index,
  length,
  navigation,
}) => {
  const { width } = Dimensions.get("screen");

  return (
    <Pressable
      onPress={() => navigation.navigate("Project Detail", { projectId: id })}
    >
      <View
        style={[
          styles.container,
          { marginBottom: index === length - 1 ? 14 : null },
        ]}
      >
        <View style={{ gap: 1 }}>
          <Text
            style={[{ width: width / 2, fontWeight: "500" }, TextProps]}
            numberOfLines={1}
          >
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
            <AvatarPlaceholder
              size="xs"
              name={ownerName}
              image={image}
              email={ownerEmail}
              isPressable={true}
            />
          </View>
        </View>
        <CustomBadge
          description={
            dayjs(deadline).fromNow().includes("ago")
              ? "Overdue"
              : `Ends ${dayjs(deadline).fromNow()}`
          }
          backgroundColor={
            dayjs(deadline).fromNow().includes("ago")
              ? "#FFF5EF"
              : Colors.backgroundLight
          }
          textColor={
            dayjs(deadline).fromNow().includes("ago")
              ? "#E56E19"
              : Colors.fontDark
          }
        />
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
    backgroundColor: Colors.secondary,
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
