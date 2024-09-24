import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useFetch } from "../../hooks/useFetch";
import ReminderList from "../../components/Coin/Reminder/ReminderList";
import Screen from "../../layouts/Screen";
import ReminderFilter from "../../components/Coin/Reminder/ReminderFilter";
import CustomFilter from "../../styles/CustomFilter";

const Reminder = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [filter, setFilter] = useState("All");

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const option = [
    { label: "All", value: "All" },
    { label: "Overdue", value: "Overdue" },
    { label: "Due", value: "Due" },
  ];

  const { data, refetch, isFetching, isLoading } = useFetch("/acc/dashboard/reminder");

  const filterChangeHandler = (value) => {
    setFilter(value);
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  const filteredData = data?.data?.filter((item) => item?.status === filter);

  return (
    <Screen
      screenTitle="Reminder"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={filter !== "All"} />}
    >
      <ReminderList
        data={filter === "All" ? data?.data : filteredData}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
      />
      <ReminderFilter
        reference={filterSheetRef}
        option={option}
        filter={filter}
        filterChangeHandler={filterChangeHandler}
      />
    </Screen>
  );
};

export default Reminder;
