import { useState, useCallback, useRef } from "react";
import dayjs from "dayjs";

import { useFetch } from "../../../../hooks/useFetch";
import { useLoading } from "../../../../hooks/useLoading";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import useCheckAccess from "../../../../hooks/useCheckAccess";
import axiosInstance from "../../../../config/api";

export const useAttendance = () => {
  const [filter, setFilter] = useState({
    month: dayjs().format("M"),
    year: dayjs().format("YYYY"),
  });
  const [items, setItems] = useState({});
  const [date, setDate] = useState({});
  const [fileAttachment, setFileAttachment] = useState(null);
  const [attachmentSelected, setAttachmentSelected] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [hasMonthPassed, setHasMonthPassed] = useState(false);
  const [unattendanceDate, setUnattendanceDate] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [attendanceId, setAttendanceId] = useState(null);

  const currentDate = dayjs().format("YYYY-MM-DD");

  const attendanceScreenSheetRef = useRef(null);
  const attachmentScreenSheetRef = useRef(null);

  const updateAttendanceCheckAccess = useCheckAccess("update", "Attendance");

  const { isOpen: deleteAttachmentIsOpen, toggle: toggleDeleteAttachment } =
    useDisclosure(false);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d6d8c50d (fix:)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  const { isOpen: attendanceReportModalIsOpen, toggle: toggleAttendanceReportModal } =
    useDisclosure(false);
  const {
    isOpen: attendanceAttachmentModalIsOpen,
    toggle: toggleAttendanceAttachmentModal,
  } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { isOpen: confirmationIsOpen, toggle: toggleConfirmation } = useDisclosure(false);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const { toggle: togglePickImage, isOpen: pickImageIsOpen } = useDisclosure(false);
=======
>>>>>>> 6d058444 (feat: attendance)
=======
>>>>>>> d6d8c50d (fix:)
=======
  const { toggle: togglePickImage, isOpen: pickImageIsOpen } = useDisclosure(false);
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
  const { toggle: togglePickImage, isOpen: pickImageIsOpen } = useDisclosure(false);
>>>>>>> 859eea89 (first commit)
=======
  const { toggle: togglePickImage, isOpen: pickImageIsOpen } = useDisclosure(false);
>>>>>>> c3ae17e7 (new branch)

  const {
    toggle: toggleDeleteAttendanceAttachment,
    isLoading: deleteAttendanceAttachmentIsLoading,
  } = useLoading(false);

  const {
    data: attendance,
    isFetching: attendanceIsFetching,
    refetch: refetchAttendance,
  } = useFetch(`/hr/timesheets/personal`, [filter], filter);

  const {
    data: attachment,
    isFetching: attachmentIsFetching,
    refetch: refetchAttachment,
  } = useFetch(`/hr/timesheets/personal/attachments`, [filter], filter);

  const {
    data: attendanceById,
    isFetching: attendanceByIdIsFetching,
    refetch: refetchAttendanceById,
  } = useFetch(`/hr/timesheets/personal/${attendanceId}`);

  const {
    data: sickAttachment,
    isFetching: sickAttachmentIsFetching,
    refetch: refetchSickAttachment,
  } = useFetch(`/hr/timesheets/personal/attachment-required`, [filter], filter);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d6d8c50d (fix:)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  const {
    data: confirmationStatus,
    refetch: refetchConfirmationStatus,
    isFetching: confirmationStatusIsFetching,
  } = useFetch(`/hr/timesheets/personal/confirm-status`, [filter], filter);

  const { data: approval } = useFetch(`/hr/workflows`);

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
            item?.confirmation ||
            item?.dayType === "Day Off" ||
            item?.dayType === "Holiday" ||
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            item?.attendanceType === "Leave" ||
            (item?.timeIn &&
              item?.timeOut &&
              !item?.late &&
              !item?.early &&
              item?.dayType)
=======
            item?.attendanceType === "Leave"
>>>>>>> d6d8c50d (fix:)
=======
            item?.attendanceType === "Leave" ||
            (!item?.late && !item?.early && item?.attendanceType === "Present")
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
            item?.attendanceType === "Leave"
            // ||
            // (!item?.late && !item?.early && item?.attendanceType === "Present")
>>>>>>> 40c1e0d2 (fix: form attendance)
=======
            item?.attendanceType === "Leave" ||
            (item?.attendanceType === "Absent" &&
              item?.date === dayjs().format("YYYY-MM-DD"))
>>>>>>> eac86091 (fix: attendance calendar)
=======
            item?.attendanceType === "Leave" ||
            (item?.attendanceType === "Absent" &&
              item?.date === dayjs().format("YYYY-MM-DD"))
>>>>>>> 859eea89 (first commit)
=======
            item?.attendanceType === "Leave" ||
            (item?.attendanceType === "Absent" &&
              item?.date === dayjs().format("YYYY-MM-DD"))
>>>>>>> c3ae17e7 (new branch)
=======
            item?.attendanceType === "Leave"
>>>>>>> 7eaba9c3 (fix: attendance form)
          ) {
            return null;
          } else {
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const { data: confirmationStatus } = useFetch(
    `/hr/timesheets/personal/confirm-status`,
    [filter],
    filter
  );
>>>>>>> 6d058444 (feat: attendance)
=======
>>>>>>> d6d8c50d (fix:)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)

  const handleSwitchMonth = useCallback((newMonth) => {
    setFilter(newMonth);
  }, []);

  const handleHasMonthPassedCheck = (year, month) => {
    const current = new Date();
    // Start date is the 22nd of the previous month
    const startDate = new Date(year, month - 2, 22); // Month - 2 because JS Date is 0-indexed
    // End date is the 21st of the selected month
    const endDate = new Date(year, month - 1, 21);
    const isPassed = current > endDate;

    setHasMonthPassed(
      // year < current.getFullYear() ||
      //   (year === current.getFullYear() && month < current.getMonth() + 1)
      isPassed
    );
  };

  const handleSubmitReport = async (attendance_id, data, setSubmitting, setStatus) => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await axiosInstance.post(
        `/hr/timesheets/personal/${attendance_id}`,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
=======
      const res = await axiosInstance.patch(
        `/hr/timesheets/personal/${attendance_id}`,
        data
>>>>>>> 7dd4799c (fix: went home early)
      );
      setRequestType("patch");
=======
      await axiosInstance.patch(`/hr/timesheets/personal/${attendance_id}`, data);
<<<<<<< HEAD
      setRequestType("post");
>>>>>>> 6d058444 (feat: attendance)
=======
      setRequestType("patch");
>>>>>>> d6d8c50d (fix:)
=======
=======
>>>>>>> c3ae17e7 (new branch)
      const res = await axiosInstance.patch(
        `/hr/timesheets/personal/${attendance_id}`,
        data
      );
      setRequestType("patch");
<<<<<<< HEAD
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
      setStatus("success");
    } catch (err) {
      setRequestType("error");
      setErrorMessage(err.message);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAttachment = async (data, setSubmitting, setStatus) => {
    try {
      await axiosInstance.post(`/hr/timesheets/personal/attachments`, data, {
        headers: { "content-type": "multipart/form-data" },
      });
      setRequestType("post");
      setStatus("success");
    } catch (err) {
      setRequestType("error");
      setErrorMessage(err.message);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRefresh = () => {
    refetchAttendance();
    refetchAttachment();
    refetchSickAttachment();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    refetchConfirmationStatus();
=======
>>>>>>> 6d058444 (feat: attendance)
=======
    refetchConfirmationStatus();
>>>>>>> d6d8c50d (fix:)
=======
    refetchConfirmationStatus();
>>>>>>> 859eea89 (first commit)
=======
    refetchConfirmationStatus();
>>>>>>> c3ae17e7 (new branch)
  };

  const handleDeleteAttachment = async () => {
    try {
      toggleDeleteAttendanceAttachment();
      await axiosInstance.delete(
        `/hr/timesheets/personal/attachments/${attachmentSelected}`
      );
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

  const handleOpenDeleteAttachment = (id) => {
    setAttachmentSelected(id);
    toggleDeleteAttachment();
  };

  return {
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
    setUnattendanceDate,
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d6d8c50d (fix:)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
    toggleDate,
    handleCloseDate,
    handleDataRefreshing,
    attendanceReportModalIsOpen,
    toggleAttendanceReportModal,
    attendanceAttachmentModalIsOpen,
    toggleAttendanceAttachmentModal,
    alertIsOpen,
    toggleAlert,
    confirmationIsOpen,
    toggleConfirmation,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    pickImageIsOpen,
    togglePickImage,
=======
>>>>>>> 6d058444 (feat: attendance)
=======
>>>>>>> d6d8c50d (fix:)
=======
    pickImageIsOpen,
    togglePickImage,
>>>>>>> 7b5cd4cf (fix: attendance condition and form)
=======
    pickImageIsOpen,
    togglePickImage,
>>>>>>> 859eea89 (first commit)
=======
    pickImageIsOpen,
    togglePickImage,
>>>>>>> c3ae17e7 (new branch)
  };
};
