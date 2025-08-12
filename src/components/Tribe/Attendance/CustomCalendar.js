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
        attendanceReason,
        leaveRequest,
        date,
        timeIn,
        timeOut,
        approvalLate,
        approvalLateStatus,
        approvalEarly,
        approvalEarlyStatus,
        approvalClockOut,
        approvalClockOutStatus,
        approvalUnattendance,
        approvalUnattendanceStatus,
        attendanceAttachment,
      } = event;

      if (confirmation) {
        backgroundColor = allGood.color;
        textColor = allGood.textColor;
        return;
      }
      if (dayType === "Day Off" || (dayType === "Holiday" && !leaveRequest)) {
        // hari day off atau libur berdasarkan data holiday
        backgroundColor = dayOff.color;
        textColor = dayOff.textColor;
        return;
      }
      if (
        dayType === "Work Day" &&
        (attendanceType === "Attend" || attendanceType === "Present")
      ) {
        if (timeIn && timeOut) {
          if (!late && !early) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
            return;
          }
          if (late) {
            backgroundColor = submittedReport.color;
            textColor = submittedReport.textColor;

            if (approvalLate && !approvalLateStatus) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            } else if (approvalLate && approvalLateStatus) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            } else if (!approvalLate) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            }

            if (early && !earlyReason) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            } else {
              if (approvalEarly && !approvalEarlyStatus) {
                backgroundColor = reportRequired.color;
                textColor = reportRequired.textColor;
                return;
              } else if (approvalEarly && approvalEarlyStatus) {
                backgroundColor = submittedReport.color;
                textColor = submittedReport.textColor;
                return;
              } else if (!approvalEarly) {
                backgroundColor = submittedReport.color;
                textColor = submittedReport.textColor;
                return;
              }
            }
            return;
          }
        }
        if (timeIn && !timeOut) {
          if (!attendanceReason) {
            backgroundColor = reportRequired.color;
            textColor = reportRequired.textColor;
            return;
          } else {
            if (approvalClockOut && !approvalClockOutStatus) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            } else if (approvalClockOut && approvalClockOutStatus) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            } else if (!approvalClockOut) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            }
          }
        }
      }
      if (
        dayType === "Work Day" &&
        (attendanceType !== "Attend" || attendanceType !== "Present")
      ) {
        if (attendanceType === "Leave" && leaveRequest) {
          backgroundColor = allGood.color;
          textColor = allGood.textColor;
          return;
        } else {
          if (attendanceType !== "Absent") {
            if (approvalUnattendance && !approvalUnattendanceStatus) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            } else {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            }
          } else {
            if (attendanceReason) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            } else {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            }
          }
        }
      }

      // else if (dayType === "Work Day" && attendanceType === "Sick") {
      //   // hari kerja tapi sakit
      //   backgroundColor = sick.color;
      //   textColor = sick.textColor;
      // } else if (
      //   dayType === "Work Day" &&
      //   (attendanceType === "Attend" || attendanceType === "Present") &&
      //   !late &&
      //   !early
      // ) {
      //   // hadir tidak late tidak early
      //   backgroundColor = allGood.color;
      //   textColor = allGood.textColor;
      // } else if ((dayType === "Work Day" || dayType === "Holiday") && leaveRequest) {
      //   // hari kerja atau libur tapi ada permohonan cuti
      //   backgroundColor = leave.color;
      //   textColor = leave.textColor;
      // } else if (
      //   (dayType === "Work Day" &&
      //     // && attendanceType === "Attend"
      //     late) ||
      //   (early && earlyReason)
      // ) {
      //   // hadir terlambat atau pulang awal dengan alasan
      //   backgroundColor = submittedReport.color;
      //   textColor = submittedReport.textColor;
      // } else if (
      //   (dayType === "Work Day" &&
      //     (attendanceType === "Attend" || attendanceType === "Present") &&
      //     late &&
      //     !lateReason) ||
      //   (early && !earlyReason)
      //   // ||
      //   // dayjs(dayjs().format("YYYY-MM-DD")).isAfter(date)
      // ) {
      //   // hadir terlambat atau pulang awal tanpa alasan
      //   backgroundColor = reportRequired.color;
      //   textColor = reportRequired.textColor;
      // } else if (
      //   dayType === "Work Day" &&
      //   (attendanceType !== "Attend" || attendanceType !== "Present") &&
      //   attendanceReason
      // ) {
      //   // tidak hadir dengan alasan
      //   backgroundColor = submittedReport.color;
      //   textColor = submittedReport.textColor;
      // } else if (
      //   dayType === "Work Day" &&
      //   (attendanceType !== "Attend" || attendanceType !== "Present") &&
      //   !attendanceReason
      // ) {
      //   // tidak hadir tanpa alasan
      //   backgroundColor = reportRequired.color;
      //   textColor = reportRequired.textColor;
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
