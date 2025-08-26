import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const height = Dimensions.get("screen").height - 300;

export default StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
  animatedContainer: {
    flex: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leaveStatus: {
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 20,
    height: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 2,
    shadowOffset: 0,
  },
  attendanceStatus: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 15,
    height: 15,
    position: "absolute",
    top: -2,
    right: -2,
    zIndex: 2,
    shadowOffset: 0,
  },
  positionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#20A144",
    width: 140,
    overflow: "hidden",
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
});
