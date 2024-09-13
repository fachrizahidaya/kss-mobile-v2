import { Platform, Pressable, StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import CustomTimePicker from "../../../styles/timepicker/CustomTimePicker";

const CourierPickupFilter = ({
  startDate,
  startDateChangeHandler,
  endDate,
  endDateChangeHandler,
  startTime,
  endTime,
  startTimeChangeHandler,
  endTimeChangeHandler,
}) => {
  const renderFilterSheet = () =>
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.wrapper}>
            {Platform.OS === "ios" ? (
              <>
                <View style={{ gap: 5 }}>
                  <CustomDateTimePicker
                    mode="datetime"
                    unlimitStartDate={true}
                    defaultValue={startDate}
                    onChange={startDateChangeHandler}
                    title="Begin Date"
                    withTime={true}
                  />
                </View>
                <View style={{ gap: 5 }}>
                  <CustomDateTimePicker
                    mode="datetime"
                    defaultValue={endDate}
                    onChange={endDateChangeHandler}
                    title="End Date"
                    withTime={true}
                    minimumDate={startDate}
                    unlimitStartDate={true}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={{ gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flex: 0.5 }}>
                    <CustomDateTimePicker
                      mode="date"
                      unlimitStartDate={true}
                      width="100%"
                      defaultValue={startDate ? startDate : null}
                      onChange={startDateChangeHandler}
                      title="Begin Date"
                    />
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <CustomTimePicker
                      title="Time"
                      onChange={startTimeChangeHandler}
                      defaultValue={startTime ? startTime : null}
                    />
                  </View>
                </View>
                <View style={{ gap: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flex: 0.5 }}>
                    <CustomDateTimePicker
                      mode="date"
                      unlimitStartDate={true}
                      width="100%"
                      defaultValue={endDate ? endDate : null}
                      onChange={endDateChangeHandler}
                      title="End Date"
                    />
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <CustomTimePicker
                      title="Time"
                      onChange={endTimeChangeHandler}
                      defaultValue={endTime ? endTime : null}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        ),
      },
    });
  return (
    <View style={{ alignItems: "flex-end" }}>
      <Pressable style={styles.container} onPress={renderFilterSheet}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <MaterialCommunityIcons name="tune-variant" size={20} color="#3F434A" />
        </View>
      </Pressable>
    </View>
  );
};

export default CourierPickupFilter;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
});
