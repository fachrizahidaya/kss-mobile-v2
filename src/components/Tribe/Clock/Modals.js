import dayjs from "dayjs";
import { Platform } from "react-native";

import AlertModal from "../../../styles/modals/AlertModal";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";
import ReasonModal from "./ReasonModal";

const Modals = ({
  attendanceModalIsopen,
  toggleAttendanceModal,
  attendanceReasonModalIsOpen,
  toggleAttendanceReasonModal,
  clockModalIsOpen,
  toggleClockModal,
  locationIsEmptyIsOpen,
  toggleLocationIsEmpty,
  alertIsOpen,
  toggleAlert,
  location,
  refetchAttendance,
  attendance,
  setResult,
  success,
  setSuccess,
  requestType,
  setRequestType,
  errorMessage,
  setErrorMessage,
  formik,
  earlyformik,
  earlyType,
  lateType,
  currentTime,
  result,
  workDuration,
  minimumDurationReached,
}) => {
  const renderBody = {
    longitude: location?.longitude,
    latitude: location?.latitude,
    check_from: "Mobile App",
  };

  const renderDescription = `Are you sure want to ${
    !attendance?.data?.time_in ? "Clock-in" : "Clock-out"
  }?`;

<<<<<<< HEAD
<<<<<<< HEAD
  const isEarly = result?.early && !result?.early_reason;
  const isLate = result?.late && !result?.late_reason && !isEarly;

=======
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
  const isEarly = result?.early && !result?.early_reason;
  const isLate = result?.late && !result?.late_reason && !isEarly;

>>>>>>> 1ebfb1f3 (fix: modal attendance, chat list)
  return (
    <>
      <ConfirmationModal
        isOpen={attendanceModalIsopen}
        toggle={toggleAttendanceModal}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3b2a7b99 (fix: reason clock in/out)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
        apiUrl={
          !attendance?.data?.time_in
            ? `/hr/timesheets/personal/clock-in`
            : `/hr/timesheets/personal/clock-out`
        }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        apiUrl={`/hr/timesheets/personal/attendance-check`}
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
>>>>>>> 3b2a7b99 (fix: reason clock in/out)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
        body={renderBody}
        hasSuccessFunc={true}
        onSuccess={refetchAttendance}
        description={renderDescription}
        isDelete={false}
        isGet={false}
        isPatch={false}
        toggleOtherModal={toggleClockModal}
        setResult={setResult}
        success={success}
        setSuccess={setSuccess}
        setRequestType={setRequestType}
        setError={setErrorMessage}
        formik={earlyformik}
        clockInOrOutTitle="Clock-out Time"
        types={earlyType}
        timeInOrOut={dayjs(currentTime).format("HH:mm")}
        title="Early Type"
        lateOrEarlyInputValue={earlyformik.values.early_reason}
        onOrOffDuty="Off Duty"
        timeDuty={attendance?.data?.off_duty || result?.off_duty}
        lateOrEarly={result?.early}
        lateOrEarlyType="Select Early Type"
        fieldType="early_type"
        lateOrEarlyInputType={earlyformik.values.early_type}
        fieldReason="early_reason"
        withoutSaveButton={true}
        withDuration={true}
        duration={workDuration}
        timeIn={attendance?.data?.time_in || result?.time_in}
        timeOut={result?.time_out}
        minimumDurationReached={minimumDurationReached}
        forAttendance={true}
      />

      <ReasonModal
        isOpen={attendanceReasonModalIsOpen}
        toggle={toggleAttendanceReasonModal}
        formik={formik}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        title={isLate ? "Late Type" : "Early Type"}
        types={isLate ? lateType : earlyType}
=======
        title={isLate ? "Late Type" : isEarly ? "Early Type" : ""}
        types={isLate ? lateType : isEarly ? earlyType : []}
>>>>>>> 1ebfb1f3 (fix: modal attendance, chat list)
=======
        title={isLate ? "Late Type" : isEarly ? "Early Type" : "Early Type"}
        types={isLate ? lateType : isEarly ? earlyType : earlyType}
>>>>>>> 3dbbfe35 (fix: early reason)
        timeInOrOut={isLate ? result?.time_in : result?.time_out}
        lateOrEarly={isLate ? result?.late : result?.early}
        timeDuty={isLate ? result?.on_duty : result?.off_duty}
        clockInOrOutTitle={isLate ? "Clock-in Time" : "Clock-out Time"}
        onOrOffDuty={isLate ? "On Duty" : "Off Duty"}
        lateOrEarlyType={isLate ? "Select Late Type" : "Select Early Type"}
        fieldType={isLate ? "late_type" : "early_type"}
        fieldReaason={isLate ? "late_reason" : "early_reason"}
<<<<<<< HEAD
        lateOrEarlyInputValue={
          isLate ? formik.values.late_reason : formik.values.early_reason
        }
        lateOrEarlyInputType={isLate ? formik.values.late_type : formik.values.early_type}
=======
        title={result?.late && !result?.late_reason ? "Late Type" : "Eearly Type"}
        types={result?.late && !result?.late_reason ? lateType : earlyType}
        timeInOrOut={
          result?.late && !result?.late_reason ? result?.time_in : result?.time_out
=======
        title={
          result?.late && !result?.late_reason && !result?.early
            ? "Late Type"
            : "Eearly Type"
        }
        types={
          result?.late && !result?.late_reason && !result?.early ? lateType : earlyType
        }
        timeInOrOut={
          result?.late && !result?.late_reason && !result?.early
            ? result?.time_in
            : result?.time_out
        }
        lateOrEarly={
          result?.late && !result?.late_reason && !result?.early
            ? result?.late
            : result?.early
>>>>>>> f9738b6c (fix: attendance form)
        }
        timeDuty={
          result?.late && !result?.late_reason && !result?.early
            ? result?.on_duty
            : result?.off_duty
        }
        clockInOrOutTitle={
          result?.late && !result?.late_reason && !result?.early
            ? "Clock-in Time"
            : "Clock-out Time"
        }
        onOrOffDuty={
          result?.late && !result?.late_reason && !result?.early ? "On Duty" : "Off Duty"
        }
        lateOrEarlyType={
          result?.late && !result?.late_reason && !result?.early
            ? "Select Late Type"
            : "Select Early Type"
        }
        fieldType={
          result?.late && !result?.late_reason && !result?.early
            ? "late_type"
            : "early_type"
        }
        fieldReaason={
          result?.late && !result?.late_reason && !result?.early
            ? "late_reason"
            : "early_reason"
        }
=======
>>>>>>> 1ebfb1f3 (fix: modal attendance, chat list)
        lateOrEarlyInputValue={
          isLate ? formik.values.late_reason : formik.values.early_reason
        }
<<<<<<< HEAD
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
        lateOrEarlyInputType={isLate ? formik.values.late_type : formik.values.early_type}
>>>>>>> 1ebfb1f3 (fix: modal attendance, chat list)
        toggleOtherModal={toggleAlert}
        notApplyDisable={false}
        withoutSaveButton={false}
      />

      <AlertModal
        isOpen={clockModalIsOpen}
        toggle={toggleClockModal}
        title={
          requestType === "post"
            ? `${
                Platform.OS === "android"
                  ? attendance?.data?.time_in
                    ? "Clock-in"
                    : "Clock-out"
                  : Platform.OS === "ios" && !result?.time_out
                  ? "Clock-in"
                  : "Clock-out"
              } success!`
            : "Process error!"
        }
        description={
          requestType === "post"
            ? `at ${
                Platform.OS === "android"
                  ? attendance?.data?.time_in
                    ? attendance?.data?.time_in
                    : attendance?.data?.time_out || dayjs().format("HH:mm")
                  : Platform.OS === "ios" && !result?.time_out
                  ? result?.time_in
                  : result?.time_out || dayjs().format("HH:mm")
              }`
            : errorMessage || "Please try again later"
        }
        color={
          Platform.OS === "android"
            ? attendance?.data?.time_in
              ? "#FCFF58"
              : "#92C4FF"
            : Platform.OS === "ios" && !result?.time_out
            ? "#FCFF58"
            : "#92C4FF"
        }
        result={result}
        toggleOtherModal={toggleAttendanceReasonModal}
        withLoading={true}
        timeIn={attendance?.data?.time_in || result?.time_in}
        timeOut={attendance?.data?.time_out || result?.time_out}
      />

      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Report submitted!" : "Process error!"}
        description={
          requestType === "post"
            ? "Your report is logged"
            : errorMessage || "Please try again later"
        }
      />

      <AlertModal
        isOpen={locationIsEmptyIsOpen}
        toggle={toggleLocationIsEmpty}
        type="danger"
        title="Location not found!"
        description="Please try again"
      />
    </>
  );
};

export default Modals;
