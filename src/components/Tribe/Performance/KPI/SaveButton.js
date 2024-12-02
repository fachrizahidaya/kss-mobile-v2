import { ActivityIndicator, Text } from "react-native";

import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";
import FormButton from "../../../../styles/buttons/FormButton";

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
    <FormButton
      onPress={handleSave}
      disabled={(differences.length === 0 && differenceTotalAttachments === 0) || isLoading}
      isSubmitting={isLoading}
    >
      <Text style={{ color: Colors.fontLight }}>Save</Text>
    </FormButton>
  );
};

export default SaveButton;
