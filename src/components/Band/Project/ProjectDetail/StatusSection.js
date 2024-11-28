import { memo, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { SheetManager } from "react-native-actions-sheet";

import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDisclosure } from "../../../../hooks/useDisclosure";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const StatusSection = ({ projectData, onChange }) => {
  const userSelector = useSelector((state) => state.auth);
  const [value, setValue] = useState("");
  const { isOpen, toggle, close } = useDisclosure(false);
  const statuses = ["Open", "On Progress", "Finish"];

  useEffect(() => {
    if (projectData) {
      setValue(projectData.status);
    }

    return () => {
      close();
    };
  }, [projectData]);

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() =>
        SheetManager.show("form-sheet", {
          payload: {
            children: (
              <View style={styles.menu}>
                <View style={styles.wrapper}>
                  {statuses.map((status) => {
                    return (
                      <Pressable
                        key={status}
                        onPress={() => {
                          if (status !== "Open") {
                            setValue(status);
                            toggle();
                            onChange(status === "On Progress" ? "start" : "finish");
                            SheetManager.hide("form-sheet");
                          }
                        }}
                        disabled={status === "Open"}
                        style={[styles.menuItem, { opacity: status === "Open" ? 0.5 : 1 }]}
                      >
                        <Text style={[TextProps, { fontSize: 16 }]}>{status}</Text>

                        <View
                          style={{
                            height: 15,
                            width: 15,
                            backgroundColor:
                              status === "Open" ? "#FFD240" : status === "On Progress" ? "#20cce2" : "#49c86c",
                            borderRadius: 4,
                          }}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ),
          },
        })
      }
      disabled={projectData?.owner_id !== userSelector.id}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              height: 15,
              width: 15,
              backgroundColor: value === "Open" ? "#FFD240" : value === "On Progress" ? "#20cce2" : "#49c86c",
              borderRadius: 4,
            }}
          />

          <Text style={[{ fontWeight: "500" }, TextProps]}>{value}</Text>
        </View>

        {projectData?.owner_id === userSelector.id && (
          <MaterialCommunityIcons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color={Colors.iconDark} />
        )}
      </View>
    </Pressable>
  );
};

export default memo(StatusSection);

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 1,
    borderColor: "#cbcbcb",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.backgroundLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  menu: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    backgroundColor: Colors.backgroundLight,
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
