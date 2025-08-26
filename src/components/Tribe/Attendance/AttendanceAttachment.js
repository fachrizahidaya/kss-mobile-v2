import { memo } from "react";

import { View, Text, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AttendanceAttachmentList from "./AttendanceAttachmentList";
import Reminder from "../Reminder/Reminder";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import styles from "./Attendance.styles";
=======
>>>>>>> be4a15dd (chore:)
=======
import styles from "./Attendance.styles";
>>>>>>> 6d058444 (feat: attendance)
=======
import styles from "./Attendance.styles";
>>>>>>> 859eea89 (first commit)

const AttendanceAttachment = ({
  attachment,
  setAttachmentId,
  reference,
  attachmentIsFetching,
  refetchAttachment,
  sickAttachment,
  sickAttachmentIsFetching,
  refetchSickAttachment,
  navigation,
  toggleAlert,
  setRequest,
  setError,
  handleToggleImage,
  isFullScreen,
  setIsFullScreen,
  setSelectedPicture,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  confirmationStatus,
=======
>>>>>>> c7367e02 (fix:)
=======
  confirmationStatus,
>>>>>>> d6d8c50d (fix:)
}) => {
  return (
    <View style={{ gap: !attachment?.data?.length ? 10 : null }}>
<<<<<<< HEAD
<<<<<<< HEAD
      <View style={styles.attachmentListHeader}>
=======
      <View style={styles.header}>
>>>>>>> be4a15dd (chore:)
=======
      <View style={styles.attachmentListHeader}>
>>>>>>> 6d058444 (feat: attendance)
=======
  confirmationStatus,
}) => {
  return (
    <View style={{ gap: !attachment?.data?.length ? 10 : null }}>
      <View style={styles.attachmentListHeader}>
>>>>>>> 859eea89 (first commit)
        <Text style={[{ fontSize: 18, fontWeight: "500" }, TextProps]}>
          Attachment(s)
        </Text>
        {/* {attachment?.data.length > 0 && ( */}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c7367e02 (fix:)
=======
>>>>>>> 859eea89 (first commit)
        <Pressable
          onPress={() =>
            // reference.current?.show()
            navigation.navigate("New Attachment", {
              toggle: toggleAlert,
              setRequestType: setRequest,
              setError: setError,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d6d8c50d (fix:)
=======
>>>>>>> 859eea89 (first commit)
              refetch: refetchSickAttachment,
            })
          }
          style={styles.addButton}
        >
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          {/* {confirmationStatus ? null : (
            <MaterialCommunityIcons name="plus" size={20} color={Colors.iconDark} />
          )} */}
        </Pressable>
        {/* )} */}
      </View>

=======
        <Pressable onPress={() => reference.current?.show()} style={styles.add}>
=======
            })
          }
          style={styles.addButton}
        >
>>>>>>> c7367e02 (fix:)
          <MaterialCommunityIcons name="plus" size={20} color={Colors.iconDark} />
        </Pressable>
        {/* )} */}
      </View>
      {sickAttachment?.length > 0 ? (
        <Reminder
          data={sickAttachment}
          isFetching={sickAttachmentIsFetching}
          refetch={refetchSickAttachment}
          forSick={true}
        />
      ) : null}
>>>>>>> be4a15dd (chore:)
=======
          {confirmationStatus ? null : (
=======
          {/* {confirmationStatus ? null : (
>>>>>>> 8ba5874e (fix: minor adjustment on attendance)
            <MaterialCommunityIcons name="plus" size={20} color={Colors.iconDark} />
          )} */}
        </Pressable>
        {/* )} */}
      </View>

>>>>>>> d6d8c50d (fix:)
=======
          {/* {confirmationStatus ? null : (
            <MaterialCommunityIcons name="plus" size={20} color={Colors.iconDark} />
          )} */}
        </Pressable>
        {/* )} */}
      </View>

>>>>>>> 859eea89 (first commit)
      {!attachment?.data?.length && (
        <>
          {/* <Pressable
            onPress={() => reference.current?.show()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginHorizontal: 16,
            }}
          >
            <MaterialCommunityIcons name="plus" size={15} color="#304FFD" />
            <Text style={[{ color: "#304FFD", fontWeight: "500" }]}>Add Attachment</Text>
          </Pressable> */}
          <EmptyPlaceholder text="No Data" />
        </>
      )}

      <AttendanceAttachmentList
        data={attachment?.data}
        isFetching={attachmentIsFetching}
        refetch={refetchAttachment}
        setAttachmentId={setAttachmentId}
        toggleImage={handleToggleImage}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        setSelectedPicture={setSelectedPicture}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        confirmationStatus={confirmationStatus}
=======
>>>>>>> c7367e02 (fix:)
=======
        confirmationStatus={confirmationStatus}
>>>>>>> d6d8c50d (fix:)
=======
        confirmationStatus={confirmationStatus}
>>>>>>> 859eea89 (first commit)
      />
    </View>
  );
};

export default memo(AttendanceAttachment);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  add: {
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 10,
  },
});
>>>>>>> be4a15dd (chore:)
=======
>>>>>>> 6d058444 (feat: attendance)
=======
>>>>>>> 859eea89 (first commit)
