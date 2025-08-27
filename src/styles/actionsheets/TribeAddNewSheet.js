import * as Notifications from "expo-notifications";

import AlertModal from "../modals/AlertModal";
import CustomSheet from "../../layouts/CustomSheet";
import SheetItem from "../../components/Tribe/Clock/SheetItem";
import Modals from "../../components/Tribe/Clock/Modals";
import { useTribe } from "./hooks/useTribe";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const TribeAddNewSheet = (props) => {
  const {
    location,
    locationOn,
    locationPermission,
    requestType,
    setRequestType,
    result,
    setResult,
    errorMessage,
    setErrorMessage,
    workDuration,
    minimumDurationReached,
    success,
    setSuccess,
    shiftSelected,
    setShiftSelected,
    clockModalIsOpen,
    toggleClockModal,
    alertIsOpen,
    toggleAlert,
    attendanceModalIsopen,
    toggleAttendanceModal,
    attendanceReasonModalIsOpen,
    toggleAttendanceReasonModal,
    locationIsEmptyIsOpen,
    toggleLocationIsEmpty,
    newLeaveRequestModalIsOpen,
    toggleNewLeaveRequestModal,
    navigation,
    profile,
    myTimeGroup,
    currentTime,
    attendance,
    refetchAttendance,
    items,
    lateType,
    earlyType,
    shifts,
    formik,
    earlyReasonformik,
    handleSubmit,
  } = useTribe();

  return (
    <>
      <CustomSheet moduleScreenSheet={true} reference={props.reference}>
        {items.map((item, index) => {
          return (
            <SheetItem
              item={item}
              attendance={attendance}
              handleSubmit={handleSubmit}
              location={location}
              locationOn={locationOn}
              attendanceModalIsopen={attendanceModalIsopen}
              workDuration={workDuration}
              shiftSelected={shiftSelected}
              setShiftSelected={setShiftSelected}
              minimumDurationReached={minimumDurationReached}
              props={props}
              key={index}
              profile={profile}
              toggleNewLeaveRequestModal={toggleNewLeaveRequestModal}
              toggleClockModal={toggleClockModal}
              setRequestType={setRequestType}
              setErrorMessage={setErrorMessage}
              type={
                "Clock"
                // ||
                // "Scan QR"
                // ||
                // "Generate QR"
              }
              locationPermission={locationPermission}
              shifts={shifts}
              result={result}
              setResult={setResult}
            />
          );
        })}

        <Modals
          attendanceModalIsopen={attendanceModalIsopen}
          toggleAttendanceModal={toggleAttendanceModal}
          location={location}
          refetchAttendance={refetchAttendance}
          attendanceReasonModalIsOpen={attendanceReasonModalIsOpen}
          toggleAttendanceReasonModal={toggleAttendanceReasonModal}
          attendance={attendance}
          clockModalIsOpen={clockModalIsOpen}
          toggleClockModal={toggleClockModal}
          locationIsEmptyIsOpen={locationIsEmptyIsOpen}
          toggleLocationIsEmpty={toggleLocationIsEmpty}
          setResult={setResult}
          success={success}
          setSuccess={setSuccess}
          requestType={requestType}
          setRequestType={setRequestType}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          alertIsOpen={alertIsOpen}
          toggleAlert={toggleAlert}
          formik={formik}
          earlyformik={earlyReasonformik}
          earlyType={earlyType}
          lateType={lateType}
          currentTime={currentTime}
          result={result}
          workDuration={workDuration}
          minimumDurationReached={minimumDurationReached}
        />
      </CustomSheet>

      <AlertModal
        isOpen={newLeaveRequestModalIsOpen}
        toggle={toggleNewLeaveRequestModal}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Request sent!" : "Process error!"}
        description={
          requestType === "post"
            ? "Please wait for approval"
            : errorMessage || "Please try again later"
        }
      />
    </>
  );
};

export default TribeAddNewSheet;
