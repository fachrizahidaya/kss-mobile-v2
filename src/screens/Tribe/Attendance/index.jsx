<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6d058444 (feat: attendance)
import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
=======
import { useState, useCallback, useEffect, useRef } from "react";
<<<<<<< HEAD
import { useFocusEffect } from "@react-navigation/native";
>>>>>>> 585b6620 (fix: attendance)
=======
import { useFocusEffect, useNavigation } from "@react-navigation/native";
>>>>>>> c7367e02 (fix:)
import dayjs from "dayjs";

<<<<<<< HEAD
<<<<<<< HEAD
import { Text } from "react-native";
=======
import { StyleSheet, Text } from "react-native";
>>>>>>> d3d4ef0a (fix:)
=======
import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { Text } from "react-native";
>>>>>>> 859eea89 (first commit)
=======
import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { Text } from "react-native";
>>>>>>> c3ae17e7 (new branch)
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useAttendance } from "./hooks/useAttendance";
import { selectFile } from "../../../styles/buttons/SelectFIle";
import { toggleFullScreenImageHandler } from "../../../components/Tribe/Feed/shared/functions";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { Text } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useAttendance } from "./hooks/useAttendance";
import { selectFile } from "../../../styles/buttons/SelectFIle";
import { toggleFullScreenImageHandler } from "../../../components/Tribe/Feed/shared/functions";
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
import AttendanceCalendar from "../../../components/Tribe/Attendance/AttendanceCalendar";
>>>>>>> 6d058444 (feat: attendance)
import AttendanceForm from "../../../components/Tribe/Attendance/AttendanceForm";
<<<<<<< HEAD
=======
import AddAttendanceAttachment from "../../../components/Tribe/Attendance/AddAttendanceAttachment";
import AttendanceAttachment from "../../../components/Tribe/Attendance/AttendanceAttachment";
>>>>>>> 5ff79603 (fix:)
=======
import AttendanceForm from "../../../components/Tribe/Attendance/AttendanceForm";
>>>>>>> a64ff286 (fix: sick)
import AlertModal from "../../../styles/modals/AlertModal";
import RemoveConfirmationModal from "../../../styles/modals/RemoveConfirmationModal";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import FormButton from "../../../styles/buttons/FormButton";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
import ImageFullScreenModal from "../../../styles/modals/ImageFullScreenModal";
import styles from "./Attendance.styles";
import CustomCalendar from "../../../components/Tribe/Attendance/CustomCalendar";
import AttendanceColor from "../../../components/Tribe/Attendance/AttendanceColor";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d3d4ef0a (fix:)
=======
import Reminder from "../../../components/Tribe/Reminder/Reminder";
import PickImage from "../../../styles/buttons/PickImage";
>>>>>>> 859eea89 (first commit)
=======
import Reminder from "../../../components/Tribe/Reminder/Reminder";
import PickImage from "../../../styles/buttons/PickImage";
>>>>>>> c3ae17e7 (new branch)
=======
>>>>>>> a64ff286 (fix: sick)

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
import ImageFullScreenModal from "../../../styles/modals/ImageFullScreenModal";
import styles from "./Attendance.styles";
import CustomCalendar from "../../../components/Tribe/Attendance/CustomCalendar";
import AttendanceColor from "../../../components/Tribe/Attendance/AttendanceColor";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";
import Reminder from "../../../components/Tribe/Reminder/Reminder";
import PickImage from "../../../styles/buttons/PickImage";

const Attendance = () => {
<<<<<<< HEAD
  const [filter, setFilter] = useState({
    month: dayjs().format("M"),
    year: dayjs().format("YYYY"),
  });
  const [items, setItems] = useState({});
  const [date, setDate] = useState({});
  const [fileAttachment, setFileAttachment] = useState(null);
  const [attachmentId, setAttachmentId] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [hasMonthPassed, setHasMonthPassed] = useState(false);
  const [unattendanceDate, setUnattendanceDate] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
>>>>>>> c7367e02 (fix:)
=======
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
>>>>>>> 6d058444 (feat: attendance)

  const firstTimeRef = useRef(null);
<<<<<<< HEAD
<<<<<<< HEAD
  const navigation = useNavigation();
=======

=======
>>>>>>> 980d4a4f (fix: attendance)
  const navigation = useNavigation();

<<<<<<< HEAD
  const { isOpen: attendanceReportModalIsOpen, toggle: toggleAttendanceReportModal } =
    useDisclosure(false);
  const {
    isOpen: attendanceAttachmentModalIsOpen,
    toggle: toggleAttendanceAttachmentModal,
  } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
<<<<<<< HEAD

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
=======
=======

  const firstTimeRef = useRef(null);
  const navigation = useNavigation();
>>>>>>> c3ae17e7 (new branch)

  const firstTimeRef = useRef(null);
  const navigation = useNavigation();
>>>>>>> 859eea89 (first commit)

  const { data: confirmationStatus } = useFetch(
    `/hr/timesheets/personal/confirm-status`,
    [filter],
    filter
  );
=======
  const { isOpen: confirmationIsOpen, toggle: toggleConfirmation } = useDisclosure(false);
>>>>>>> 6d058444 (feat: attendance)

=======
>>>>>>> d6d8c50d (fix:)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 44e387b9 (fix: calendar)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
      key: "leave",
      color: "#F97316",
      name: "Leave",
      textColor: Colors.fontLight,
    },
    {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bcc914ea (fix: update unnecessary)
=======
>>>>>>> 44e387b9 (fix: calendar)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
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
>>>>>>> 5ff79603 (fix:)
  const hasClockInAndOut =
<<<<<<< HEAD
=======
  const hasClockInAndOut =
>>>>>>> d6d8c50d (fix:)
=======
  const hasClockInAndOut =
>>>>>>> 859eea89 (first commit)
=======
  const hasClockInAndOut =
>>>>>>> c3ae17e7 (new branch)
    date?.dayType === "Work Day" &&
    !date?.lateType &&
    !date?.earlyType &&
    date?.timeIn &&
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    !["Leave", "Alpa", "Absent"].includes(date?.attendanceType);
=======
    !["Leave", "Alpa"].includes(date?.attendanceType);
>>>>>>> d6d8c50d (fix:)
=======
    !["Leave", "Alpa", "Absent"].includes(date?.attendanceType);
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
    !["Leave", "Alpa", "Absent"].includes(date?.attendanceType);
>>>>>>> 859eea89 (first commit)
=======
    !["Leave", "Alpa", "Absent"].includes(date?.attendanceType);
>>>>>>> c3ae17e7 (new branch)
  const hasLateWithoutReason =
    date?.dayType === "Work Day" &&
    (date?.attendanceType === "Attend" || date?.attendanceType === "Present") &&
    date?.late &&
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    !date?.lateReason &&
    !date?.early &&
    !date?.earlyReason;
=======
    !date?.lateReason;
>>>>>>> d6d8c50d (fix:)
=======
    !date?.lateReason &&
    !date?.early &&
    !date?.earlyReason;
>>>>>>> 40c1e0d2 (fix: form attendance)
=======
    !date?.lateReason &&
    !date?.early &&
    !date?.earlyReason;
>>>>>>> 859eea89 (first commit)
=======
    !date?.lateReason &&
    !date?.early &&
    !date?.earlyReason;
>>>>>>> c3ae17e7 (new branch)
  const hasEarlyWithoutReason =
    date?.dayType === "Work Day" &&
    (date?.attendanceType === "Attend" || date?.attendanceType === "Present") &&
    date?.early &&
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    !date?.earlyReason &&
    !date?.late &&
    !date?.lateReason;
  const hasLateAndEarlyWithoutReason =
    date?.late && date?.early && !date?.lateReason && !date?.earlyReason;
  const hasSubmittedLateReport = date?.lateType && !date?.earlyType;
  const hasSubmittedEarlyReport = date?.earlyType && !date?.lateType;
<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
  const notClockOutNotLate =
    date?.attendanceType === "Present" &&
    !date?.late &&
    !date?.timeOut &&
    currentDate !== date?.date;
=======
    isWorkDay &&
    !lateType &&
    !earlyType &&
    timeIn &&
    !["Leave", "Alpa"].includes(attendanceType);
  const hasLateWithoutReason = lateType && !lateReason && !earlyType;
  const hasEarlyWithoutReason = earlyType && !earlyReason && !lateType;
=======
    !date?.earlyReason;
>>>>>>> d6d8c50d (fix:)
=======
    !date?.earlyReason &&
    !date?.late &&
    !date?.lateReason;
>>>>>>> 40c1e0d2 (fix: form attendance)
=======
    !date?.earlyReason &&
    !date?.late &&
    !date?.lateReason;
>>>>>>> 859eea89 (first commit)
=======
    !date?.earlyReason &&
    !date?.late &&
    !date?.lateReason;
>>>>>>> c3ae17e7 (new branch)
  const hasLateAndEarlyWithoutReason =
    date?.late && date?.early && !date?.lateReason && !date?.earlyReason;
  const hasSubmittedLateReport = date?.lateType && date?.lateReason && !date?.earlyType;
  const hasSubmittedEarlyReport = date?.earlyType && date?.earlyReason && !date?.lateType;
<<<<<<< HEAD
=======
>>>>>>> 72fb5f5b (chore: adjustment for conflict)
=======
>>>>>>> c3ae17e7 (new branch)
=======
>>>>>>> c0cd712b (fix: form attendance late, forgot clock out)
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
<<<<<<< HEAD
  const notAttend =
    (date?.attendanceType === "Alpa" || date?.attendanceType === "Absent") &&
    date?.dayType === "Work Day" &&
    !date?.attendanceReason;
<<<<<<< HEAD
  const notClockOutNotLate = !date?.late && !date?.timeOut;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const notClockOutNotLate = !date?.late && !date?.timeOut && currentDate !== date?.date;
>>>>>>> f9738b6c (fix: attendance form)
=======
  const notAttend = date?.attendanceType === "Absent";
  const notAttendPastDate = !date?.attendanceReason && currentDate !== date?.date;
=======
>>>>>>> 26543521 (fix: attendance form, calendar)
  const notClockOutNotLate =
    date?.attendanceType === "Present" &&
    !date?.late &&
    !date?.timeOut &&
    currentDate !== date?.date;
>>>>>>> 7eaba9c3 (fix: attendance form)

  /**
<<<<<<< HEAD
   *  Handle switch month on calendar
   */
  const handleSwitchMonth = useCallback((newMonth) => {
    setFilter(newMonth);
  }, []);
>>>>>>> bcc914ea (fix: update unnecessary)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)

  /**
=======
>>>>>>> 6d058444 (feat: attendance)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
            approvalLate: item?.approval_late,
            approvalLateStatus: item?.approval_late?.status,
            approvalEarly: item?.approval_early,
            approvalEarlyStatus: item?.approval_early?.status,
            approvalClockOut: item?.approval_forgot_clock_out,
            approvalClockOutStatus: item?.approval_forgot_clock_out?.status,
            approvalUnattendance: item?.approval_unattendance,
            approvalUnattendanceStatus: item?.approval_unattendance?.status,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            attendanceAttachment: item?.timesheet_attachment,
=======
>>>>>>> 44e387b9 (fix: calendar)
=======
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
            attendanceAttachment: item?.timesheet_attachment,
>>>>>>> 980d4a4f (fix: attendance)
=======
            attendanceAttachment: item?.timesheet_attachment,
>>>>>>> 859eea89 (first commit)
=======
            attendanceAttachment: item?.timesheet_attachment,
>>>>>>> c3ae17e7 (new branch)
          },
        ];
      });

      setItems(dateList);
    }
  }, [attendance?.data]);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const areAllDateConfirmed = (items) => {
    if (!items || Object.keys(items).length === 0) return false;

<<<<<<< HEAD
=======
  const areAllDateConfirmed = (items) => {
    if (!items || Object.keys(items).length === 0) return false;

>>>>>>> 44b507a7 (fix: double check for the confirm attendance)
    return Object.values(items).every((dayArray) => {
      dayArray.every((item) => {
        if (item?.attendanceType === "Attend" || item?.attendanceType === "Present") {
          return item?.confirmation === 1;
        }
        return true;
<<<<<<< HEAD
=======
  const closeDateHandler = () => {
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
>>>>>>> 33ce77b1 (fix:)
    setDate({});
    attendanceScreenSheetRef.current?.hide();
  };

  const handleDataRefreshing =
    attachmentIsFetching && attachmentIsFetching && sickAttachmentIsFetching;

<<<<<<< HEAD
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
<<<<<<< HEAD
        headers: {
          "content-type": "multipart/form-data",
        },
>>>>>>> bcc914ea (fix: update unnecessary)
=======
        headers: { "content-type": "multipart/form-data" },
>>>>>>> e65faeba (fix: attendance)
      });
<<<<<<< HEAD
    });
=======
      setRequestType("post");
      toggleAttendanceAttachmentModal();
      setStatus("success");
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      setRequestType("error");
      toggleAttendanceAttachmentModal();
      setStatus("error");
      setSubmitting(false);
    }
>>>>>>> e5a0993b (fix: attendance reason)
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const allConfirmed = areAllDateConfirmed(items);
=======
  const deleteAttendanceAttachmentHandler = async () => {
=======
  const handleDeleteAttachment = async () => {
>>>>>>> 33ce77b1 (fix:)
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

=======
>>>>>>> 6d058444 (feat: attendance)
=======
>>>>>>> d6d8c50d (fix:)
=======
      });
    });
  };
=======
  const areAllDateConfirmed = (items) => {
    if (!items || Object.keys(items).length === 0) return false;

    return Object.values(items).every((dayArray) => {
      dayArray.every((item) => {
        if (item?.attendanceType === "Attend" || item?.attendanceType === "Present") {
          return item?.confirmation === 1;
        }
        return true;
      });
    });
  };
=======
  const areAllDateConfirmed = (items) => {
    if (!items || Object.keys(items).length === 0) return false;

    return Object.values(items).every((dayArray) => {
      dayArray.every((item) => {
        if (item?.attendanceType === "Attend" || item?.attendanceType === "Present") {
          return item?.confirmation === 1;
        }
        return true;
      });
    });
  };

  const allConfirmed = areAllDateConfirmed(items);

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
>>>>>>> c3ae17e7 (new branch)

  const allConfirmed = areAllDateConfirmed(items);

  const renderChildrenHeader = (
    <FormButton
      onPress={toggleConfirmation}
      isSubmitting={null}
      disabled={!hasMonthPassed || (confirmationStatus?.data?.confirm && allConfirmed)}
    >
      <Text style={styles.confirmButtonText}>
        {confirmationStatus?.data?.confirm && allConfirmed
          ? "Attendance Confirmed"
          : "Confirm Attendance"}
      </Text>
    </FormButton>
  );
>>>>>>> 859eea89 (first commit)

  const allConfirmed = areAllDateConfirmed(items);

>>>>>>> 44b507a7 (fix: double check for the confirm attendance)
  const renderChildrenHeader = (
    <FormButton
      onPress={toggleConfirmation}
      isSubmitting={null}
      disabled={!hasMonthPassed || (confirmationStatus?.data?.confirm && allConfirmed)}
    >
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d64fa295 (fix: calendar)
      <Text style={styles.confirmButtonText}>
        {confirmationStatus?.data?.confirm && allConfirmed
          ? "Attendance Confirmed"
          : "Confirm Attendance"}
      </Text>
    </FormButton>
  );

  var renderAlertType;

<<<<<<< HEAD
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

          if (attendanceType === "Leave") {
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
=======
      <Text style={styles.confirmButtonText}>Confirm Attendance</Text>
    </FormButton>
  );
>>>>>>> 6d058444 (feat: attendance)

    return (
      <Fragment>
        <Calendar
          onDayPress={updateAttendanceCheckAccess && toggleDate}
          style={styles.calendar}
          current={currentDate}
          markingType="custom"
          markedDates={markedDates}
          onMonthChange={handleSwitchMonth}
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
=======
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
  } else if (requestType === "patch") {
    renderAlertTitle = "Attachment submitted!";
  } else {
    renderAlertTitle = "Process error!";
  }
>>>>>>> f12fe282 (fix: attendance form)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
    <Screen
      screenTitle="My Attendance"
      backgroundColor={Colors.backgroundLight}
      childrenHeader={renderChildrenHeader}
    >
<<<<<<< HEAD
<<<<<<< HEAD
=======
    <Screen screenTitle="My Attendance">
>>>>>>> be4a15dd (chore:)
=======
    <Screen screenTitle="My Attendance" backgroundColor={Colors.backgroundLight}>
>>>>>>> 6743d47c (fix: background attendance)
=======
    <Screen screenTitle="My Attendance" backgroundColor={Colors.backgroundLight}>
>>>>>>> 8b45d237 (fix: background)
=======
    <Screen
      screenTitle="My Attendance"
      backgroundColor={Colors.backgroundLight}
      childrenHeader={renderChildrenHeader}
    >
>>>>>>> d3d4ef0a (fix:)
      <ScrollView
        refreshControl={
<<<<<<< HEAD
<<<<<<< HEAD
          <RefreshControl refreshing={handleDataRefreshing} onRefresh={handleRefresh} />
        }
      >
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
          <RefreshControl refreshing={handleDataRefreshing} onRefresh={handleRefresh} />
>>>>>>> 6d058444 (feat: attendance)
        }
      >
        {/* <AttendanceCalendar
=======
        <AttendanceCalendar
>>>>>>> 44e387b9 (fix: calendar)
=======
        {/* <AttendanceCalendar
>>>>>>> 322b3182 (fix:)
=======
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={handleDataRefreshing} onRefresh={handleRefresh} />
        }
      >
<<<<<<< HEAD
        {/* <AttendanceCalendar
>>>>>>> 859eea89 (first commit)
=======
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={handleDataRefreshing} onRefresh={handleRefresh} />
        }
      >
        {/* <AttendanceCalendar
>>>>>>> c3ae17e7 (new branch)
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
        /> */}
=======
>>>>>>> a64ff286 (fix: sick)
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
<<<<<<< HEAD
        {/* {sickAttachment?.data?.length > 0 ? (
          <Reminder
            data={sickAttachment?.data}
            isFetching={sickAttachmentIsFetching}
            refetch={refetchSickAttachment}
            forSick={true}
          />
        ) : null} */}

        {/* <AttendanceAttachment
          attachment={attachment}
          reference={attachmentScreenSheetRef}
          setAttachmentId={handleOpenDeleteAttachment}
          attachmentIsFetching={attachmentIsFetching}
          refetchAttachment={refetchAttachment}
          sickAttachment={sickAttachment?.data}
          sickAttachmentIsFetching={sickAttachmentIsFetching}
          refetchSickAttachment={refetchSickAttachment}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> bcc914ea (fix: update unnecessary)
=======
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
          navigation={navigation}
          toggleAlert={toggleAlert}
          setRequest={setRequestType}
          setError={setErrorMessage}
          handleToggleImage={toggleFullScreenImageHandler}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          setSelectedPicture={setSelectedPicture}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> c7367e02 (fix:)
=======
          confirmationStatus={confirmationStatus?.data?.confirm}
<<<<<<< HEAD
>>>>>>> d6d8c50d (fix:)
=======
          confirmationStatus={confirmationStatus?.data?.confirm}
>>>>>>> 859eea89 (first commit)
=======
          confirmationStatus={confirmationStatus?.data?.confirm}
>>>>>>> c3ae17e7 (new branch)
        />
        <AttendanceColor />
=======
        /> */}
>>>>>>> 7eaba9c3 (fix: attendance form)
=======
>>>>>>> a64ff286 (fix: sick)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        notClockOutNotLate={notClockOutNotLate}
=======
        isLeave={isLeave}
        holidayCutLeave={holidayCutLeave}
        holiday={holiday}
        CURRENT_DATE={currentDate}
>>>>>>> 5ff79603 (fix:)
=======
>>>>>>> d6d8c50d (fix:)
=======
        notClockOutNotLate={notClockOutNotLate}
>>>>>>> 40c1e0d2 (fix: form attendance)
=======
        notClockOutNotLate={notClockOutNotLate}
>>>>>>> 859eea89 (first commit)
=======
        notClockOutNotLate={notClockOutNotLate}
>>>>>>> c3ae17e7 (new branch)
        reference={attendanceScreenSheetRef}
        isOpen={attendanceReportModalIsOpen}
        toggle={toggleAttendanceReportModal}
        requestType={requestType}
        error={errorMessage}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        refetchAttendance={refetchAttendance}
        refetchAttachment={refetchSickAttachment}
        handleSubmitSickAttachment={handleSubmitAttachment}
<<<<<<< HEAD
=======
        refetchAttendance={refetchAttendanceData}
=======
        refetchAttendance={refetchAttendance}
>>>>>>> 6d058444 (feat: attendance)
        refetchAttachment={refetchSickAttachment}
=======
=======
        refetchAttendance={refetchAttendance}
        refetchAttachment={refetchSickAttachment}
        handleSubmitSickAttachment={handleSubmitAttachment}
=======
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

<<<<<<< HEAD
<<<<<<< HEAD
      <AddAttendanceAttachment
>>>>>>> c3ae17e7 (new branch)
=======
      {/* <AddAttendanceAttachment
>>>>>>> 7eaba9c3 (fix: attendance form)
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

      <AddAttendanceAttachment
>>>>>>> 859eea89 (first commit)
        handleSelectFile={selectFile}
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
        setRequestType={setRequestType}
        setError={setErrorMessage}
        toggleAlert={toggleAlert}
        toggleImage={togglePickImage}
        imageIsOpen={pickImageIsOpen}
        unattendanceDate={unattendanceDate}
<<<<<<< HEAD
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        setSelectedPicture={setSelectedPicture}
        toggleFullScreen={toggleFullScreenImageHandler}
>>>>>>> 980d4a4f (fix: attendance)
      />

      <AddAttendanceAttachment
>>>>>>> e5a0993b (fix: attendance reason)
        handleSelectFile={selectFile}
        fileAttachment={fileAttachment}
        setFileAttachment={setFileAttachment}
<<<<<<< HEAD
=======
        handleSubmit={handleSubmitAttachment}
        reference={attachmentScreenSheetRef}
        isOpen={attendanceAttachmentModalIsOpen}
        toggle={toggleAttendanceAttachmentModal}
        requestType={requestType}
        error={errorMessage}
>>>>>>> 33ce77b1 (fix:)
        setRequestType={setRequestType}
        setError={setErrorMessage}
        toggleAlert={toggleAlert}
        toggleImage={togglePickImage}
        imageIsOpen={pickImageIsOpen}
        unattendanceDate={unattendanceDate}
<<<<<<< HEAD
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
=======
        refetchAttachment={refetchAttachment}
        refetchSickAttachment={refetchSickAttachment}
<<<<<<< HEAD
>>>>>>> e5a0993b (fix: attendance reason)
      />

      <ImageFullScreenModal
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        file_path={selectedPicture}
        setSelectedPicture={setSelectedPicture}
      />

      <ImageFullScreenModal
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        file_path={selectedPicture}
        setSelectedPicture={setSelectedPicture}
      />
=======
      /> */}
>>>>>>> 7eaba9c3 (fix: attendance form)

=======
>>>>>>> a64ff286 (fix: sick)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 10,
  },
});
>>>>>>> be4a15dd (chore:)
=======
>>>>>>> 6d058444 (feat: attendance)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
