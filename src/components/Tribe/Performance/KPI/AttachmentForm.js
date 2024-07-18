import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Select from "../../../../styles/forms/Select";
import { TextProps } from "../../../../styles/CustomStylings";

const AttachmentForm = ({
  reference,
  onSelectFile,
  kpiValues,
  formik,
  handleClose,
  fileAttachment,
  setFileAttachment,
  setRequestType,
  toggleAlert,
  setError,
}) => {
  const kpi = kpiValues.map((item, index) => {
    return {
      value: item.id,
      label: item.description,
    };
  });

  const handleSubmit = () => {
    formik.handleSubmit();
    handleClose();
  };

  return (
    <ActionSheet ref={reference}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ gap: 21, paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 40 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Attachment</Text>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={{ opacity: formik.values.id && formik.values.file ? 1 : 0.5 }}>Save</Text>
            </TouchableOpacity>
          </View>
          <Select
            title="KPI"
            value={formik.values.id}
            placeHolder="Select your KPI"
            items={kpi}
            onChange={(value) => formik.setFieldValue("id", value)}
          />

          <View style={{ gap: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[{ fontSize: 14 }, TextProps]}>Attachment</Text>
            </View>
            <Pressable
              onPress={() => onSelectFile(setFileAttachment, false, setRequestType, toggleAlert, setError)}
              style={styles.attachment}
            >
              <Text
                style={[TextProps, { fontSize: 12, opacity: 0.5, overflow: "hidden", width: "80%" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {!fileAttachment ? "Upload image or .pdf" : fileAttachment?.name}
              </Text>
              <MaterialCommunityIcons
                name="attachment"
                size={20}
                style={{ transform: [{ rotate: "-35deg" }] }}
                color="#3F434A"
              />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ActionSheet>
  );
};

export default AttachmentForm;

const styles = StyleSheet.create({
  attachment: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#E8E9EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
});
