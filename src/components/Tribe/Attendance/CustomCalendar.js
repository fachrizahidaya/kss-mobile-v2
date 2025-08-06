import dayjs from "dayjs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { View, Text, Button, TouchableOpacity, Animated, Easing } from "react-native";
import styles from "./Attendance.styles";
import { useAttendance } from "./hooks/useAttendance";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";

const CustomCalendar = ({
  toggleDate,
  updateAttendanceCheckAccess,
  allGood,
  reportRequired,
  submittedReport,
  dayOff,
  sick,
  filter,
  items,
  currentDate,
  handleSwitchMonth,
  leave,
  beginPeriod,
  endPeriod,
}) => {
  const {
    currentMonth,
    setCurrentMonth,
    direction,
    setDirection,
    beginDate,
    days,
    weekdays,
    firstDayWeekIndex,
    slideAnim,
  } = useAttendance();

  const getCustomRange = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const startDate = new Date(year, monthIndex - 1, 22); // 22 of previous month
    const endDate = new Date(year, monthIndex, 21); // 21 of current month
    return { startDate, endDate };
  };

  const { startDate, endDate } = getCustomRange(currentMonth);

  const animateSlide = (newMonth, dir) => {
    setDirection(dir);
    Animated.timing(slideAnim, {
      toValue: dir * -300,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentMonth(newMonth);

      const { endDate } = getCustomRange(newMonth);

      if (updateAttendanceCheckAccess) {
        handleSwitchMonth({
          month: dayjs(endDate).format("M"),
          year: dayjs(endDate).format("YYYY"),
        });
      }

      slideAnim.setValue(dir * 300);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePrev = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
    animateSlide(newMonth, -1);
  };

  const isNextDisabled = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const { startDate: nextStartDate } = getCustomRange(nextMonth);
    return nextStartDate > beginDate;
  };

  const handleNext = () => {
    if (isNextDisabled()) return;
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    animateSlide(newMonth, 1);
  };

  const getDayStyle = (dateKey) => {
    if (!items || !items[dateKey]) {
      return { backgroundColor: Colors.secondary, textColor: Colors.fontDark };
    }

    const events = items[dateKey];
    if (!events || events?.length === 0)
      return {
        backgroundColor: Colors.secondary,
        textColor: Colors.fontDark,
      };

    let backgroundColor = allGood.color;
    let textColor = allGood.textColor;

    events?.forEach((event) => {
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
        leaveRequest,
        dateData,
      } = event;

      if (confirmation) {
        backgroundColor = allGood.color;
        textColor = allGood.textColor;
      } else if (dayType === "Day Off" || (dayType === "Holiday" && !leaveRequest)) {
        backgroundColor = dayOff.color;
        textColor = dayOff.textColor;
      } else if (dayType === "Work Day" && attendanceType === "Sick") {
        backgroundColor = sick.color;
        textColor = sick.textColor;
      } else if (
        dayType === "Work Day" &&
        attendanceType === "Attend" &&
        !late &&
        !early
      ) {
        backgroundColor = allGood.color;
        textColor = allGood.textColor;
      } else if ((dayType === "Work Day" || dayType === "Holiday") && leaveRequest) {
        backgroundColor = leave.color;
        textColor = leave.textColor;
      } else if (
        (dayType === "Work Day" && attendanceType === "Attend" && late) ||
        (early && earlyReason)
      ) {
        backgroundColor = submittedReport.color;
        textColor = submittedReport.textColor;
      } else if (
        (dayType === "Work Day" && attendanceType === "Attend" && late && lateReason) ||
        (early && !earlyReason) ||
        dayjs(dayjs().format("YYYY-MM-DD")).isAfter(dateData)
      ) {
        backgroundColor = reportRequired.color;
        textColor = reportRequired.textColor;
      } else if (
        dayType === "Work Day" &&
        attendanceType !== "Attend" &&
        attendanceReason
      ) {
        backgroundColor = submittedReport.color;
        textColor = submittedReport.textColor;
      } else if (
        dayType === "Work Day" &&
        attendanceType !== "Attend" &&
        !attendanceReason
      ) {
        backgroundColor = reportRequired.color;
        textColor = reportRequired.textColor;
      }

      // if (dayType === "Day Off") {
      //   backgroundColor = dayOff.color;
      //   textColor = dayOff.textColor;
      // } else if (
      //   (early && !earlyReason && !confirmation && early !== "Went Home Early") ||
      //   (late && !lateReason && !confirmation && late !== "Late") ||
      //   (attendanceType === "Alpa" && !attendanceReason && dateKey !== currentDate)
      // ) {
      //   backgroundColor = reportRequired.color;
      //   textColor = reportRequired.textColor;
      // } else if (
      //   (((early && earlyReason) || (late && lateReason)) && !confirmation) ||
      //   (late && lateReason && earlyType && !earlyReason && !earlyStatus) ||
      //   (early && earlyReason && lateType && !lateReason && !lateStatus) ||
      //   (attendanceType === "Permit" && attendanceReason) ||
      //   (attendanceType === "Alpa" && attendanceReason) ||
      //   (attendanceType === "Other" &&
      //     attendanceReason &&
      //     !confirmation &&
      //     dateKey !== currentDate) ||
      //   (late === "Late" && !lateReason) ||
      //   (early === "Went Home Early" && !earlyReason)
      // ) {
      //   backgroundColor = submittedReport.color;
      //   textColor = submittedReport.textColor;
      // } else if (attendanceType === "Sick" && attendanceReason) {
      //   backgroundColor = sick.color;
      //   textColor = sick.textColor;
      // } else if (
      //   (attendanceType === "Leave" && dayType === "Work Day") ||
      //   (attendanceType === "Leave" && dayType === "Holiday")
      // ) {
      //   backgroundColor = leave.color;
      //   textColor = leave.textColor;
      // }
    });

    return { backgroundColor, textColor };
  };

  return (
    <View style={styles.calendarContainer}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[TextProps, { fontSize: 12, fontWeight: "bold" }]}
        >{`Period : ${beginPeriod} - ${endPeriod}`}</Text>
        <Text
          style={[TextProps, { fontSize: 12, fontWeight: "bold" }]}
        >{`Auto Confirm : ${endPeriod}`}</Text>
      </View>
      <View style={styles.buttonRow}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={20}
          color={Colors.iconDark}
          onPress={handlePrev}
          disabled={null}
        />
        <Text style={styles.calendarTitle}>
          {endDate.toLocaleString("default", { month: "long" })} {endDate.getFullYear()}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={isNextDisabled() ? Colors.iconGrey : Colors.iconDark}
          onPress={handleNext}
          disabled={isNextDisabled()}
        />
      </View>

      <View style={styles.weekdayRow}>
        {weekdays.map((day, index) => (
          <Text key={index} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>

      <Animated.View style={[styles.grid, { transform: [{ translateX: slideAnim }] }]}>
        {Array.from({ length: firstDayWeekIndex }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.dayBox} />
        ))}
        {days.map((day) => {
          const dateKey = dayjs(day).format("YYYY-MM-DD");
          const { backgroundColor, textColor } = getDayStyle(dateKey, day);

          const today = new Date();
          const isToday =
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear();
          return (
            <TouchableOpacity
              key={`${dateKey}`}
              style={[
                styles.dayBox,
                { backgroundColor: backgroundColor || Colors.secondary },
                // isToday && styles.todayBox,
              ]}
              onPress={() => toggleDate({ dateString: dateKey })}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: textColor },
                  // isToday && styles.todayText,
                ]}
              >
                {day.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default CustomCalendar;
