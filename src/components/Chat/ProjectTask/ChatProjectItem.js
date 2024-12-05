import dayjs from "dayjs";

import { View, Pressable, Text, StyleSheet } from "react-native";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";

const ChatProjectItem = ({
  navigation,
  name,
  date,
  owner,
  image,
  id,
  selected,
  setSelected,
  nameUser,
  imageUser,
  type,
  active_member,
  isPinned,
  email,
  project,
  userId,
  roomId,
  position,
  setBandAttachment,
  setBandAttachmentType,
  index,
  length,
}) => {
  const params = {
    project_id: id,
    selected: selected,
    setBandAttachment: setBandAttachment,
    setBandAttachmentType: setBandAttachmentType,
    projectData: project,
    name: nameUser,
    image: imageUser,
    type: type,
    active_member: active_member,
    isPinned: isPinned,
    email: email,
    userId: userId,
    roomId: roomId,
    position: position,
  };

  const handleNavigation = () => {
    setSelected(project);
    navigation.navigate("Project Detail Screen", params);
  };

  return (
    <CustomCard gap={8} index={index} length={length}>
      <Pressable onPress={handleNavigation} style={styles.container}>
        <View>
          <Text style={[{ fontSize: 14 }, TextProps]}>{name.length > 50 ? name.slice(0, 30) + "..." : name}</Text>
          <Text style={[{ fontSize: 12, opacity: 0.5 }, TextProps]}>Due {dayjs(date).format("DD MMM YYYY")}</Text>
        </View>
        <AvatarPlaceholder name={owner} image={image} size="sm" />
      </Pressable>
    </CustomCard>
  );
};

export default ChatProjectItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.secondary,
    borderRadius: 10,
  },
});
