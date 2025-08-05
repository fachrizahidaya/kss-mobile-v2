import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/Color";

export default StyleSheet.create({
  formContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
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
  },
  calendarTitle: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dayBox: {
    width: 36,
    height: 36,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  dayText: {
    fontSize: 14,
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  weekday: {
    width: 36,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 4,
  },
  todayBox: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    backgroundColor: "blue",
  },
  todayText: {
    color: "white",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
});
