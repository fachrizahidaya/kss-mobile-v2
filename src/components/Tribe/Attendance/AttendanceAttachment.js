import { memo } from "react";

import { View, Text, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AttendanceAttachmentList from "./AttendanceAttachmentList";
import Reminder from "../Reminder/Reminder";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
<<<<<<< HEAD
import styles from "./Attendance.styles";
=======
>>>>>>> be4a15dd (chore:)

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
  confirmationStatus,
=======
>>>>>>> c7367e02 (fix:)
}) => {
  return (
    <View style={{ gap: !attachment?.data?.length ? 10 : null }}>
<<<<<<< HEAD
      <View style={styles.attachmentListHeader}>
=======
      <View style={styles.header}>
>>>>>>> be4a15dd (chore:)
        <Text style={[{ fontSize: 18, fontWeight: "500" }, TextProps]}>
          Attachment(s)
        </Text>
        {/* {attachment?.data.length > 0 && ( */}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c7367e02 (fix:)
        <Pressable
          onPress={() =>
            // reference.current?.show()
            navigation.navigate("New Attachment", {
              toggle: toggleAlert,
              setRequestType: setRequest,
              setError: setError,
<<<<<<< HEAD
              refetch: refetchSickAttachment,
            })
          }
          style={styles.addButton}
        >
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
          style={styles.add}
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
        confirmationStatus={confirmationStatus}
=======
>>>>>>> c7367e02 (fix:)
      />
    </View>
  );
};

export default memo(AttendanceAttachment);
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
