import { ActivityIndicator, Text } from "react-native";

import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";

const KPIReviewSaveButton = ({
  isLoading,
  differences,
  onSubmit,
  toggleSubmit,
  employeeKpiValue,
  kpiList,
  toggleSaveModal,
  setRequestType,
  refetchKpiList,
}) => {
  const handleSave = () => {
    if (isLoading || differences.length === 0) {
      null;
    } else {
      onSubmit(toggleSubmit, employeeKpiValue, kpiList, toggleSaveModal, setRequestType, refetchKpiList);
    }
  };

  return (
    <Button
      paddingVertical={8}
      paddingHorizontal={10}
      onPress={handleSave}
      disabled={differences.length === 0 || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ fontSize: 12, fontWeight: "500", color: Colors.fontLight }}>Save</Text>
      )}
    </Button>
  );
};

export default KPIReviewSaveButton;
