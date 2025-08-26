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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <Button onPress={() => navigation.navigate("New Overtime")}>
=======
        <Button onPress={() => navigation.navigate("")}>
>>>>>>> 9c219588 (feat: overtime)
=======
        <Button onPress={() => navigation.navigate("New Overtime")}>
>>>>>>> 4ec5fbc8 (feat: overtime form)
=======
        <Button onPress={() => navigation.navigate("New Overtime")}>
>>>>>>> 859eea89 (first commit)
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
