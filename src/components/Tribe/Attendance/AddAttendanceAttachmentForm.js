import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import { TextProps } from "../../../styles/CustomStylings";
import FormButton from "../../../styles/buttons/FormButton";
import Input from "../../../styles/forms/Input";
import { Colors } from "../../../styles/Color";

const AddAttendanceAttachmentForm = ({
  formik,
  onChangeStartDate,
  onChangeEndDate,
  onSelectFile,
  fileAttachment,
  setFileAttachment,
  setRequestType,
  toggleAlert,
  setError,
  toggleImage,
}) => {
  const handleDeleteImage = () => setFileAttachment(null);

  return (
    <View style={{ gap: 10 }}>
      <Input
        formik={formik}
        title="Title"
        fieldName="title"
        placeHolder="Input title"
        value={formik.values.title}
        onChangeText={(value) => formik.setFieldValue("title", value)}
      />

      {Platform.OS === "android" ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "45%" }}>
            <CustomDateTimePicker
              unlimitStartDate={true}
              defaultValue={formik.values.begin_date}
              onChange={onChangeStartDate}
              title="Begin Date"
            />
            {!formik.errors.begin_date ? null : (
              <Text style={{ fontSize: 14, color: "red" }}>
                {formik.errors.begin_date}
              </Text>
            )}
          </View>
          <View style={{ width: "45%" }}>
            <CustomDateTimePicker
              defaultValue={formik.values.end_date}
              onChange={onChangeEndDate}
              title="End Date"
              minimumDate={formik.values.begin_date}
            />
            {!formik.errors.end_date ? null : (
              <Text style={{ fontSize: 14, color: "red" }}>{formik.errors.end_date}</Text>
            )}
          </View>
        </View>
      ) : (
        <>
          <CustomDateTimePicker
            unlimitStartDate={true}
            defaultValue={formik.values.begin_date}
            onChange={onChangeStartDate}
            title="Begin Date"
          />
          {!formik.errors.begin_date ? null : (
            <Text style={{ fontSize: 14, color: "red" }}>{formik.errors.begin_date}</Text>
          )}
          <CustomDateTimePicker
            defaultValue={formik.values.end_date}
            onChange={onChangeEndDate}
            title="End Date"
            minimumDate={formik.values.begin_date}
          />
          {!formik.errors.end_date ? null : (
            <Text style={{ fontSize: 14, color: "red" }}>{formik.errors.end_date}</Text>
          )}
        </>
      )}

      <View style={{ gap: 5 }}>
        <Text style={[{ fontSize: 14 }, TextProps]}>Attachment</Text>
        <Pressable
          onPress={
            toggleImage
            // () =>
            //   onSelectFile(
            //     setFileAttachment,
            //     false,
            //     setRequestType,
            //     toggleAlert,
            //     setError
            //   )
          }
          style={styles.attachment}
        >
          <Text
            style={[
              { fontSize: 12, opacity: 0.5, overflow: "hidden", width: 300 },
              TextProps,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {!fileAttachment ? "Upload image" : fileAttachment?.name}
          </Text>
          <MaterialCommunityIcons
            name="attachment"
            size={20}
            style={{ transform: [{ rotate: "-35deg" }] }}
            color={Colors.iconDark}
          />
        </Pressable>
        {!formik.errors.attachment ? null : (
          <Text style={{ fontSize: 14, color: "red" }}>{formik.errors.attachment}</Text>
        )}
      </View>

      <View style={styles.boxImage}>
        {fileAttachment ? (
          <View style={{ alignSelf: "center" }}>
            <Image
              source={{ uri: fileAttachment?.uri }}
              alt="image selected"
              style={styles.image}
            />
            <MaterialCommunityIcons
              name="close"
              size={20}
              color={Colors.iconLight}
              style={styles.close}
              onPress={handleDeleteImage}
            />
          </View>
        ) : null}
      </View>

      <FormButton
        isSubmitting={formik.isSubmitting}
        onPress={formik.handleSubmit}
        disabled={
          !formik.values.attachment ||
          !formik.values.title ||
          !formik.values.begin_date ||
          !formik.values.end_date
        }
      >
        <Text style={{ color: Colors.fontLight }}>Submit</Text>
      </FormButton>
    </View>
  );
};

export default AddAttendanceAttachmentForm;

const styles = StyleSheet.create({
  attachment: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: Colors.borderGrey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    flex: 1,
    width: 300,
    height: 200,
    resizeMode: "contain",
    backgroundColor: Colors.secondary,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  close: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 30,
    backgroundColor: "#4b4f53",
  },
});
