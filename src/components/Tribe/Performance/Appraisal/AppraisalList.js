import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";

import AppraisalDetailItem from "../Appraisal/AppraisalDetailItem";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";

const AppraisalList = ({ appraisalValues, handleChange, handleSelectedAppraisal, employeeAppraisalValue }) => {
  return (
    <ScrollView>
      {appraisalValues && appraisalValues.length > 0 ? (
        appraisalValues.map((item, index) => {
          const correspondingEmployeeAppraisal = employeeAppraisalValue.find(
            (empAppraisal) => empAppraisal.id === item.id
          );
          return (
            <AppraisalDetailItem
              key={index}
              id={item?.performance_appraisal_value_id || item?.id}
              description={item?.description}
              item={item}
              choice={item?.choice}
              onChange={handleChange}
              choice_a={item?.choice_a}
              choice_b={item?.choice_b}
              choice_c={item?.choice_c}
              choice_d={item?.choice_d}
              choice_e={item?.choice_e}
              handleOpen={handleSelectedAppraisal}
              employeeAppraisalValue={correspondingEmployeeAppraisal}
              index={index}
              length={appraisalValues?.length}
            />
          );
        })
      ) : (
        <View style={styles.content}>
          <EmptyPlaceholder text="No Data" />
        </View>
      )}
    </ScrollView>
  );
};

export default AppraisalList;

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
