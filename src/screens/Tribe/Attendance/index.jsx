import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { Text } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useAttendance } from "./hooks/useAttendance";
import { selectFile } from "../../../styles/buttons/SelectFIle";
import { toggleFullScreenImageHandler } from "../../../components/Tribe/Feed/shared/functions";
import AttendanceForm from "../../../components/Tribe/Attendance/AttendanceForm";
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
    attendanceReportModalIsOpen,
    toggleAttendanceReportModal,
    attendanceAttachmentModalIsOpen,
    toggleAttendanceAttachmentModal,
    alertIsOpen,
    toggleAlert,
    confirmationIsOpen,
    toggleConfirmation,
    deleteAttachmentIsOpen,
    toggleDeleteAttachment,
    pickImageIsOpen,
    togglePickImage,
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
    toggleDate,
    handleCloseDate,
    handleDataRefreshing,
  } = useAttendance();

  const firstTimeRef = useRef(null);
<<<<<<< HEAD
  const navigation = useNavigation();
=======

  const updateAttendanceCheckAccess = useCheckAccess("update", "Attendance");

  const { isOpen: deleteAttachmentIsOpen, toggle: toggleDeleteAttachment } =
    useDisclosure(false);
  const { isOpen: attendanceReportModalIsOpen, toggle: toggleAttendanceReportModal } =
    useDisclosure(false);
  const {
    isOpen: attendanceAttachmentModalIsOpen,
    toggle: toggleAttendanceAttachmentModal,
  } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const {
    toggle: toggleDeleteAttendanceAttachment,
    isLoading: deleteAttendanceAttachmentIsLoading,
  } = useLoading(false);

  const {
    data: attendanceData,
    isFetching: attendanceDataIsFetching,
    refetch: refetchAttendanceData,
  } = useFetch(`/hr/timesheets/personal`, [filter], filter);

  const {
    data: attachment,
    isFetching: attachmentIsFetching,
    refetch: refetchAttachment,
  } = useFetch(`/hr/timesheets/personal/attachments`, [filter], filter);

  const {
    data: sickAttachment,
    isFetching: sickAttachmentIsFetching,
    refetch: refetchSickAttachment,
  } = useFetch(`/hr/timesheets/personal/attachment-required`, [filter], filter);
>>>>>>> bcc914ea (fix: update unnecessary)

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
<<<<<<< HEAD
      key: "leave",
      color: "#F97316",
      name: "Leave",
      textColor: Colors.fontLight,
    },
    {
=======
>>>>>>> bcc914ea (fix: update unnecessary)
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
  const hasClockInAndOut =
<<<<<<< HEAD
    date?.dayType === "Work Day" &&
    !date?.lateType &&
    !date?.earlyType &&
    date?.timeIn &&
    !["Leave", "Alpa", "Absent"].includes(date?.attendanceType);
  const hasLateWithoutReason =
    date?.dayType === "Work Day" &&
    (date?.attendanceType === "Attend" || date?.attendanceType === "Present") &&
    date?.late &&
    !date?.lateReason &&
    !date?.early &&
    !date?.earlyReason;
  const hasEarlyWithoutReason =
    date?.dayType === "Work Day" &&
    (date?.attendanceType === "Attend" || date?.attendanceType === "Present") &&
    date?.early &&
    !date?.earlyReason &&
    !date?.late &&
    !date?.lateReason;
  const hasLateAndEarlyWithoutReason =
    date?.late && date?.early && !date?.lateReason && !date?.earlyReason;
  const hasSubmittedLateReport = date?.lateType && !date?.earlyType;
  const hasSubmittedEarlyReport = date?.earlyType && !date?.lateType;
  const hasSubmittedLateNotEarly =
    date?.late && date?.lateReason && date?.early && !date?.earlyReason;
  const hasSubmittedEarlyNotLate =
    date?.early && date?.earlyReason && date?.late && !date?.lateReason;
  const hasSubmittedBothReports =
    date?.late && date?.early && date?.earlyReason && date?.lateReason;
  const hasSubmittedReportAlpa =
    (date?.attendanceType === "Sick" ||
      date?.attendanceType === "Other" ||
      date?.attendanceType === "Permit" ||
      date?.attendanceType === "Alpa" ||
      date?.attendanceType === "Absent") &&
    date?.attendanceReason &&
    date?.dayType === "Work Day";
  const notAttend = date?.attendanceType === "Absent";
  const notAttendPastDate =
    (!date?.dayType || !date?.attendanceType || !date?.attendanceReason) &&
    currentDate !== date?.date;
  const notClockOutNotLate =
    date?.attendanceType === "Present" &&
    !date?.late &&
    !date?.timeOut &&
    currentDate !== date?.date;
=======
    isWorkDay &&
    !date?.lateType &&
    !date?.earlyType &&
    date?.timeIn &&
    !["Leave", "Alpa"].includes(attendanceType);
  const hasLateWithoutReason = date?.lateType && !date?.lateReason && !date?.earlyType;
  const hasEarlyWithoutReason = date?.earlyType && !date?.earlyReason && !date?.lateType;
  const hasLateAndEarlyWithoutReason =
    date?.lateType && date?.earlyType && !date?.lateReason && !date?.earlyReason;
  const hasSubmittedLateReport = date?.lateType && date?.lateReason && !date?.earlyType;
  const hasSubmittedEarlyReport = date?.earlyType && date?.earlyReason && !date?.lateType;
  const hasSubmittedLateNotEarly =
    date?.lateType &&
    date?.lateReason &&
    date?.earlyType &&
    !date?.earlyReason &&
    !date?.earlyStatus;
  const hasSubmittedEarlyNotLate =
    date?.earlyType &&
    date?.earlyReason &&
    date?.lateType &&
    !date?.lateReason &&
    !date?.lateStatus;
  const hasSubmittedBothReports = date?.lateReason && date?.earlyReason;
  const hasSubmittedReportAlpa =
    ["Alpa", "Sick", "Other"].includes(attendanceType) &&
    date?.attendanceReason &&
    isWorkDay;
  const notAttend =
    (attendanceType === "Alpa" &&
      isWorkDay &&
      date?.date !== currentDate &&
      !date?.attendanceReason) ||
    !isWorkDay;
  const isLeave = attendanceType === "Leave" || attendanceType === "Permit";

  /**
   *  Handle switch month on calendar
   */
  const switchMonthHandler = useCallback((newMonth) => {
    setFilter(newMonth);
  }, []);
>>>>>>> bcc914ea (fix: update unnecessary)

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
            approvalLate: item?.approval_late,
            approvalLateStatus: item?.approval_late?.status,
            approvalEarly: item?.approval_early,
            approvalEarlyStatus: item?.approval_early?.status,
            approvalClockOut: item?.approval_forgot_clock_out,
            approvalClockOutStatus: item?.approval_forgot_clock_out?.status,
            approvalUnattendance: item?.approval_unattendance,
            approvalUnattendanceStatus: item?.approval_unattendance?.status,
            attendanceAttachment: item?.timesheet_attachment,
          },
        ];
      });

      setItems(dateList);
    }
  }, [attendance?.data]);

  const areAllDateConfirmed = (items) => {
    if (!items || Object.keys(items).length === 0) return false;

<<<<<<< HEAD
    return Object.values(items).every((dayArray) => {
      dayArray.every((item) => {
        if (item?.attendanceType === "Attend" || item?.attendanceType === "Present") {
          return item?.confirmation === 1;
        }
        return true;
=======
  const closeDateHandler = () => {
    setDate({});
    attendanceScreenSheetRef.current?.hide();
  };

  /**
   * Handle selected attendance attachment to delete
   * @param {*} id
   */
  const openDeleteAttachmentModalHandler = (id) => {
    setAttachmentId(id);
    toggleDeleteAttachment();
  };

  const handleRefresh = () => {
    refetchAttendanceData();
    refetchAttachment();
    refetchSickAttachment();
  };

  /**
   * Handle submit attendance report
   * @param {*} attendance_id
   * @param {*} data
   * @param {*} setSubmitting
   * @param {*} setStatus
   */
  const attendanceReportSubmitHandler = async (
    attendance_id,
    data,
    setSubmitting,
    setStatus
  ) => {
    try {
      await axiosInstance.patch(`/hr/timesheets/personal/${attendance_id}`, data);
      setRequestType("post");
      toggleAttendanceReportModal();
      refetchAttendanceData();
      refetchSickAttachment();
      setSubmitting(false);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setRequestType("error");
      toggleAttendanceReportModal();
      setSubmitting(false);
      setStatus("error");
    }
  };

  /**
   * Handle submit attendance attachment
   *
   * @param {*} data
   */
  const attachmentSubmitHandler = async (data, setSubmitting, setStatus) => {
    try {
      await axiosInstance.post(`/hr/timesheets/personal/attachments`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
>>>>>>> bcc914ea (fix: update unnecessary)
      });
    });
  };

<<<<<<< HEAD
  const allConfirmed = areAllDateConfirmed(items);
=======
  const deleteAttendanceAttachmentHandler = async () => {
    try {
      toggleDeleteAttendanceAttachment();
      await axiosInstance.delete(`/hr/timesheets/personal/attachments/${attachmentId}`);
      setRequestType("remove");
      toggleDeleteAttachment();
      refetchAttachment();
      refetchSickAttachment();
      toggleDeleteAttendanceAttachment();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggleDeleteAttendanceAttachment();
    }
  };
>>>>>>> bcc914ea (fix: update unnecessary)

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

<<<<<<< HEAD
  if (requestType === "remove") {
    renderAlertTitle = "Changes saved!";
  } else if (requestType === "post") {
    renderAlertTitle = "Attendance confirmed!";
  } else if (requestType === "patch") {
    renderAlertTitle = "Attachment submitted!";
  } else {
    renderAlertTitle = "Process error!";
  }
=======
        events.forEach((event) => {
          let backgroundColor = "";
          let textColor = "";
          const {
            attendanceType,
            dayType,
            early,
            late,
            confirmation,
            earlyReason,
            lateReason,
            earlyType,
            lateType,
            earlyStatus,
            lateStatus,
            attendanceReason,
            timeIn,
            timeOut,
          } = event;

          if (
            attendanceType === "Leave"
            // || dayType === "Weekend" || dayType === "Holiday" || dayType === "Day Off"
          ) {
            backgroundColor = dayOff.color;
            textColor = dayOff.textColor;
          } else if (
            (early && !earlyReason && !confirmation) ||
            (late && !lateReason && !confirmation) ||
            (attendanceType === "Alpa" && !attendanceReason && date !== currentDate) ||
            attendanceType === "Leave" ||
            dayType === "Weekend" ||
            dayType === "Holiday" ||
            dayType === "Day Off"
          ) {
            backgroundColor = reportRequired.color;
            textColor = reportRequired.textColor;
          } else if (
            (((early && earlyReason) || (late && lateReason)) && !confirmation) ||
            (late && lateReason && earlyType && !earlyReason && !earlyStatus) ||
            (early && earlyReason && lateType && !lateReason && !lateStatus) ||
            (attendanceType === "Permit" && attendanceReason) ||
            (attendanceType === "Alpa" && attendanceReason) ||
            (attendanceType === "Other" &&
              attendanceReason &&
              !confirmation &&
              date !== currentDate)
          ) {
            backgroundColor = submittedReport.color;
            textColor = submittedReport.textColor;
          } else if (attendanceType === "Sick" && attendanceReason) {
            backgroundColor = sick.color;
            textColor = sick.textColor;
          } else if (
            confirmation ||
            dayType === "Work Day" ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Alpa" &&
              !timeIn) ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Attend" &&
              timeIn &&
              timeOut) ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Attend" &&
              timeIn &&
              !timeOut) ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Alpa" &&
              !timeIn &&
              !timeOut)
          ) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
          }

          customStyles.container = {
            backgroundColor: backgroundColor,
            borderRadius: 5,
          };
          customStyles.text = {
            color: textColor,
          };
        });

        markedDates[date] = { customStyles };
      }
    }

    return (
      <Fragment>
        <Calendar
          onDayPress={updateAttendanceCheckAccess && toggleDateHandler}
          style={styles.calendar}
          current={currentDate}
          markingType="custom"
          markedDates={markedDates}
          onMonthChange={switchMonthHandler}
          theme={{
            arrowColor: "#000000",
            "stylesheet.calendar.header": {
              dayTextAtIndex0: { color: "#FF7272" },
              dayTextAtIndex6: { color: "#FF7272" },
            },
          }}
        />
      </Fragment>
    );
  };
>>>>>>> bcc914ea (fix: update unnecessary)

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
<<<<<<< HEAD
    <Screen
      screenTitle="My Attendance"
      backgroundColor={Colors.backgroundLight}
      childrenHeader={renderChildrenHeader}
    >
=======
    <Screen screenTitle="My Attendance">
>>>>>>> be4a15dd (chore:)
      <ScrollView
        refreshControl={
<<<<<<< HEAD
          <RefreshControl refreshing={handleDataRefreshing} onRefresh={handleRefresh} />
        }
      >
        <CustomCalendar
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
          endPeriod={dayjs(attendance?.period?.end_date).format("DD MMM YYYY")}
=======
          <RefreshControl
            refreshing={
              attendanceDataIsFetching && attachmentIsFetching && sickAttachmentIsFetching
            }
            onRefresh={handleRefresh}
          />
        }
      >
        <AttendanceCalendar renderCalendar={renderCalendarWithMultiDotMarking} />

        <AttendanceAttachment
          attachment={attachment}
          reference={attachmentScreenSheetRef}
          setAttachmentId={openDeleteAttachmentModalHandler}
          attachmentIsFetching={attachmentIsFetching}
          refetchAttachment={refetchAttachment}
          sickAttachment={sickAttachment?.data}
          sickAttachmentIsFetching={sickAttachmentIsFetching}
          refetchSickAttachment={refetchSickAttachment}
>>>>>>> bcc914ea (fix: update unnecessary)
        />
        <AttendanceColor />
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
        notAttendPastDate={notAttendPastDate}
        notAttend={notAttend}
        notClockOutNotLate={notClockOutNotLate}
        reference={attendanceScreenSheetRef}
        isOpen={attendanceReportModalIsOpen}
        toggle={toggleAttendanceReportModal}
        requestType={requestType}
        error={errorMessage}
        refetchAttendance={refetchAttendance}
        refetchAttachment={refetchSickAttachment}
        handleSubmitSickAttachment={handleSubmitAttachment}
        handleSelectFile={selectFile}
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        setRequestType={setRequestType}
        setError={setErrorMessage}
        toggleAlert={toggleAlert}
        toggleImage={togglePickImage}
        imageIsOpen={pickImageIsOpen}
        unattendanceDate={unattendanceDate}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        setSelectedPicture={setSelectedPicture}
        toggleFullScreen={toggleFullScreenImageHandler}
        currentDate={currentDate}
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
<<<<<<< HEAD
=======

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 10,
  },
});
>>>>>>> be4a15dd (chore:)
