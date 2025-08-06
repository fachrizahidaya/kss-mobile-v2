import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { Text } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useDisclosure } from "../../../hooks/useDisclosure";
import { useAttendance } from "./hooks/useAttendance";
import { selectFile } from "../../../styles/buttons/SelectFIle";
import { toggleFullScreenImageHandler } from "../../../components/Tribe/Feed/shared/functions";
import AttendanceCalendar from "../../../components/Tribe/Attendance/AttendanceCalendar";
import AttendanceForm from "../../../components/Tribe/Attendance/AttendanceForm";
import AddAttendanceAttachment from "../../../components/Tribe/Attendance/AddAttendanceAttachment";
import AttendanceAttachment from "../../../components/Tribe/Attendance/AttendanceAttachment";
import AlertModal from "../../../styles/modals/AlertModal";
import RemoveConfirmationModal from "../../../styles/modals/RemoveConfirmationModal";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import FormButton from "../../../styles/buttons/FormButton";
import ImageFullScreenModal from "../../../styles/modals/ImageFullScreenModal";
import styles from "./Attendance.styles";
import CustomCalendar from "../../../components/Tribe/Attendance/CustomCalendar";
import AttendanceColor from "../../../components/Tribe/Attendance/AttendanceColor";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";

const Attendance = () => {
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
    isFullScreen,
    selectedPicture,
    currentDate,
    setFileAttachment,
    setIsFullScreen,
    setRequestType,
    setErrorMessage,
    setSelectedPicture,
    setItems,
    setDate,
    setSuccess,
    updateAttendanceCheckAccess,
    attendanceScreenSheetRef,
    attachmentScreenSheetRef,
    deleteAttachmentIsOpen,
    toggleDeleteAttachment,
    deleteAttendanceAttachmentIsLoading,
    attendance,
    attendanceIsFetching,
    refetchAttendance,
    attachment,
    attachmentIsFetching,
    refetchAttachment,
    sickAttachment,
    sickAttachmentIsFetching,
    refetchSickAttachment,
    confirmationStatus,
    handleSwitchMonth,
    handleSubmitReport,
    handleSubmitAttachment,
    handleOpenDeleteAttachment,
    handleHasMonthPassedCheck,
    handleRefresh,
    handleDeleteAttachment,
  } = useAttendance();

  const firstTimeRef = useRef(null);

  const navigation = useNavigation();

  const { isOpen: attendanceReportModalIsOpen, toggle: toggleAttendanceReportModal } =
    useDisclosure(false);
  const {
    isOpen: attendanceAttachmentModalIsOpen,
    toggle: toggleAttendanceAttachmentModal,
  } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { isOpen: confirmationIsOpen, toggle: toggleConfirmation } = useDisclosure(false);

  /**
   * Handle attendance status by day
   */
  const statusTypes = [
    {
      key: "allGood",
      color: "#EDEDED",
      name: "All Good",
      textColor: Colors.fontDark,
    },
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
    {
      key: "dayOff",
      color: "#3bc14a",
      name: "Day-off",
      textColor: Colors.fontLight,
    },
    {
      key: "leave",
      color: "#F97316",
      name: "Leave",
      textColor: Colors.fontLight,
    },
    {
      key: "sick",
      color: "#d6293a",
      name: "Sick",
      textColor: Colors.fontLight,
    },
  ];
  const [allGood, reportRequired, submittedReport, dayOff, leave, sick] = statusTypes;

  /**
   * Handle attendance for form report by day
   */
  const attendanceType = date?.attendanceType;
  const attendanceReason = date?.attendanceReason;
  const dayType = date?.dayType;
  const dateData = date?.date;
  const lateType = date?.lateType;
  const lateReason = date?.lateReason;
  const earlyType = date?.earlyType;
  const earlyReason = date?.earlyReason;
  const lateStatus = date?.lateStatus;
  const earlyStatus = date?.earlyStatus;
  const timeIn = date?.timeIn;
  const leaveRequest = date?.leaveRequest;
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
  const isLeave = attendanceType === "Leave" && dayType !== "Holiday";
  // || attendanceType === "Permit"
  const holiday = dayType === "Holiday";
  const holidayCutLeave =
    attendanceType === "Leave" && dayType === "Holiday" && attendanceReason;

  /**
   * Handle to create appropriate object for react-native-calendar
   */
  useEffect(() => {
    if (attendance?.data && attendance?.data.length > 0) {
      let dateList = {};

      attendance?.data.forEach((item) => {
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
            dateData: item?.date,
            timeOut: item?.time_out,
            early: item?.early,
            earlyReason: item?.early_reason,
            earlyType: item?.early_type,
            earlyStatus: item?.early_status,
            confirmation: item?.confirm,
            date: item?.date,
            onDuty: item?.on_duty,
            offDuty: item?.off_duty,
            leaveRequest: item?.leave_request,
          },
        ];
      });

      setItems(dateList);
    }
  }, [attendance?.data]);

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
            item?.confirmation === 0 &&
            item?.dayType !== "Day Off" &&
            item?.dayType !== "Holiday"
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

  const handleDataRefreshing =
    attachmentIsFetching && attachmentIsFetching && sickAttachmentIsFetching;

  const renderChildrenHeader = (
    <FormButton
      onPress={toggleConfirmation}
      isSubmitting={null}
      disabled={!hasMonthPassed || confirmationStatus?.data?.confirm}
    >
      <Text style={styles.confirmButtonText}>
        {confirmationStatus?.data?.confirm
          ? "Attendance Confirmed"
          : "Confirm Attendance"}
      </Text>
    </FormButton>
  );

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
    handleHasMonthPassedCheck(filter.year, filter.month);
  }, [filter]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetchAttendance();
      refetchAttachment();
    }, [refetchAttendance, refetchAttachment])
  );

  return (
    <Screen
      screenTitle="My Attendance"
      backgroundColor={Colors.backgroundLight}
      // childrenHeader={renderChildrenHeader}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={handleDataRefreshing} onRefresh={handleRefresh} />
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
          leave={leave}
        />
        {/* <CustomCalendar
          toggleDate={toggleDate}
          updateAttendanceCheckAccess={updateAttendanceCheckAccess}
          allGood={allGood}
          reportRequired={reportRequired}
          submittedReport={submittedReport}
          dayOff={dayOff}
          sick={sick}
          leave={leave}
          items={items}
          currentDate={currentDate}
          handleSwitchMonth={handleSwitchMonth}
          beginPeriod={dayjs(attendance?.period?.begin_date).format("DD MMM YYYY")}
          endPeriod={dayjs(attendance?.period?.begin_date).format("DD MMM YYYY")}
        />
        <AttendanceColor /> */}

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
          toggleAlert={toggleAlert}
          setRequest={setRequestType}
          setError={setErrorMessage}
          handleToggleImage={toggleFullScreenImageHandler}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          setSelectedPicture={setSelectedPicture}
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
        holidayCutLeave={holidayCutLeave}
        holiday={holiday}
        CURRENT_DATE={currentDate}
        reference={attendanceScreenSheetRef}
        isOpen={attendanceReportModalIsOpen}
        toggle={toggleAttendanceReportModal}
        requestType={requestType}
        error={errorMessage}
        refetchAttendance={refetchAttendance}
        refetchAttachment={refetchSickAttachment}
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
        refetchAttachment={refetchAttachment}
        refetchSickAttachment={refetchSickAttachment}
      />

      <ImageFullScreenModal
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        file_path={selectedPicture}
        setSelectedPicture={setSelectedPicture}
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

      <ConfirmationModal
        isOpen={confirmationIsOpen}
        toggle={toggleConfirmation}
        description={`Are you sure want to confirm the ${dayjs(
          attendance?.period?.begin_date
        ).format("DD MMM YYYY")} - ${dayjs(attendance?.period?.end_date).format(
          "DD MMM YYYY"
        )} attendance?`}
        apiUrl={"/hr/timesheets/personal/confirm"}
        body={filter}
        hasSuccessFunc={true}
        onSuccess={handleRefresh}
        isDelete={false}
        isGet={false}
        isPatch={false}
        toggleOtherModal={toggleAlert}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
        setRequestType={setRequestType}
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

export default Attendance;
