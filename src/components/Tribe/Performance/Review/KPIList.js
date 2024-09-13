import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";

import KPIReviewDetailItem from "./KPIReviewDetailItem";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";

const KPIList = ({ kpiValues, employeeKpiValue, handleSelectedKpi, handleDownload }) => {
  return (
    <ScrollView>
      {kpiValues && kpiValues.length > 0 ? (
        kpiValues.map((item, index) => {
          const correspondingEmployeeKpi = employeeKpiValue.find((empKpi) => empKpi.id === item.id);
          return (
            <KPIReviewDetailItem
              key={index}
              item={item}
              id={item?.id}
              description={item?.description}
              target={item?.target}
              weight={item?.weight}
              threshold={item?.threshold}
              measurement={item?.measurement}
              achievement={item?.supervisor_actual_achievement}
              handleOpen={handleSelectedKpi}
              employeeKpiValue={correspondingEmployeeKpi}
              attachment={item?.attachment}
              onDownload={handleDownload}
              index={index}
              length={kpiValues?.length}
            />
          );
        })
      ) : (
        <View style={styles.content}>
          <EmptyPlaceholder height={250} width={250} text="No Data" />
        </View>
      )}
    </ScrollView>
  );
};

export default KPIList;

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
