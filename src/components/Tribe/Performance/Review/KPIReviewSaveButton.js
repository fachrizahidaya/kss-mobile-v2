import { ActivityIndicator, Text } from "react-native";

import Button from "../../../../styles/forms/Button";

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
    <Button padding={10} onPress={handleSave} disabled={differences.length === 0 || isLoading}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#FFFFFF" }}>Save</Text>
      )}
    </Button>
  );
};

export default KPIReviewSaveButton;
