import { memo } from "react";

import dayjs from "dayjs";
import { SheetManager } from "react-native-actions-sheet";

import { Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import useCheckAccess from "../../../../hooks/useCheckAccess";
import { TextProps } from "../../../../styles/CustomStylings";

const NoteItem = ({ note, title, date, isPinned, onPress, openDeleteModal, openEditForm }) => {
  const deleteCheckAccess = useCheckAccess("delete", "Notes");
  const renderOptionSheet = () =>
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.menu}>
            <View style={styles.wrapper}>
              <TouchableOpacity
                onPress={async () => {
                  await SheetManager.hide("form-sheet");
                  openDeleteModal(note);
                }}
                style={styles.menuItem}
              >
                <Text style={{ color: "red", fontSize: 16, fontWeight: 700 }}>Delete</Text>
                <MaterialCommunityIcons name="delete-outline" color="red" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        ),
      },
    });

  const handlePinNote = () => onPress({ ...note, status: !isPinned ? "pinned" : "unpinned" });
  const handleEdit = () => openEditForm(note);

  return (
    <Pressable onPress={handleEdit}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderStyle: Platform.OS === "android" && "dashed",
            borderBottomWidth: Platform.OS === "android" && 2.5,
            paddingBottom: Platform.OS === "android" && 18,
            borderColor: Platform.OS === "android" && "#E8E9EB",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <MaterialCommunityIcons name="calendar-month" size={20} color="#3F434A" />

            <Text style={[{ fontWeight: 500 }, TextProps]}>{dayjs(date).format("DD MMMM, YYYY")}</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable style={{ borderRadius: 50 }} onPress={handlePinNote}>
              <MaterialCommunityIcons
                name={!isPinned ? "pin-outline" : "pin"}
                style={{ transform: [{ rotate: "45deg" }] }}
                size={20}
                color="#3F434A"
              />
            </Pressable>

            {deleteCheckAccess ? (
              <Pressable style={{ borderRadius: 50 }} onPress={renderOptionSheet}>
                <MaterialCommunityIcons name="dots-vertical" size={20} color="#3F434A" />
              </Pressable>
            ) : null}
          </View>
        </View>

        {Platform.OS === "ios" ? (
          <View style={{ overflow: "hidden" }}>
            <View style={styles.titleDashedBorder} />
          </View>
        ) : null}

        <Text style={[{ fontWeight: 500 }, TextProps]}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default memo(NoteItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    // shadowColor: "rgba(0, 0, 0, 0.3)",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
    marginVertical: 4,
    marginHorizontal: 14,
    gap: 20,
  },
  menu: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    backgroundColor: "#F5F5F5",
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
    borderBottomColor: "#fff",
  },
  titleDashedBorder: {
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#E8E9EB",
    margin: -2,
    marginTop: 0,
    height: 5,
  },
});
