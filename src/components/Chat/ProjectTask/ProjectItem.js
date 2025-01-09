import dayjs from "dayjs";

import { Pressable, StyleSheet, Text, View } from "react-native";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ProjectItem = ({
  setBandAttachment,
  setBandAttachmentType,
  userId,
  roomId,
  name,
  image,
  position,
  email,
  type,
  active_member,
  isPinned,
  title,
  deadline,
  owner_name,
  owner_image,
  navigation,
  id,
  item,
}) => {
  const params = {
    task_id: id,
    setBandAttachment: setBandAttachment,
    setBandAttachmentType: setBandAttachmentType,
    userId: userId,
    roomId: roomId,
    name: name,
    image: image,
    position: position,
    email: email,
    type: type,
    active_member: active_member,
    isPinned: isPinned,
    taskData: item,
  };

  return (
    <View style={{ gap: 5 }}>
      <Pressable onPress={() => navigation.navigate("Task Detail Screen", params)} style={styles.container}>
        <View>
          <Text style={[{ fontSize: 14 }, TextProps]}>{title?.length > 50 ? title?.slice(0, 30) + "..." : title}</Text>
          <Text style={[{ fontSize: 12, opacity: 0.5 }, TextProps]}>Due {dayjs(deadline).format("DD MMM YYYY")}</Text>
        </View>
        <AvatarPlaceholder name={owner_name} image={owner_image} size="sm" />
      </Pressable>
    </View>
  );
};

export default ProjectItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
});
