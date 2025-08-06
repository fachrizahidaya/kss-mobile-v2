import { memo } from "react";

import { View, Text, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AttendanceAttachmentList from "./AttendanceAttachmentList";
import Reminder from "../Reminder/Reminder";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import styles from "./Attendance.styles";

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
}) => {
  return (
    <View style={{ gap: !attachment?.data?.length ? 10 : null }}>
      <View style={styles.attachmentListHeader}>
        <Text style={[{ fontSize: 18, fontWeight: "500" }, TextProps]}>
          Attachment(s)
        </Text>
        {/* {attachment?.data.length > 0 && ( */}
        <Pressable
          onPress={() =>
            // reference.current?.show()
            navigation.navigate("New Attachment", {
              toggle: toggleAlert,
              setRequestType: setRequest,
              setError: setError,
            })
          }
          style={styles.addButton}
        >
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
        toggleImage={handleToggleImage}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        setSelectedPicture={setSelectedPicture}
      />
    </View>
  );
};

export default memo(AttendanceAttachment);
