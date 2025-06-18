import { View, Text, Pressable, Image, StyleSheet } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../styles/Color";

const doc = "../../../assets/doc-icons/doc-format.png";
const pdf = "../../../assets/doc-icons/pdf-format.png";
const ppt = "../../../assets/doc-icons/ppt-format.png";
const xls = "../../../assets/doc-icons/xls-format.png";
const txt = "../../../assets/doc-icons/other-format.png";

const FileAttachmentBubble = ({
  file_type,
  file_name,
  file_path,
  file_size,
  myMessage,
  getFileExt,
  extension,
  onDownload,
}) => {
  const fileType =
    getFileExt() === "jpg" || getFileExt() === "jpeg" || getFileExt() === "png";

  var renderAttachmentSource;

  if (getFileExt() === "doc" || getFileExt() === "docx" || extension?.includes("word")) {
    renderAttachmentSource = require(doc);
  } else if (getFileExt() === "pdf") {
    renderAttachmentSource = require(pdf);
  } else if (
    getFileExt() === "xls" ||
    getFileExt() === "xlsx" ||
    extension?.includes("spreadsheet")
  ) {
    renderAttachmentSource = require(xls);
  } else if (
    getFileExt() === "ppt" ||
    getFileExt() === "pptx" ||
    extension?.includes("powerpoint") ||
    extension?.includes("presentation")
  ) {
    renderAttachmentSource = require(ppt);
  } else {
    renderAttachmentSource = require(txt);
  }

  return (
    !fileType && (
      <Pressable
        onPress={() => onDownload(file_path)}
        style={[
          styles.container,
          {
            backgroundColor: !myMessage
              ? Colors.borderGrey
              : Colors.senderAttachmentMessageBackground,
          },
        ]}
      >
        <Image
          source={renderAttachmentSource}
          style={styles.image}
          alt={`${file_type} format`}
        />

        <View>
          <Text
            style={[
              styles.textStyle,
              { color: !myMessage ? Colors.fontDark : Colors.fontLight },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {file_name}
          </Text>
          <Text
            style={[
              styles.textStyle,
              { color: !myMessage ? Colors.fontDark : Colors.fontLight },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {getFileExt()} • {file_size}
          </Text>
        </View>

        <MaterialCommunityIcons
          name="download"
          color={!myMessage ? Colors.iconDark : Colors.iconLight}
          size={20}
          onPress={() => onDownload(file_path)}
        />
      </Pressable>
    )
  );
};

export default FileAttachmentBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    gap: 5,
    padding: 10,
  },
  image: {
    height: 20,
    width: 20,
    alignSelf: "center",
    resizeMode: "cover",
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "400",
    width: 160,
    overflow: "hidden",
  },
});
