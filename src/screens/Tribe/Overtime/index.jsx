import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import OvertimeSubmission from "../../../components/Tribe/Overtime/OvertimeSubmission";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import Button from "../../../styles/forms/Button";
import { useOvertime } from "./hooks/useOvertime";

const Overtime = () => {
  const { tabs, tabValue, handleChangeTab, handleChangeNumber, number } = useOvertime();
  const navigation = useNavigation();

  return (
    <Screen
      screenTitle="Overtime"
      backgroundColor={Colors.backgroundLight}
      childrenHeader={
        <Button onPress={() => navigation.navigate("New Overtime")}>
          <Text style={{ color: Colors.fontLight }}>Create Overtime</Text>
        </Button>
      }
    >
      <OvertimeSubmission
        tabs={tabs}
        tabValue={tabValue}
        onChangeTab={handleChangeTab}
        onChangeNumber={handleChangeNumber}
      />
    </Screen>
  );
};

export default Overtime;
