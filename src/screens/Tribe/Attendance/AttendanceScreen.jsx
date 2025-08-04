import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useDisclosure } from "../../../hooks/useDisclosure";
import AttendanceCalendar from "../../../components/Tribe/Attendance/AttendanceCalendar";
import AttendanceForm from "../../../components/Tribe/Attendance/AttendanceForm";
import AddAttendanceAttachment from "../../../components/Tribe/Attendance/AddAttendanceAttachment";
import AttendanceAttachment from "../../../components/Tribe/Attendance/AttendanceAttachment";
import AlertModal from "../../../styles/modals/AlertModal";
import RemoveConfirmationModal from "../../../styles/modals/RemoveConfirmationModal";
import { selectFile } from "../../../styles/buttons/SelectFIle";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import { useAttendance } from "./hooks/useAttendance";

const AttendanceScreen = () => {
  const {
    filter,
    items,
    date,
    fileAttachment,
    requestType,
    errorMessage,
    success,
    hasMonthPassed,
    unattendanceDate,
    currentDate,
    setFileAttachment,
    setRequestType,
    setErrorMessage,
    setItems,
    setDate,
    setSuccess,
    setUnattendanceDate,
    updateAttendanceCheckAccess,
    attendanceScreenSheetRef,
    attachmentScreenSheetRef,
    deleteAttendanceAttachmentIsLoading,
    attendanceData,
    attendanceDataIsFetching,
    refetchAttendanceData,
    attachment,
    attachmentIsFetching,
    refetchAttachment,
    sickAttachment,
    sickAttachmentIsFetching,
    refetchSickAttachment,
    handleSwitchMonth,
    handleSubmitReport,
    handleSubmitAttachment,
    handleOpenDeleteAttachment,
    handleHasMonthPassedCheck,
    handleRefresh,
    handleDeleteAttachment,
  } = useAttendance();

  const route = useRoute();
  const navigation = useNavigation();

  const { unattendance } = route.params;

  const firstTimeRef = useRef(null);

  const { isOpen: deleteAttachmentIsOpen, toggle: toggleDeleteAttachment } =
    useDisclosure(false);
  const { isOpen: attendanceReportModalIsOpen, toggle: toggleAttendanceReportModal } =
    useDisclosure(false);
  const {
    isOpen: attendanceAttachmentModalIsOpen,
    toggle: toggleAttendanceAttachmentModal,
  } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  /**
   * Handle attendance status by day
   */
  const statusTypes = [
    { key: "allGood", color: "#EDEDED", name: "All Good", textColor: Colors.fontDark },
    {
      key: "reportRequired",
      color: "#FDC500",
      name: "Report Required",
      textColor: Colors.fontLight,
    },
    {
      key: "submittedReport",
      color: "#186688",
      name: "Submitted Report",
      textColor: Colors.fontLight,
    },
    { key: "dayOff", color: "#3bc14a", name: "Day-off", textColor: Colors.fontLight },
    { key: "sick", color: "#d6293a", name: "Sick", textColor: Colors.fontLight },
  ];
  const [allGood, reportRequired, submittedReport, dayOff, sick] = statusTypes;

  /**
   * Handle attendance for form report by day
   */
  const attendanceType = date?.attendanceType;
  const attendanceReason = date?.attendanceReason;
  const dayType = date?.dayType;
  const lateType = date?.lateType;
  const lateReason = date?.lateReason;
  const earlyType = date?.earlyType;
  const earlyReason = date?.earlyReason;
  const lateStatus = date?.lateStatus;
  const earlyStatus = date?.earlyStatus;
  const timeIn = date?.timeIn;
  const isWorkDay = date?.dayType === "Work Day";
  const hasClockInAndOut =
    isWorkDay &&
    !lateType &&
    !earlyType &&
    timeIn &&
    !["Leave", "Alpa"].includes(attendanceType);
  const hasLateWithoutReason = lateType && !lateReason && !earlyType;
  const hasEarlyWithoutReason = earlyType && !earlyReason && !lateType;
  const hasLateAndEarlyWithoutReason =
    lateType && earlyType && !lateReason && !earlyReason;
  const hasSubmittedLateReport = lateType && lateReason && !earlyType;
  const hasSubmittedEarlyReport = earlyType && earlyReason && !lateType;
  const hasSubmittedLateNotEarly =
    lateType && lateReason && earlyType && !earlyReason && !earlyStatus;
  const hasSubmittedEarlyNotLate =
    earlyType && earlyReason && lateType && !lateReason && !lateStatus;
  const hasSubmittedBothReports = lateReason && earlyReason;
  const hasSubmittedReportAlpa =
    ["Alpa", "Sick", "Other"].includes(attendanceType) && attendanceReason && isWorkDay;
  const notAttend =
    (attendanceType === "Alpa" &&
      isWorkDay &&
      date?.date !== currentDate &&
      !attendanceReason) ||
    dayType === "Day Off";
  const isLeave =
    (attendanceType === "Leave" && dayType !== "Holiday") || attendanceType === "Permit";
  const holiday = dayType === "Holiday";
  const holidayCutLeave =
    attendanceType === "Leave" && dayType === "Holiday" && attendanceReason;

  /**
   * Handle to create appropriate object for react-native-calendar
   */
  useEffect(() => {
    if (attendanceData?.data && attendanceData?.data.length > 0) {
      let dateList = {};

      attendanceData?.data.forEach((item) => {
        dateList[item?.date] = [
          {
            id: item?.id,
            attendanceReason: item?.att_reason,
            attendanceType: item?.att_type,
            timeIn: item?.time_in,
            late: item?.late,
            lateReason: item?.late_reason,
            lateType: item?.late_type,
            lateStatus: item?.late_status,
            dayType: item?.day_type,
            timeOut: item?.time_out,
            early: item?.early,
            earlyReason: item?.early_reason,
            earlyType: item?.early_type,
            earlyStatus: item?.early_status,
            confirmation: item?.confirm,
            date: item?.date,
            onDuty: item?.on_duty,
            offDuty: item?.off_duty,
          },
        ];
      });

      setItems(dateList);
    }
  }, [attendanceData?.data]);

  /**
   * Handle toggle date
   * @param {*} day
   */
  const toggleDate = useCallback((day) => {
    if (day) {
      const selectedDate = day.dateString;
      const dateData = items[selectedDate];
      if (dateData && dateData.length > 0) {
        dateData.map((item) => {
          if (
            item?.date &&
            item?.confirmation === 0
            // && item?.dayType === "Work Day"
          ) {
            setDate(item);
            attendanceScreenSheetRef.current?.show();
          }
        });
      }
    }
  });

  const handleCloseDate = () => {
    setDate({});
    attendanceScreenSheetRef.current?.hide();
  };

  var renderAlertType;

  if (requestType === "remove") {
    renderAlertType = "success";
  } else if (requestType === "post") {
    renderAlertType = "info";
  } else if (requestType === "reject") {
    renderAlertType = "warning";
  } else {
    renderAlertType = "danger";
  }

  var renderAlertTitle;

  if (requestType === "remove") {
    renderAlertTitle = "Changes saved!";
  } else if (requestType === "post") {
    renderAlertTitle = "Attendance confirmed!";
  } else {
    renderAlertTitle = "Process error!";
  }

  useEffect(() => {
    if (unattendance) {
      setUnattendanceDate(dayjs(unattendance).format("YYYY-MM-DD"));
    }
    // attachmentScreenSheetRef.current?.show();
    navigation.navigate("New Attachment", {
      toggle: toggleAlert,
      setRequestType: setRequestType,
      setError: setErrorMessage,
    });
  }, [unattendance]);

  useEffect(() => {
    handleHasMonthPassedCheck(filter.year, filter.month);
  }, [filter]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetchAttendanceData();
      refetchAttachment();
    }, [refetchAttendanceData, refetchAttachment])
  );

  return (
    <Screen
      screenTitle="My Attendance"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor={Colors.secondary}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={
              attendanceDataIsFetching && attachmentIsFetching && sickAttachmentIsFetching
            }
            onRefresh={handleRefresh}
          />
        }
      >
        <AttendanceCalendar
          items={items}
          updateAttendanceCheckAccess={updateAttendanceCheckAccess}
          toggleDate={toggleDate}
          currentDate={currentDate}
          handleSwitchMonth={handleSwitchMonth}
          allGood={allGood}
          reportRequired={reportRequired}
          submittedReport={submittedReport}
          dayOff={dayOff}
          sick={sick}
        />

        <AttendanceAttachment
          attachment={attachment}
          reference={attachmentScreenSheetRef}
          setAttachmentId={handleOpenDeleteAttachment}
          attachmentIsFetching={attachmentIsFetching}
          refetchAttachment={refetchAttachment}
          sickAttachment={sickAttachment?.data}
          sickAttachmentIsFetching={sickAttachmentIsFetching}
          refetchSickAttachment={refetchSickAttachment}
          navigation={navigation}
        />
      </ScrollView>

      <AttendanceForm
        toggleReport={handleCloseDate}
        date={date}
        handleSubmit={handleSubmitReport}
        hasClockInAndOut={hasClockInAndOut}
        hasLateWithoutReason={hasLateWithoutReason}
        hasEarlyWithoutReason={hasEarlyWithoutReason}
        hasLateAndEarlyWithoutReason={hasLateAndEarlyWithoutReason}
        hasSubmittedLateNotEarly={hasSubmittedLateNotEarly}
        hasSubmittedEarlyNotLate={hasSubmittedEarlyNotLate}
        hasSubmittedBothReports={hasSubmittedBothReports}
        hasSubmittedReportAlpa={hasSubmittedReportAlpa}
        hasSubmittedLateReport={hasSubmittedLateReport}
        hasSubmittedEarlyReport={hasSubmittedEarlyReport}
        notAttend={notAttend}
        isLeave={isLeave}
        CURRENT_DATE={currentDate}
        reference={attendanceScreenSheetRef}
        isOpen={attendanceReportModalIsOpen}
        toggle={toggleAttendanceReportModal}
        requestType={requestType}
        error={errorMessage}
        holiday={holiday}
        holidayCutLeave={holidayCutLeave}
      />

      <AddAttendanceAttachment
        handleSelectFile={selectFile}
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        handleSubmit={handleSubmitAttachment}
        reference={attachmentScreenSheetRef}
        isOpen={attendanceAttachmentModalIsOpen}
        toggle={toggleAttendanceAttachmentModal}
        requestType={requestType}
        error={errorMessage}
        setRequestType={setRequestType}
        setError={setErrorMessage}
        toggleAlert={toggleAlert}
        unattendanceDate={unattendanceDate}
      />

      <RemoveConfirmationModal
        isOpen={deleteAttachmentIsOpen}
        toggle={toggleDeleteAttachment}
        description="Are you sure want to remove attachment?"
        onPress={handleDeleteAttachment}
        isLoading={deleteAttendanceAttachmentIsLoading}
        success={success}
        setSuccess={setSuccess}
        toggleOtherModal={toggleAlert}
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        type={renderAlertType}
        title={renderAlertTitle}
        description={
          requestType === "remove" || "post"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
      />
    </Screen>
  );
};

export default AttendanceScreen;
