import { memo } from "react";
import { useSelector } from "react-redux";
import { SheetManager } from "react-native-actions-sheet";

import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import Button from "../../../../../styles/forms/Button";
import { TextProps } from "../../../../../styles/CustomStylings";
import { Colors } from "../../../../../styles/Color";

const ControlSection = ({ taskStatus, selectedTask, onChangeStatus, isLoading }) => {
  const userSelector = useSelector((state) => state.auth);
  const isDisabled = taskStatus === "Closed";

  const renderStatusOption = () =>
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.menu}>
            <View style={styles.wrapper}>
              <Pressable
                onPress={async () => {
                  await onChangeStatus("open");
                  SheetManager.hide("form-sheet");
                }}
                disabled={isLoading}
                style={styles.menuItem}
              >
                <Text style={[TextProps, { fontSize: 16 }]}>Open</Text>
              </Pressable>
              <Pressable
                onPress={async () => {
                  await onChangeStatus("start");
                  SheetManager.hide("form-sheet");
                }}
                disabled={isLoading}
                style={styles.menuItem}
              >
                <Text style={[TextProps, { fontSize: 16 }]}>On Progress</Text>
              </Pressable>
              <Pressable
                onPress={async () => {
                  await onChangeStatus("finish");
                  SheetManager.hide("form-sheet");
                }}
                disabled={isLoading}
                style={styles.menuItem}
              >
                <Text style={[TextProps, { fontSize: 16 }]}>Finish</Text>
              </Pressable>
            </View>
          </View>
        ),
      },
    });

  return (
    <Button
      disabled={isDisabled || selectedTask?.responsible_id !== userSelector.id}
      alignSelf="flex-start"
      onPress={renderStatusOption}
      padding={10}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        {isLoading ? <ActivityIndicator /> : <Text style={{ color: Colors.fontLight }}>{taskStatus}</Text>}
      </View>
    </Button>
  );
};

export default memo(ControlSection);

const styles = StyleSheet.create({
  menu: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderWhite,
  },
});
