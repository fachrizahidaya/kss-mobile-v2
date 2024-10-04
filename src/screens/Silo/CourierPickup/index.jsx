import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { Platform, Pressable, StyleSheet } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CourierPickupList from "../../../components/Silo/DataEntry/CourierPickupList";
import { useFetch } from "../../../hooks/useFetch";
import CourierPickupFilter from "../../../components/Silo/DataEntry/CourierPickupFilter";
import CourierPickupCountList from "../../../components/Silo/DataEntry/CourierPickupCountList";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import CourierPickupTotal from "../../../components/Silo/DataEntry/CourierPickupTotal";

const CourierPickupScreen = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("00:00:01");
  const [endTime, setEndTime] = useState("23:59:59");
  const [fullDateStart, setFullDateStart] = useState("");
  const [fullDateEnd, setFullDateEnd] = useState("");
  const [hideScanIcon, setHideScanIcon] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);

  const navigation = useNavigation();
  const scrollOffsetY = useRef(0);
  const SCROLL_THRESHOLD = 20;
  const filterSheetRef = useRef();

  const fetchDataParameters =
    Platform.OS === "ios"
      ? {
          begin_date: startDate || dayjs().format("YYYY-MM-DD 00:00:01"),
          end_date: endDate || dayjs().format("YYYY-MM-DD 23:59:00"),
        }
      : {
          begin_date: fullDateStart || dayjs().format("YYYY-MM-DD 00:00:01"),
          end_date: fullDateEnd || dayjs().format("YYYY-MM-DD 23:59:00"),
        };

  const { data, isFetching, refetch } = useFetch(`/wm/courier-pickup`, [startDate, endDate], fetchDataParameters);

  const updateFullDateStart = (date, time) => {
    if (date && time) {
      setFullDateStart(`${date} ${time}`);
    }
  };

  const updateFullDateEnd = (date, time) => {
    if (date && time) {
      setFullDateEnd(`${date} ${time}`);
    }
  };

  const startDateChangeHandler = (date) => {
    setStartDate(date);
    if (Platform.OS === "android") {
      updateFullDateStart(date, startTime);
    }
  };

  const endDateChangeHandler = (date) => {
    setEndDate(date);
    if (Platform.OS === "android") {
      updateFullDateEnd(date, endTime);
    }
  };

  const startTimeChangeHandler = (time) => {
    setStartTime(time);
    if (Platform.OS === "android") {
      updateFullDateStart(startDate, time);
    }
  };

  const endTimeChangeHandler = (time) => {
    setEndTime(time);
    if (Platform.OS === "android") {
      updateFullDateEnd(endDate, time);
    }
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setStartTime("00:00:01");
    setEndTime("23:59:59");
  };

  const scrollHandler = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const offsetDifference = currentOffsetY - scrollOffsetY.current;

    if (Math.abs(offsetDifference) < SCROLL_THRESHOLD) {
      return; // Ignore minor scrolls
    }

    if (currentOffsetY > scrollOffsetY.current) {
      if (scrollDirection !== "down") {
        setHideScanIcon(true); // Scrolling down
        setScrollDirection("down");
      }
    } else {
      if (scrollDirection !== "up") {
        setHideScanIcon(false); // Scrolling up
        setScrollDirection("up");
      }
    }

    scrollOffsetY.current = currentOffsetY;
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    if (startDate && startTime) {
      updateFullDateStart(startDate, startTime);
    }
    if (endDate && endTime) {
      updateFullDateEnd(endDate, endTime);
    }
  }, [startDate, startTime, endDate, endTime]);

  return (
    <Screen
      screenTitle="Courier Pickup"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={startDate || endDate} />}
    >
      <CourierPickupTotal total={data?.data?.length} />
      <CourierPickupCountList totalData={data?.total_data} />

      <CourierPickupList data={data?.data} handleScroll={scrollHandler} isFetching={isFetching} refetch={refetch} />
      <CourierPickupFilter
        startDate={startDate}
        endDate={endDate}
        startDateChangeHandler={startDateChangeHandler}
        endDateChangeHandler={endDateChangeHandler}
        startTime={startTime}
        endTime={endTime}
        startTimeChangeHandler={startTimeChangeHandler}
        endTimeChangeHandler={endTimeChangeHandler}
        reference={filterSheetRef}
        handleResetFilter={handleResetFilter}
      />

      {hideScanIcon ? null : (
        <Pressable style={styles.addIcon} onPress={() => navigation.navigate("Entry Session")}>
          <MaterialCommunityIcons name="barcode-scan" size={30} color="#FFFFFF" />
        </Pressable>
      )}
    </Screen>
  );
};

export default CourierPickupScreen;

const styles = StyleSheet.create({
  addIcon: {
    backgroundColor: "#377893",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    right: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
});
