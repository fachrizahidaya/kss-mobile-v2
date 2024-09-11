import { memo, useCallback, useRef, useState } from "react";
import _ from "lodash";

import { Pressable, StyleSheet, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "../../../../styles/forms/Input";
import TaskFilterSheet from "../../../../styles/actionsheets/TaskFilterSheet";

const TaskFilter = ({
  members,
  labels,
  setSelectedLabelId,
  selectedLabelId,
  responsibleId,
  deadlineSort,
  selectedPriority,
  setResponsibleId,
  setDeadlineSort,
  setSelectedPriority,
  setSearchInput,
}) => {
  const filterSheetRef = useRef(null);
  const [shownInput, setShownInput] = useState("");

  const handleChangeInput = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
    }, 300),
    []
  );

  const handleChange = (value) => {
    handleChangeInput(value);
    setShownInput(value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setShownInput("");
  };

  return (
    <>
      <Input
        value={shownInput}
        onChangeText={handleChange}
        placeHolder="Search"
        endAdornment={
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            {shownInput ? (
              <Pressable onPress={handleClearSearch}>
                <MaterialCommunityIcons name="close" size={20} color="#3F434A" />
              </Pressable>
            ) : null}

            <Pressable style={{ position: "relative" }} onPress={() => filterSheetRef.current?.show()}>
              <MaterialCommunityIcons name="tune-variant" size={20} color="#3F434A" />
              {selectedLabelId || selectedPriority ? <View style={styles.filterIndicator} /> : null}
            </Pressable>
          </View>
        }
      />

      <TaskFilterSheet
        reference={filterSheetRef}
        deadlineSort={deadlineSort}
        labels={labels}
        members={members}
        responsibleId={responsibleId}
        selectedLabelId={selectedLabelId}
        selectedPriority={selectedPriority}
        setDeadlineSort={setDeadlineSort}
        setResponsibleId={setResponsibleId}
        setSelectedLabelId={setSelectedLabelId}
        setSelectedPriority={setSelectedPriority}
      />
    </>
  );
};

export default memo(TaskFilter);

const styles = StyleSheet.create({
  filterIndicator: {
    position: "absolute",
    backgroundColor: "#4AC96D",
    borderRadius: 10,
    right: 3,
    top: 3,
    width: 10,
    height: 10,
  },
});
