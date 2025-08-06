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

  const currentDate = dayjs().format("YYYY-MM-DD");

  const attendanceScreenSheetRef = useRef(null);
  const attachmentScreenSheetRef = useRef(null);

  const updateAttendanceCheckAccess = useCheckAccess("update", "Attendance");

  const { isOpen: deleteAttachmentIsOpen, toggle: toggleDeleteAttachment } =
    useDisclosure(false);

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
    data: sickAttachment,
    isFetching: sickAttachmentIsFetching,
    refetch: refetchSickAttachment,
  } = useFetch(`/hr/timesheets/personal/attachment-required`, [filter], filter);

  const { data: confirmationStatus } = useFetch(
    `/hr/timesheets/personal/confirm-status`,
    [filter],
    filter
  );

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
      await axiosInstance.patch(`/hr/timesheets/personal/${attendance_id}`, data);
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
  };
};
