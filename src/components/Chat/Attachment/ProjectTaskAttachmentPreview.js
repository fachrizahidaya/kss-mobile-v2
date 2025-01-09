import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ProjectTaskAttachmentPreview = ({ bandAttachment, setBandAttachment, bandAttachmentType }) => {
  const handleRemoveAttachmentSelected = () => {
    setBandAttachment(null);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[{ fontSize: 12 }, TextProps]}>{bandAttachment?.title}</Text>
        <Pressable onPress={handleRemoveAttachmentSelected}>
          <MaterialCommunityIcons name="close" size={20} />
        </Pressable>
      </View>

      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 100 }}>
        {bandAttachmentType === "project" ? (
          <>
            <MaterialCommunityIcons name="lightning-bolt" size={100} color={Colors.iconDark} />
            <Text style={[{ fontSize: 12 }, TextProps]}>{bandAttachment?.title}</Text>
            <Text style={[{ fontSize: 12 }, TextProps]}>#{bandAttachment?.project_no}</Text>
          </>
        ) : (
          <>
            <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={100} color={Colors.iconDark} />
            <Text style={[{ fontSize: 12 }, TextProps]}>{bandAttachment?.title}</Text>
            <Text style={[{ fontSize: 12 }, TextProps]}>#{bandAttachment?.task_no}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ProjectTaskAttachmentPreview;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: Platform.OS === "ios" ? 60 : null,
  },
});
