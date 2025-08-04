import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/Color";

export default StyleSheet.create({
  formContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
<<<<<<< HEAD
    backgroundColor: Colors.backgroundLight,
=======
    backgroundColor: "#F5F5F5",
>>>>>>> 6d058444 (feat: attendance)
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
<<<<<<< HEAD
    gap: 20,
  },
  calendarTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
=======
  },
  calendarTitle: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
>>>>>>> 6d058444 (feat: attendance)
  },
  dayBox: {
    width: 36,
    height: 36,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
<<<<<<< HEAD
    backgroundColor: Colors.secondary,
=======
    backgroundColor: "#fff",
>>>>>>> 6d058444 (feat: attendance)
  },
  dayText: {
    fontSize: 14,
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
<<<<<<< HEAD
    paddingHorizontal: 16,
    gap: 34,
    marginLeft: 18,
  },
  weekday: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.fontDark,
=======
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  weekday: {
    width: 36,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 4,
>>>>>>> 6d058444 (feat: attendance)
  },
  todayBox: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
<<<<<<< HEAD
    margin: 4,
    backgroundColor: "blue",
  },
  todayText: {
    color: Colors.secondary,
=======
    margin: 2,
    backgroundColor: "blue",
  },
  todayText: {
    color: "white",
>>>>>>> 6d058444 (feat: attendance)
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
<<<<<<< HEAD
    marginLeft: 14,
=======
    paddingHorizontal: 10,
>>>>>>> 6d058444 (feat: attendance)
  },
});
