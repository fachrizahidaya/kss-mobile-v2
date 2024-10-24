import dayjs from "dayjs";

import { View, Pressable, Text, StyleSheet } from "react-native";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const ChatTaskItem = ({
  id,
  navigation,
  name,
  date,
  owner,
  image,
  setBandAttachment,
  setBandAttachmentType,
  userId,
  roomId,
  imageUser,
  position,
  email,
  nameUser,
  type,
  active_member,
  isPinned,
  item,
  index,
  length,
}) => {
  return (
    <CustomCard gap={8} index={index} length={length}>
      <Pressable
        onPress={() => {
          navigation.navigate("Task Detail Screen", {
            task_id: id,
            setBandAttachment: setBandAttachment,
            setBandAttachmentType: setBandAttachmentType,
            userId: userId,
            roomId: roomId,
            name: nameUser,
            image: imageUser,
            position: position,
            email: email,
            type: type,
            active_member: active_member,
            isPinned: isPinned,
            taskData: item,
          });
        }}
        style={styles.container}
      >
        <View>
          <Text style={[{ fontSize: 14 }, TextProps]}>{name.length > 50 ? name.slice(0, 30) + "..." : name}</Text>
          <Text style={[{ fontSize: 12, opacity: 0.5 }, TextProps]}>Due {dayjs(date).format("DD MMM YYYY")}</Text>
        </View>
        <AvatarPlaceholder name={owner} image={image} size="sm" />
      </Pressable>
    </CustomCard>
  );
};

export default ChatTaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
});
