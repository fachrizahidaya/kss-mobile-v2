import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/Color";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
  },
  tabContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundLight,
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 15,
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
