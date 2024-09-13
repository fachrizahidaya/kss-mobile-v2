import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";

import KPIDetailItem from "./KPIDetailItem";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";

const KPIList = ({ kpiValues, handleSelectedKpi, setKpi, setEmployeeKpi, reference }) => {
  return (
    <ScrollView>
      {kpiValues && kpiValues.length > 0 ? (
        kpiValues.map((item, index) => {
          const correspondingEmployeeKpi = employeeKpiValue.find((empKpi) => empKpi.id === item.id);
          return (
            <KPIDetailItem
              key={index}
              description={item?.description}
              target={item?.target}
              weight={item?.weight}
              threshold={item?.threshold}
              measurement={item?.measurement}
              achievement={item?.actual_achievement}
              item={item}
              handleOpen={handleSelectedKpi}
              employeeKpiValue={correspondingEmployeeKpi}
              setKpi={setKpi}
              setEmployeeKpi={setEmployeeKpi}
              reference={reference}
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
