import dayjs from "dayjs";

import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import { Colors } from "../../../styles/Color";

const AttendanceAttachmentItem = ({
  file_path,
  title,
  begin_date,
  end_date,
  setAttachmentId,
  id,
  index,
  length,
  toggleImage,
  isFullScreen,
  setIsFullScreen,
  setSelectedPicture,
}) => {
  const handleFullScreen = () => {
    if (file_path) {
      toggleImage(file_path, isFullScreen, setIsFullScreen, setSelectedPicture);
    }
  };
  return (
    <View
      style={[
        card.card,
        styles.content,
        { marginBottom: index === length - 1 ? 14 : null },
      ]}
    >
      <Pressable
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        onPress={
          handleFullScreen
          // () => Linking.openURL(`${process.env.EXPO_PUBLIC_API}/download/${file_path}`, "_blank")
        }
      >
        <MaterialCommunityIcons name="file-outline" size={20} />
        <View style={{ gap: 3 }}>
          <Text style={[{ fontSize: 14 }, TextProps]}>{title}</Text>
          <Text style={[{ fontSize: 12, opacity: 0.5 }, TextProps]}>
            {dayjs(begin_date).format("DD MMM YYYY")} -{" "}
            {dayjs(end_date).format("DD MMM YYYY")}
          </Text>
        </View>
      </Pressable>

      <MaterialCommunityIcons
        name="trash-can-outline"
        size={20}
        onPress={() => setAttachmentId(id)}
      />
    </View>
  );
};

export default AttendanceAttachmentItem;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 14,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
  },
});
