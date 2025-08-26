import { useCallback, useMemo, useRef, useState } from "react";
import { Animated } from "react-native";

export const useAttendance = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const [beginDate, setBeginDate] = useState(new Date());
  const [tabValue, setTabValue] = useState("late");
  const [number, setNumber] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleMonthRange = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const startDate = new Date(year, monthIndex - 1, 22); // 22 of previous month
    const endDate = new Date(year, monthIndex, 21); // 21 of current month
    return { startDate, endDate };
  };

  const { startDate, endDate } = handleMonthRange(currentMonth);

  const handleGenerateDays = () => {
    const days = [];
    let current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const days = handleGenerateDays();
  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
  const firstDayWeekIndex = (startDate.getDay() + 6) % 7;

  const handleChangeTab = useCallback((value) => {
    setTabValue(value);
  }, []);

  const handleChangeNumber = (value) => {
    setNumber(value);
  };

  const tabs = useMemo(() => {
    return [
      { title: "late", value: "late", number: 1 },
      { title: "early", value: "early", number: 2 },
      { title: "approval", value: "approval", number: 3 },
    ];
  }, []);

  return {
    currentMonth,
    setCurrentMonth,
    direction,
    setDirection,
    beginDate,
    setBeginDate,
    tabValue,
    setTabValue,
    number,
    setNumber,
    tabs,
    startDate,
    endDate,
    days,
    weekdays,
    firstDayWeekIndex,
    slideAnim,
    handleChangeTab,
    handleChangeNumber,
  };
};
