import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AttachmentItem from "./AttachmentItem";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";

const AttachmentList = ({ kpiList, attachments, handleDelete }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        {!kpiList?.data?.confirm && (
          <Pressable
            onPress={openSelectedAttachmentKpi}
            style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 14 }}
          >
            <MaterialCommunityIcons name="plus" size={20} color="#304FFD" />
            <Text style={[{ color: "#304FFD", fontWeight: "500" }]}>Add Attachment</Text>
          </Pressable>
        )}
      </View>
      {attachments && attachments.length > 0 ? (
        attachments.map((item, index) => {
          return (
            <AttachmentItem
              description={item?.description}
              file_name={item?.attachment ? item?.attachment?.name : item?.file_name}
              onDelete={handleDelete}
              employee_kpi_id={item?.employee_kpi_id}
              attachment_id={item?.attachment_id}
              index={item?.index}
              indexes={index}
              length={attachments?.length}
            />
          );
        })
      ) : (
        <View style={styles.content}>
          <EmptyPlaceholder text="No Data" />
        </View>
      )}
    </ScrollView>
  );
};

export default AttachmentList;

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
