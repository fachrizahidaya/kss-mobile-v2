import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import dayjs from "dayjs";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Clock from "./shared/Clock";
import Options from "./shared/Options";
import Reason from "./shared/Reason";
import FormButton from "../../../../styles/buttons/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";
import AddAttendanceAttachmentForm from "../AddAttendanceAttachmentForm";
import ImageFullScreenModal from "../../../../styles/modals/ImageFullScreenModal";
import CustomBadge from "../../../../styles/CustomBadge";
import Tabs from "../../../../layouts/Tabs";

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
  approvalHistory,
}) => {
  const [tabValue, setTabValue] = useState("report");
  const [previousTabValue, setPreviousTabValue] = useState(0);
  const [number, setNumber] = useState(0);

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const tabs = useMemo(() => {
    return [
      { title: "report", value: "report", number: 1 },
      { title: "approval", value: "approval", number: 2 },
    ];
  }, []);

  const handleChangeTab = useCallback((value) => {
    setTabValue(value);
  }, []);

  const handleChangeNumber = (value) => {
    setNumber(value);
  };

  const renderContent = () => {
    switch (tabValue) {
      case "report":
        return (
          <View style={{ gap: 10 }}>
            <Text
              style={[
                TextProps,
                {
                  color: Colors.fontGrey,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                },
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
            {date?.approvalLate || date?.approvalEarly ? (
              <Text style={[TextProps, { color: Colors.error }]}>
                {`Waiting for approval by ${
                  date?.approvalLate?.approval_by || date?.approvalEarly?.approval_by
                }`}
              </Text>
            ) : null}
            <Options
              formik={formik}
              value={typeValue}
              title={title}
              field={field}
              types={types}
              valueChange={(value) => formik.setFieldValue(field, value)}
              placeholder={placeholder}
              isDisabled={
                date?.approvalUnattendance || date?.approvalLate || date?.approvalEarly
                  ? true
                  : false
              }
            />

            <Reason
              formik={formik}
              value={reasonValue}
              fieldName={fieldName}
              isEditable={
                date?.approvalUnattendance || date?.approvalLate || date?.approvalEarly
                  ? false
                  : true
              }
            />

            {(date?.attendanceType !== "Attend" || date?.attendanceType !== "Present") &&
            !date?.timeIn &&
            !date?.timeOut ? (
              <View style={{ gap: 5 }}>
                <Text style={[{ fontSize: 14 }, TextProps]}>Attachment</Text>
                <Pressable
                  disabled={
                    date?.approvalUnattendance ||
                    date?.approvalLate ||
                    date?.approvalEarly
                  }
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
                        date?.approvalUnattendance ||
                        date?.approvalLate ||
                        date?.approvalEarly
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
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {formik.errors.attachment}
                  </Text>
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
              (date?.attendanceType === "Attend" ||
                date?.attendanceType === "Present") && (
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
                </View>
              )}

            <FormButton
              isSubmitting={formik.isSubmitting}
              onPress={formik.handleSubmit}
              disabled={renderDisabled}
            >
              <Text style={{ color: Colors.fontLight }}>Save</Text>
            </FormButton>

            <ImageFullScreenModal
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
              file_path={date?.attendanceAttachment?.file_path}
              setSelectedPicture={setSelectedPicture}
            />
          </View>
        );

      default:
        return (
          <View>
            {approvalHistory?.length > 0 ? (
              approvalHistory.map((item) => {
                return (
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderWidth: 1,
                      borderColor: Colors.borderGrey,
                      borderRadius: 10,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                    }}
                  >
                    <View style={{ gap: 5 }}>
                      <Text style={[TextProps, { color: Colors.primary }]}>
                        {`${item?.object}`}
                      </Text>
                      <Text style={[TextProps]}>
                        {`${dayjs(item?.updated_at).format("DD MMM YYYY hh:mm")}`}
                      </Text>
                    </View>
                    <CustomBadge
                      description={item?.status}
                      backgroundColor={"#dcfce6"}
                      textColor={"#16a349"}
                    />
                  </View>
                );
              })
            ) : (
              <Text style={[TextProps, { textAlign: "center" }]}>No Data</Text>
            )}
          </View>
        );
    }
  };

  const handleFullScreen = () => {
    toggleFullScreen(
      date?.attendanceAttachment?.file_path,
      isFullScreen,
      setIsFullScreen,
      setSelectedPicture
    );
  };

  useEffect(() => {
    setTabValue("report");
  }, [date]);

  useEffect(() => {
    if (previousTabValue !== number) {
      const direction = previousTabValue < number ? -1 : 1;
      translateX.value = withTiming(
        direction * width,
        { duration: 300, easing: Easing.out(Easing.cubic) },
        () => {
          translateX.value = 0;
        }
      );
    }
    setPreviousTabValue(number);
  }, [number]);

  return (
    <View style={{ gap: 10 }}>
      <Tabs
        tabs={tabs}
        value={tabValue}
        onChange={handleChangeTab}
        justify="space-evenly"
        onChangeNumber={handleChangeNumber}
      />
      <Animated.View style={[animatedStyle]}>{renderContent()}</Animated.View>
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
