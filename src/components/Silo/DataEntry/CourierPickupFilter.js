import { Platform, Text, View } from "react-native";

import CustomDateTimePicker from "../../../styles/timepicker/CustomDateTimePicker";
import CustomTimePicker from "../../../styles/timepicker/CustomTimePicker";
import CustomSheet from "../../../layouts/CustomSheet";
import Button from "../../../styles/forms/Button";
import { Colors } from "../../../styles/Color";

const CourierPickupFilter = ({
  startDate,
  startDateChangeHandler,
  endDate,
  endDateChangeHandler,
  startTime,
  endTime,
  startTimeChangeHandler,
  endTimeChangeHandler,
  reference,
  handleResetFilter,
}) => {
  return (
    <CustomSheet reference={reference}>
      {Platform.OS === "ios" ? (
        <>
          <CustomDateTimePicker
            mode="datetime"
            unlimitStartDate={true}
            defaultValue={startDate}
            onChange={startDateChangeHandler}
            title="Begin Date"
            withTime={true}
          />
          <CustomDateTimePicker
            mode="datetime"
            defaultValue={endDate}
            onChange={endDateChangeHandler}
            title="End Date"
            withTime={true}
            minimumDate={startDate}
            unlimitStartDate={true}
          />
        </>
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
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
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
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
              <CustomTimePicker title="Time" onChange={endTimeChangeHandler} defaultValue={endTime ? endTime : null} />
            </View>
          </View>
        </>
      )}
      <Button disabled={!startDate && !endDate} onPress={handleResetFilter}>
        <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
      </Button>
    </CustomSheet>
  );
};

export default CourierPickupFilter;
