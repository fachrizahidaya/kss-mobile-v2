import { useRef, useState } from "react";
import dayjs from "dayjs";

import { View, Text, Button, TouchableOpacity, Animated, Easing } from "react-native";
import styles from "./Attendance.styles";

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
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const getCustomRange = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const startDate = new Date(year, monthIndex - 1, 22); // 22 of previous month
    const endDate = new Date(year, monthIndex, 21); // 21 of current month
    return { startDate, endDate };
  };

  const { startDate, endDate } = getCustomRange(currentMonth);

  const generateDays = () => {
    const days = [];
    let current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

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
    // setCurrentMonth(newMonth);
    animateSlide(newMonth, -1);
  };

  const handleNext = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    // setCurrentMonth(newMonth);
    animateSlide(newMonth, 1);
  };

  const days = generateDays();
  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
  const firstDayWeekIndex = (startDate.getDay() + 6) % 7;

  const getDayStyle = (dateKey) => {
    if (!items || !items[dateKey]) {
      return { backgroundColor: "#fff", textColor: "#000" }; // default color if no data
    }

    const events = items[dateKey];
    if (!events || events?.length === 0)
      return {
        backgroundColor: "#fff",
        textColor: "#000",
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
      } = event;

      if (
        attendanceType === "Leave" ||
        dayType === "Day Off" ||
        dayType === "Holiday" ||
        dayType === "Day Off"
      ) {
        backgroundColor = dayOff.color;
        textColor = dayOff.textColor;
      } else if (
        (early && !earlyReason && !confirmation && early !== "Went Home Early") ||
        (late && !lateReason && !confirmation && late !== "Late") ||
        (attendanceType === "Alpa" && !attendanceReason && dateKey !== currentDate)
        // ||
        // dayType === "Weekend"
        // ||
        // dayType === "Holiday"
        // ||
        // dayType === "Day Off"
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
          dateKey !== currentDate) ||
        (late === "Late" && !lateReason) ||
        (early === "Went Home Early" && !earlyReason)
      ) {
        backgroundColor = submittedReport.color;
        textColor = submittedReport.textColor;
      } else if (attendanceType === "Sick" && attendanceReason) {
        backgroundColor = sick.color;
        textColor = sick.textColor;
      }
    });

    return { backgroundColor, textColor };
  };

  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.calendarTitle}>
        {endDate.toLocaleString("default", { month: "long" })} {endDate.getFullYear()}
      </Text>

      <View style={styles.buttonRow}>
        <Button title="Previous" onPress={handlePrev} />
        <Button title="Next" onPress={handleNext} />
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
                { backgroundColor: backgroundColor || "#FFFFFF" },
                isToday && styles.todayBox,
              ]}
              onPress={() => toggleDate({ dateString: dateKey })}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: textColor },
                  isToday && styles.todayText,
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
