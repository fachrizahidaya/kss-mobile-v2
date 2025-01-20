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
  const [location, setLocation] = useState(null);
  const [locationOn, setLocationOn] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [workDuration, setWorkDuration] = useState(null);
  const [minimumDurationReached, setMinimumDurationReached] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const [attend, setAttend] = useState(null);
  const [goHome, setGoHome] = useState(null);
  const [clockIn, setClockIn] = useState(null);
  const [clockOut, setClockOut] = useState(null);
  const [shiftSelected, setShiftSelected] = useState(null);
  const [timeGroup, setTimeGroup] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [dayDifference, setDayDifference] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();
  const selectShiftRef = useRef();

  const navigation = useNavigation();
  const createLeaveRequestCheckAccess = useCheckAccess("create", "Leave Requests");
  const joinLiveSessionCheckAccess = useCheckAccess("join", "E-Commerce Live History");
  const currentTime = dayjs().format("HH:mm");
  const currentDate = dayjs().format("YYYY-MM-DD");

  const sequenceIndex = (dayDifference % timeGroup?.length) + 1;
  const sequenceSelected = sequenceIndex === 0 ? timeGroup?.length : sequenceIndex;
  const selectedItem = timeGroup?.find((item) => item?.seq === sequenceSelected);

  const clockInAndClockOut = () => {
    setClockIn(selectedItem?.on_duty);
    setClockOut(selectedItem?.off_duty);
  };

  const { data: attendance, refetch: refetchAttendance } = useFetch(
    "/hr/timesheets/personal/attendance-today",
  );
  const { data: profile } = useFetch("/hr/my-profile");
  const { data: myTimeGroup } = useFetch("/hr/my-time-group");

  const { isOpen: clockModalIsOpen, toggle: toggleClockModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);
  const { isOpen: attendanceModalIsopen, toggle: toggleAttendanceModal } =
    useDisclosure(false);
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
        {items.map((item, idx) => {
          return item.title !== "Clock in" ? (
            <Pressable
              key={idx}
              style={styles.wrapper}
              onPress={() => {
                if (item.title === "New Leave Request ") {
                  navigation.navigate("New Leave Request", {
                    employeeId: profile?.data?.id,
                    toggle: toggleNewLeaveRequestModal,
                    setRequestType: setRequestType,
                    setError: setErrorMessage,
                  });
                } else if (item.title === "New Reimbursement") {
                  navigation.navigate("New Reimbursement");
                } else if (item.title === "New Live Session ") {
                  navigation.navigate("New Live Session", {
                    setRequestType: setRequestType,
                    toggleAlert: toggleNewJoinSessionModal,
                    setError: setErrorMessage,
                  });
                }
                props.reference.current?.hide();
              }}
            >
              <View style={styles.content}>
                <View style={styles.item}>
                  <MaterialCommunityIcons
                    name={item.icons}
                    size={20}
                    color={Colors.iconDark}
                  />
                </View>
                <Text key={item.title} style={[{ fontSize: 14 }, TextProps]}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          ) : !attendance?.data ? null : (
            <Pressable key={idx} style={styles.wrapper}>
              <ClockAttendance
                attendance={attendance?.data}
                onClock={attendanceSubmit}
                location={location}
                locationOn={locationOn}
                modalIsOpen={attendanceModalIsopen}
                workDuration={workDuration}
                timeIn={attendance?.data?.time_in}
                reference={selectShiftRef}
                shiftValue={shiftSelected}
                minimumDurationReached={minimumDurationReached}
                clockIn={clockIn}
              />
            </Pressable>
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
