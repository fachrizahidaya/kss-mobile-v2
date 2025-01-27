import { memo } from "react";

import dayjs from "dayjs";
import { SheetManager } from "react-native-actions-sheet";

import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import useCheckAccess from "../../../../hooks/useCheckAccess";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const NoteItem = ({
  note,
  title,
  date,
  isPinned,
  onPress,
  openDeleteModal,
  openEditForm,
  index,
  length,
}) => {
  const deleteCheckAccess = useCheckAccess("delete", "Notes");
  const renderOptionSheet = () =>
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.menu}>
            <View style={styles.wrapper}>
              <Pressable
                onPress={async () => {
                  await SheetManager.hide("form-sheet");
                  openDeleteModal(note);
                }}
                style={styles.menuItem}
              >
                <Text style={{ color: "red", fontSize: 16, fontWeight: "700" }}>
                  Delete
                </Text>
                <MaterialCommunityIcons
                  name="delete-outline"
                  color="red"
                  size={20}
                />
              </Pressable>
            </View>
          </View>
        ),
      },
    });

  const handlePinNote = () =>
    onPress({ ...note, status: !isPinned ? "pinned" : "unpinned" });
  const handleEdit = () => openEditForm(note);

  return (
    <Pressable
      style={[styles.card, { marginBottom: index === length - 1 ? 14 : null }]}
      onPress={handleEdit}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderStyle: Platform.OS === "android" && "dashed",
          borderBottomWidth: Platform.OS === "android" && 2.5,
          paddingBottom: Platform.OS === "android" && 18,
          borderColor: Platform.OS === "android" && Colors.borderGrey,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={20}
            color={Colors.iconDark}
          />

          <Text style={[{ fontWeight: "500" }, TextProps]}>
            {dayjs(date).format("DD MMM YYYY")}
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable style={{ borderRadius: 50 }} onPress={handlePinNote}>
            <MaterialCommunityIcons
              name={!isPinned ? "pin-outline" : "pin"}
              style={{ transform: [{ rotate: "45deg" }] }}
              size={20}
              color={Colors.iconDark}
            />
          </Pressable>

          {deleteCheckAccess ? (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={20}
              color={Colors.iconDark}
              onPress={renderOptionSheet}
            />
          ) : null}
        </View>
      </View>

      {Platform.OS === "ios" ? (
        <View style={{ overflow: "hidden" }}>
          <View style={styles.titleDashedBorder} />
        </View>
      ) : null}

      <Text style={[{ fontWeight: "500" }, TextProps]}>{title}</Text>
    </Pressable>
  );
};

export default memo(NoteItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    padding: 16,
    marginTop: 14,
    marginHorizontal: 16,
    gap: 20,
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderWhite,
  },
  titleDashedBorder: {
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: Colors.borderGrey,
    margin: -2,
    marginTop: 0,
    height: 5,
  },
});
