import { useCallback } from "react";

import { useFormik } from "formik";
import _ from "lodash";

import { View, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "../../../../styles/forms/Input";
import ProjectFilterSheet from "../../../../styles/actionsheets/ProjectFilterSheet";

const ProjectFilter = ({
  deadlineSort,
  selectedPriority,
  setSearchInput,
  setDeadlineSort,
  setSelectedPriority,
  setOwnerName,
  reference,
}) => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
  });

  const handleChange = (value) => {
    handleSearch(value);
    formik.setFieldValue("search", value);
  };

  const handleSearch = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
    }, 500),
    []
  );

  const handleClearSearch = () => {
    handleSearch("");
    formik.setFieldValue("search", "");
  };

  return (
    <>
      <Input
        value={formik.values.search}
        onChangeText={handleChange}
        placeHolder="Search"
        endAdornment={
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            {formik.values.search && (
              <Pressable onPress={handleClearSearch}>
                <MaterialCommunityIcons name="close" size={20} color="#3F434A" />
              </Pressable>
            )}
          </View>
        }
      />

      <ProjectFilterSheet
        reference={reference}
        deadlineSort={deadlineSort}
        selectedPriority={selectedPriority}
        setDeadlineSort={setDeadlineSort}
        setOwnerName={setOwnerName}
        setSelectedPriority={setSelectedPriority}
      />
    </>
  );
};

export default ProjectFilter;
