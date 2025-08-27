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

  return (
    <>
      <ConfirmationModal
        isOpen={attendanceModalIsopen}
        toggle={toggleAttendanceModal}
        apiUrl={
          !attendance?.data?.time_in
            ? `/hr/timesheets/personal/clock-in`
            : `/hr/timesheets/personal/clock-out`
        }
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
        title={result?.late && !result?.late_reason ? "Late Type" : "Eearly Type"}
        types={result?.late && !result?.late_reason ? lateType : earlyType}
        timeInOrOut={
          result?.late && !result?.late_reason ? result?.time_in : result?.time_out
        }
        lateOrEarly={result?.late && !result?.late_reason ? result?.late : result?.early}
        timeDuty={
          result?.late && !result?.late_reason ? result?.on_duty : result?.off_duty
        }
        clockInOrOutTitle={
          result?.late && !result?.late_reason ? "Clock-in Time" : "Clock-out Time"
        }
        onOrOffDuty={result?.late && !result?.late_reason ? "On Duty" : "Off Duty"}
        lateOrEarlyType={
          result?.late && !result?.late_reason ? "Select Late Type" : "Select Early Type"
        }
        fieldType={result?.late && !result?.late_reason ? "late_type" : "early_type"}
        fieldReaason={
          result?.late && !result?.late_reason ? "late_reason" : "early_reason"
        }
        lateOrEarlyInputValue={
          result?.late && !result?.late_reason
            ? formik.values.late_reason
            : formik.values.early_reason
        }
        lateOrEarlyInputType={
          result?.late && !result?.late_reason
            ? formik.values.late_type
            : formik.values.early_type
        }
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
