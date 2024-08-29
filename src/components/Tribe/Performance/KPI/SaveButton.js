import { ActivityIndicator, Text } from "react-native";

import Button from "../../../../styles/forms/Button";

const SaveButton = ({
  isLoading,
  differences,
  onSubmit,
  differenceTotalAttachments,
  toggleSubmit,
  employeeKpiValue,
  kpiList,
  toggleSaveModal,
  setRequestType,
  refetchKpiList,
  setError,
}) => {
  const handleSave = () => {
    if (isLoading || (differences.length === 0 && differenceTotalAttachments === 0)) {
      null;
    } else {
      onSubmit(toggleSubmit, employeeKpiValue, kpiList, toggleSaveModal, setRequestType, refetchKpiList, setError);
    }
  };

  return (
    <Button
      padding={10}
      onPress={handleSave}
      disabled={(differences.length === 0 && differenceTotalAttachments === 0) || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#FFFFFF" }}>Save</Text>
      )}
    </Button>
  );
};

export default SaveButton;
