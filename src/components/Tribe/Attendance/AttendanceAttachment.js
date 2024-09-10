import { memo } from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AttendanceAttachmentList from "./AttendanceAttachmentList";
import Reminder from "../Reminder/Reminder";

const AttendanceAttachment = ({
  attachment,
  setAttachmentId,
  reference,
  attachmentIsFetching,
  refetchAttachment,
  sickAttachment,
  sickAttachmentIsFetching,
  refetchSickAttachment,
}) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Attachment(s)</Text>
        {attachment?.data.length > 0 && (
          <MaterialCommunityIcons name="plus" size={20} onPress={() => reference.current?.show()} color="#3F434A" />
        )}
      </View>
      {/* {sickAttachment?.length > 0 ? (
        <Reminder
          data={sickAttachment}
          isFetching={sickAttachmentIsFetching}
          refetch={refetchSickAttachment}
          forSick={true}
        />
      ) : null} */}
      {!attachment?.data?.length && (
        <Pressable
          onPress={() => reference.current?.show()}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <MaterialCommunityIcons name="plus" size={20} color="#304FFD" />
          <Text style={[{ color: "#304FFD", fontWeight: "500" }]}>Add Attachment</Text>
        </Pressable>
      )}

      <AttendanceAttachmentList
        data={attachment?.data}
        isFetching={attachmentIsFetching}
        refetch={refetchAttachment}
        setAttachmentId={setAttachmentId}
      />
    </View>
  );
};

export default memo(AttendanceAttachment);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
});
