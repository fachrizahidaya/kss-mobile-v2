import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CustomYearPicker = ({ handleSelectedYear, selectedYear }) => {
  const [year, setYear] = useState(new Date().getFullYear());

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
        <Pressable onPress={handlePreviousYear}>
          <Text>Prev</Text>
        </Pressable>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>{selectedYear}</Text>
        <Pressable onPress={handleNextYear}>
          <Text>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomYearPicker;

const styles = StyleSheet.create({
  yearContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
