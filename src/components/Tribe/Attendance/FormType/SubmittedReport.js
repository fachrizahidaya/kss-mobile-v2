import { Text, View, Pressable, Image } from "react-native";
import dayjs from "dayjs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Clock from "./shared/Clock";
import Options from "./shared/Options";
import Reason from "./shared/Reason";
import FormButton from "../../../../styles/buttons/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";
import AddAttendanceAttachmentForm from "../AddAttendanceAttachmentForm";
import { StyleSheet } from "react-native";
import ImageFullScreenModal from "../../../../styles/modals/ImageFullScreenModal";

const SubmittedReport = ({
  date,
  formik,
  titleDuty,
  titleClock,
  title,
  field,
  types,
  fieldName,
  placeholder,
  alpa,
  reasonValue,
  typeValue,
  sickFormik,
  onChangeStartDate,
  onChangeEndDate,
  onSelectFile,
  fileAttachment,
  setFileAttachment,
  setRequestType,
  setError,
  toggleAlert,
  toggleImage,
  toggleFullScreen,
  isFullScreen,
  setIsFullScreen,
  setSelectedPicture,
  reasonNotClockOutValue,
  handleChangeNotClockOut,
}) => {
  var renderDisabled;

  if ((typeValue === "Late" || typeValue === "Early") && !reasonValue) {
    renderDisabled = false;
  } else if ((typeValue === "Alpa" || typeValue === "Absent") && !reasonValue) {
    renderDisabled = false;
  } else if (date?.approvalUnattendance !== null) {
    renderDisabled = true;
  } else if (date?.approvalLate !== null) {
    renderDisabled = true;
  } else if (date?.approvalEarly !== null) {
    renderDisabled = true;
  } else if (date?.approvalClockOut !== null) {
    renderDisabled = true;
  }
  // else if (!fileAttachment) {
  //   renderDisabled = true;
  // }
  else {
    renderDisabled = !reasonValue || !typeValue;
  }

  const handleFullScreen = () => {
    toggleFullScreen(
      date?.attendanceAttachment?.file_path,
      isFullScreen,
      setIsFullScreen,
      setSelectedPicture
    );
  };

  return (
    <View style={{ gap: 10 }}>
      <Text
        style={[
          TextProps,
          { color: Colors.fontGrey, flexDirection: "row", justifyContent: "flex-end" },
        ]}
      >
        {dayjs(date?.date).format("DD MMM YYYY")}
      </Text>
      {date?.approvalUnattendance ? (
        <Text style={[TextProps, { color: Colors.error }]}>
          {`Waiting for approval by ${date?.approvalUnattendance?.approval_by}`}
        </Text>
      ) : null}
      {!alpa ? (
        <Clock
          titleDuty={titleDuty}
          timeDuty={date?.onDuty}
          titleClock={titleClock}
          timeInOrTimeOut={date?.timeIn}
          lateOrEarly={date?.late}
        />
      ) : null}
      <Options
        formik={formik}
        value={typeValue}
        title={title}
        field={field}
        types={types}
        valueChange={(value) => formik.setFieldValue(field, value)}
        placeholder={placeholder}
        isDisabled={date?.approvalUnattendance || date?.approvalLate ? true : false}
      />

      <Reason
        formik={formik}
        value={reasonValue}
        fieldName={fieldName}
        isEditable={date?.approvalUnattendance || date?.approvalLate ? false : true}
      />

      {(date?.attendanceType !== "Attend" || date?.attendanceType !== "Present") &&
      !date?.timeIn &&
      !date?.timeOut ? (
        <View style={{ gap: 5 }}>
          <Text style={[{ fontSize: 14 }, TextProps]}>Attachment</Text>
          <Pressable
            disabled={date?.approvalUnattendance === null || date?.approvalLate === null}
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
            style={[
              styles.attachment,
              {
                backgroundColor:
                  date?.approvalUnattendance || date?.approvalLate
                    ? Colors.disabled
                    : null,
              },
            ]}
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
      ) : null}

      <View style={styles.boxImage}>
        {fileAttachment || date?.attendanceAttachment ? (
          <Pressable onPress={handleFullScreen} style={{ alignSelf: "center" }}>
            <Image
              source={{
                uri:
                  fileAttachment?.uri ||
                  `${process.env.EXPO_PUBLIC_API}/image/${date?.attendanceAttachment?.file_path}`,
              }}
              alt="image selected"
              style={styles.image}
            />
            {fileAttachment ? (
              <MaterialCommunityIcons
                name="close"
                size={20}
                color={Colors.iconLight}
                style={styles.close}
                onPress={() => setFileAttachment(null)}
              />
            ) : null}
          </Pressable>
        ) : null}
      </View>

      {!date?.timeOut &&
        (date?.attendanceType === "Attend" || date?.attendanceType === "Present") && (
          <View style={{ gap: 10 }}>
            {date?.approvalClockOut ? (
              <Text style={[TextProps, { color: Colors.error }]}>
                {`Waiting for approval by ${date?.approvalClockOut?.approval_by}`}
              </Text>
            ) : null}
            <Reason
              formik={formik}
              value={reasonNotClockOutValue}
              fieldName={fieldName}
              onChangeText={handleChangeNotClockOut}
              title="Forgot to Clock Out Reason"
              isEditable={date?.approvalClockOut === null ? true : false}
            />
            {/* <FormButton
        isSubmitting={formik.isSubmitting}
        onPress={formik.handleSubmit}
        disabled={disabled}
      >
        <Text style={{ color: Colors.fontLight }}>Save</Text>
      </FormButton> */}
          </View>
        )}

      {
        <FormButton
          isSubmitting={formik.isSubmitting}
          onPress={formik.handleSubmit}
          disabled={renderDisabled}
        >
          <Text style={{ color: Colors.fontLight }}>Save</Text>
        </FormButton>
      }

      <ImageFullScreenModal
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        file_path={date?.attendanceAttachment?.file_path}
        setSelectedPicture={setSelectedPicture}
      />
    </View>
  );
};

export default SubmittedReport;

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
    width: 200,
    height: 200,
    resizeMode: "contain",
    backgroundColor: Colors.secondary,
  },
});
