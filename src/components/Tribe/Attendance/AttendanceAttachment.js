import { memo } from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AttendanceAttachmentList from "./AttendanceAttachmentList";
import Reminder from "../Reminder/Reminder";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

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
    <View style={{ gap: !attachment?.data?.length ? 10 : null }}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 18, fontWeight: "500" }, TextProps]}>
          Attachment(s)
        </Text>
        {/* {attachment?.data.length > 0 && ( */}
        <Pressable onPress={() => reference.current?.show()} style={styles.add}>
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
  add: {
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 10,
  },
});
