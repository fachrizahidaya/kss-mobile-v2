import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PageHeader from "../../styles/PageHeader";
import { useFetch } from "../../hooks/useFetch";
import ReminderList from "../../components/Coin/Reminder/ReminderList";
import Select from "../../styles/forms/Select";

const Reminder = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [filter, setFilter] = useState("All");

  const navigation = useNavigation();

  const option = [
    { label: "All", value: "All" },
    { label: "Overdue", value: "Overdue" },
    { label: "Due", value: "Due" },
  ];

  const { data, refetch, isFetching, isLoading } = useFetch("/acc/dashboard/reminder");

  const filterChangeHandler = (value) => {
    setFilter(value);
  };

  const filteredData = data?.data?.filter((item) => item?.status === filter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Reminder" onPress={() => navigation.goBack()} />
        <Pressable
          style={styles.content}
          onPress={() =>
            SheetManager.show("form-sheet", {
              payload: {
                children: (
                  <View style={styles.wrapper}>
                    <View style={{ gap: 5 }}>
                      <Select items={option} onChange={(value) => filterChangeHandler(value)} placeHolder={filter} />
                    </View>
                  </View>
                ),
              },
            })
          }
        >
          <View style={{ alignItems: "center", gap: 5 }}>
            <MaterialCommunityIcons name="tune-variant" size={20} color="#3F434A" />
          </View>
        </Pressable>
      </View>
      <ReminderList
        data={filter === "All" ? data?.data : filteredData}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
      />
    </SafeAreaView>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  content: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
