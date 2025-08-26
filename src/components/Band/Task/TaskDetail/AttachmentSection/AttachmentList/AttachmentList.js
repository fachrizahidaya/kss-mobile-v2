import { SheetManager } from "react-native-actions-sheet";

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../../../styles/CustomStylings";
import { Colors } from "../../../../../../styles/Color";

const AttachmentList = ({
  id,
  title,
  from,
  size,
  time,
  type = "",
  downloadFileHandler,
  deleteFileHandler,
  iconHeight,
  iconWidth,
  path,
  disabled,
}) => {
  const doc = "../../../../../../assets/doc-icons/doc-format.png";
  const gif = "../../../../../../assets/doc-icons/gif-format.png";
  const jpg = "../../../../../../assets/doc-icons/jpg-format.png";
  const key = "../../../../../../assets/doc-icons/key-format.png";
  const other = "../../../../../../assets/doc-icons/other-format.png";
  const pdf = "../../../../../../assets/doc-icons/pdf-format.png";
  const png = "../../../../../../assets/doc-icons/png-format.png";
  const ppt = "../../../../../../assets/doc-icons/ppt-format.png";
  const rar = "../../../../../../assets/doc-icons/rar-format.png";
  const xls = "../../../../../../assets/doc-icons/xls-format.png";
  const zip = "../../../../../../assets/doc-icons/zip-format.png";

  const renderOption = () => {
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.menu}>
            <View style={styles.wrapper}>
              <Pressable
                style={styles.menuItem}
                onPress={() => downloadFileHandler(path)}
              >
                <Text style={[TextProps, { fontSize: 16 }]}>Download</Text>
                <MaterialCommunityIcons
                  name="download-outline"
                  size={20}
                  color={Colors.primary}
                />
              </Pressable>
            </View>

            <View style={styles.wrapper}>
              {!disabled && (
                <Pressable
                  style={[styles.menuItem, { marginTop: 3 }]}
                  onPress={() => deleteFileHandler(id, from)}
                >
                  <Text style={{ color: "red", fontSize: 16, fontWeight: "700" }}>
                    Delete
                  </Text>
                  <MaterialCommunityIcons name="delete-outline" size={20} color="red" />
                </Pressable>
              )}
            </View>
          </View>
        ),
      },
    });
  };

  var renderSource;

  if (type.includes("doc")) {
    renderSource = require(doc);
  } else if (type.includes("gif")) {
    renderSource = require(gif);
  } else if (type.includes("jpg") || type.includes("jpeg")) {
    renderSource = require(jpg);
  } else if (type.includes("key")) {
    renderSource = require(key);
  } else if (type.includes("pdf")) {
    renderSource = require(pdf);
  } else if (type.includes("png")) {
    renderSource = require(png);
  } else if (type.includes("ppt") || type.includes("pptx")) {
    renderSource = require(ppt);
  } else if (type.includes("rar")) {
    renderSource = require(rar);
  } else if (type.includes("xls") || type.includes("xlsx")) {
    renderSource = require(xls);
  } else if (type.includes("zip")) {
    renderSource = require(zip);
  } else {
    renderSource = require(other);
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Image
          style={{
            height: iconHeight || 50,
            width: iconWidth || 50,
            resizeMode: "contain",
          }}
          source={renderSource}
          alt="file icon"
        />

        <View>
          <Text style={TextProps}>
            {title.length > 15 ? title.slice(0, 15) + "..." : title}
          </Text>

          {/* {time && (
            <Text style={[{ opacity: 0.5, maxWidth: 150 }, TextProps]} numberOfLines={2}>
              {time}
            </Text>
          )} */}
          <Text style={[{ opacity: 0.5 }, TextProps]}>{size}</Text>
        </View>
      </View>

      <MaterialCommunityIcons
        name="dots-vertical"
        size={20}
        color={Colors.iconDark}
        onPress={renderOption}
      />
    </View>
  );
};

export default AttachmentList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginHorizontal: 16,
  },
  menu: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderWhite,
  },
});
