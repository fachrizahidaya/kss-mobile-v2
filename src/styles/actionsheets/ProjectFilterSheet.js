import { useCallback } from "react";
import { useFormik } from "formik";
import _ from "lodash";

import { Pressable, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";
import CustomSheet from "../../layouts/CustomSheet";
import { Colors } from "../Color";

const ProjectFilterSheet = ({
  reference,
  deadlineSort,
  selectedPriority,
  setDeadlineSort,
  setSelectedPriority,
  setOwnerName,
}) => {
  const formik = useFormik({
    initialValues: {
      owner_name: "",
    },
  });

  const handleSearchOwner = useCallback(
    _.debounce((value) => {
      setOwnerName(value);
    }, 500),
    []
  );

  const handleChange = (value) => {
    handleSearchOwner(value);
    formik.setFieldValue("owner_name", value);
  };

  const handleClearSearch = () => {
    handleSearchOwner("");
    formik.setFieldValue("owner_name", "");
  };

  const resetAllFilter = async () => {
    formik.setFieldValue("owner_name", "");
    setOwnerName("");
    setDeadlineSort("asc");
    setSelectedPriority("");
  };
  const render = [
    <Input
      value={formik.values.owner_name}
      title="Owner Name"
      onChangeText={handleChange}
      placeHolder="Search owner"
      endAdornment={
        formik.values.owner_name ? (
          <Pressable onPress={handleClearSearch}>
            <MaterialCommunityIcons name="close" size={20} color="#3F434A" />
          </Pressable>
        ) : null
      }
    />,

    <Select
      title="Sort Deadline"
      value={deadlineSort}
      placeHolder="Sort Deadline"
      items={[
        { value: "asc", label: "Closest" },
        { value: "desc", label: "Latest" },
      ]}
      onChange={(value) => setDeadlineSort(value)}
      hasParentSheet
    />,

    <Select
      title="Priority"
      value={selectedPriority}
      placeHolder="Select Priority"
      items={[
        { value: "", label: "All Priority" },
        { value: "Low", label: "Low" },
        { value: "Medium", label: "Medium" },
        { value: "High", label: "High" },
      ]}
      onChange={(value) => setSelectedPriority(value)}
      hasParentSheet
    />,

    <Button disabled={!deadlineSort && !selectedPriority} onPress={resetAllFilter} padding={10}>
      <Text style={{ color: Colors.fontLight }}>Reset Filter</Text>
    </Button>,
  ];

  return (
    <CustomSheet reference={reference}>
      {render.map((item, index) => {
        return <View key={index}>{item}</View>;
      })}
    </CustomSheet>
  );
};

export default ProjectFilterSheet;
