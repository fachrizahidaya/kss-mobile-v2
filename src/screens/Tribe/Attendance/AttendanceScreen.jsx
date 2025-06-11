<<<<<<< HEAD
import { useCallback, useEffect, useRef } from "react";
=======
import { useState, useCallback, useEffect, useRef } from "react";
>>>>>>> 585b6620 (fix: attendance)
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { RefreshControl, ScrollView } from "react-native-gesture-handler";

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
import AttendanceColor from "../../../components/Tribe/Attendance/AttendanceColor";
import CustomCalendar from "../../../components/Tribe/Attendance/CustomCalendar";
import { toggleFullScreenImageHandler } from "../../../components/Tribe/Feed/shared/functions";

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
    attendance,
    attendanceIsFetching,
    refetchAttendance,
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
    pickImageIsOpen,
    togglePickImage,
    deleteAttachmentIsOpen,
    toggleDeleteAttachment,
    attendanceReportModalIsOpen,
    toggleAttendanceReportModal,
    attendanceAttachmentModalIsOpen,
    toggleAttendanceAttachmentModal,
    alertIsOpen,
    toggleAlert,
    toggleDate,
    handleCloseDate,
    isFullScreen,
    setIsFullScreen,
    setSelectedPicture,
  } = useAttendance();

  const firstTimeRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();

  const { unattendance } = route.params;

<<<<<<< HEAD
=======
  const attendanceScreenSheetRef = useRef(null);
  const attachmentScreenSheetRef = useRef(null);
  const firstTimeRef = useRef(null);

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

>>>>>>> 5ff79603 (fix:)
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
    {
      key: "leave",
      color: "#F97316",
      name: "Leave",
      textColor: Colors.fontLight,
    },
    { key: "sick", color: "#d6293a", name: "Sick", textColor: Colors.fontLight },
  ];
  const [allGood, reportRequired, submittedReport, dayOff, leave, sick] = statusTypes;

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
    !date?.lateReason;
  const hasEarlyWithoutReason =
    date?.dayType === "Work Day" &&
    (date?.attendanceType === "Attend" || date?.attendanceType === "Present") &&
    date?.early &&
    !date?.earlyReason;
  const hasLateAndEarlyWithoutReason =
    date?.late && date?.early && !date?.lateReason && !date?.earlyReason;
  const hasSubmittedLateReport = date?.lateType && date?.lateReason && !date?.earlyType;
  const hasSubmittedEarlyReport = date?.earlyType && date?.earlyReason && !date?.lateType;
  const hasSubmittedLateNotEarly =
    date?.late && date?.lateReason && date?.early && !date?.earlyReason;
  const hasSubmittedEarlyNotLate =
    date?.early && date?.earlyReason && date?.late && !date?.lateReason;
  const hasSubmittedBothReports = date?.late && date?.early;
  const hasSubmittedReportAlpa =
    (date?.attendanceType === "Sick" ||
      date?.attendanceType === "Other" ||
      date?.attendanceType === "Permit" ||
      date?.attendanceType === "Alpa" ||
      date?.attendanceType === "Absent") &&
    date?.attendanceReason &&
    date?.dayType === "Work Day";
  const notAttend =
    (date?.attendanceType === "Alpa" || date?.attendanceType === "Absent") &&
    date?.dayType === "Work Day" &&
    !date?.attendanceReason;
  const isLeave =
    (attendanceType === "Leave" && dayType !== "Holiday") || attendanceType === "Permit";
  const holiday = dayType === "Holiday";
  const holidayCutLeave =
    attendanceType === "Leave" && dayType === "Holiday" && attendanceReason;
=======
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
   *  Handle switch month on calendar
   */
  const handleSwitchMonth = useCallback((newMonth) => {
    setFilter(newMonth);
  }, []);
>>>>>>> 5ff79603 (fix:)

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

<<<<<<< HEAD
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
=======
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

  /**
   * Handle selected attendance attachment to delete
   * @param {*} id
   */
  const handleOpenDeleteAttachmentModal = (id) => {
    setAttachmentId(id);
    toggleDeleteAttachment();
  };
>>>>>>> 585b6620 (fix: attendance)

<<<<<<< HEAD
  if (requestType === "remove") {
    renderAlertTitle = "Changes saved!";
  } else if (requestType === "post") {
    renderAlertTitle = "Attendance confirmed!";
  } else {
    renderAlertTitle = "Process error!";
  }
=======
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
  const handleSubmitReport = async (attendance_id, data, setSubmitting, setStatus) => {
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
  const handleSubmitAttachment = async (data, setSubmitting, setStatus) => {
    try {
      await axiosInstance.post(`/hr/timesheets/personal/attachments`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setRequestType("post");
      toggleAttendanceAttachmentModal();
      refetchAttachment();
      refetchSickAttachment();
      setStatus("success");
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      setRequestType("error");
      toggleAttendanceAttachmentModal();
      setStatus("error");
      setSubmitting(false);
    }
  };

  const handleDeleteAttachment = async () => {
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

  const handleHasMonthPassedCheck = (year, month) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear) {
      setHasMonthPassed(true);
    } else if (year === currentYear && month < currentMonth) {
      setHasMonthPassed(true);
    } else {
      setHasMonthPassed(false);
    }
  };

<<<<<<< HEAD
  /**
   * Handle marked dates on AttendanceCalendar
   * @returns
   */
  const renderCalendarWithMultiDotMarking = () => {
    const markedDates = {};

    for (const date in items) {
      if (items.hasOwnProperty(date)) {
        const events = items[date];
        const customStyles = {};

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
>>>>>>> 5ff79603 (fix:)

=======
>>>>>>> 585b6620 (fix: attendance)
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
      refetchAttendance();
      refetchAttachment();
    }, [refetchAttendance, refetchAttachment])
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
<<<<<<< HEAD
              attendanceIsFetching && attachmentIsFetching && sickAttachmentIsFetching
=======
              attendanceDataIsFetching && attachmentIsFetching && sickAttachmentIsFetching
>>>>>>> 5ff79603 (fix:)
            }
            onRefresh={handleRefresh}
          />
        }
      >
<<<<<<< HEAD
<<<<<<< HEAD
        {/* <AttendanceCalendar
=======
        <AttendanceCalendar
>>>>>>> 585b6620 (fix: attendance)
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
<<<<<<< HEAD
        /> */}
=======
        />
>>>>>>> 585b6620 (fix: attendance)

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
        />
        <AttendanceColor />
=======
        <AttendanceCalendar renderCalendar={renderCalendarWithMultiDotMarking} />
>>>>>>> 5ff79603 (fix:)

        {/* <AttendanceAttachment
          attachment={attachment}
          reference={attachmentScreenSheetRef}
<<<<<<< HEAD
          setAttachmentId={handleOpenDeleteAttachment}
=======
          setAttachmentId={handleOpenDeleteAttachmentModal}
>>>>>>> 585b6620 (fix: attendance)
          attachmentIsFetching={attachmentIsFetching}
          refetchAttachment={refetchAttachment}
          sickAttachment={sickAttachment?.data}
          sickAttachmentIsFetching={sickAttachmentIsFetching}
          refetchSickAttachment={refetchSickAttachment}
          navigation={navigation}
        /> */}
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
<<<<<<< HEAD
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
=======
>>>>>>> 585b6620 (fix: attendance)
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
