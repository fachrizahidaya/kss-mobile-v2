import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/Color";

export default StyleSheet.create({
  formContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundLight,
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
  attachmentListHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  addButton: {
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 10,
  },
  calendarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.secondary,
    marginHorizontal: 16,
    marginVertical: 14,
    borderRadius: 8,
    gap: 10,
  },
  calendarTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayBox: {
    width: 36,
    height: 36,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Colors.secondary,
  },
  dayText: {
    fontSize: 14,
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    gap: 33,
    marginLeft: 14,
  },
  weekday: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.fontDark,
  },
  todayBox: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    backgroundColor: "blue",
  },
  todayText: {
    color: Colors.secondary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginLeft: 14,
  },
});
