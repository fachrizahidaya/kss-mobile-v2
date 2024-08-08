import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomMonthPicker = ({ months, handleSelectedMonth, handleSelectedYear, selectedMonth, selectedYear }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  const deviceWidth = Dimensions.get("window").width;

  const handlePreviousYear = () => {
    setYear(year - 1);
    handleSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setYear(year + 1);
    handleSelectedYear(selectedYear + 1);
  };

  return (
    <View>
      <View style={styles.yearContainer}>
        <TouchableOpacity onPress={handlePreviousYear}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>{selectedYear}</Text>
        <TouchableOpacity onPress={handleNextYear}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.monthContainer}>
        {months.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectedMonth(item.key)}
            style={[
              styles.month,
              {
                width: deviceWidth / 3,
                backgroundColor: selectedMonth == item.key ? "blue" : null,
                borderRadius: selectedMonth === item.key ? 15 : null,
              },
            ]}
          >
            <Text style={{ color: selectedMonth == item.key ? "white" : "black" }}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomMonthPicker;

const styles = StyleSheet.create({
  yearContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingVertical: 10,
  },
  month: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
