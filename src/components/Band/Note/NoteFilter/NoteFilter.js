import { memo, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import _ from "lodash";

import { Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "../../../../styles/forms/Input";
import { Colors } from "../../../../styles/Color";

const NoteFilter = ({ data = [], setFilteredData }) => {
  let filteredArr = data;

  const handleChange = (value) => {
    formik.setFieldValue("title", value);
    formik.handleSubmit();
  };

  const handleClearFilter = () => formik.resetForm();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string(),
    }),
    onSubmit: (values) => {
      handleFilterData(values);
    },
  });

  /**
   * Filter and sort data based on filter criteria.
   * @param {Object} filterObj - An object containing filter criteria.
   */
  const handleFilterData = (filterObj) => {
    // Iterate through the keys of the filterObj
    Object.keys(filterObj).forEach((key) => {
      if (filterObj[key]) {
        // Filtering: Filter the data based on the filter value (case-insensitive).
        filteredArr = _.filter(filteredArr, (val) => {
          return (
            val[key]?.toLowerCase()?.includes(filterObj[key]?.toLowerCase()) ||
            (filterObj[key] === "null" && val[key] === null)
          );
        });
      }
      // Update the state or result with the filtered and sorted data.
      setFilteredData(filteredArr);
    });
  };

  // Run filter on initial render so the first render will return all data
  useEffect(() => {
    handleFilterData(formik.values);
  }, [formik.values, filteredArr]);

  return (
    <Input
      placeHolder="Search"
      formik={formik}
      value={formik.values.title}
      fieldName="title"
      onChangeText={handleChange}
      endAdornment={
        formik.values.title ? (
          <Pressable onPress={handleClearFilter}>
            <MaterialCommunityIcons name="close" size={20} color={Colors.iconDark} />
          </Pressable>
        ) : null
      }
    />
  );
};

export default memo(NoteFilter);
