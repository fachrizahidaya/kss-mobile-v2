import { ActivityIndicator, Text } from "react-native";

import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";
import FormButton from "../../../../styles/buttons/FormButton";

const AppraisalReviewSaveButton = ({ isLoading, differences, onSubmit }) => {
  const handleSave = () => {
    if (isLoading || differences.length === 0) {
      null;
    } else {
      onSubmit();
    }
  };

  return (
    <FormButton onPress={handleSave} disabled={differences.length === 0 || isLoading} isSubmitting={isLoading}>
      <Text style={{ color: Colors.fontLight }}>Save</Text>
    </FormButton>
  );
};

export default AppraisalReviewSaveButton;
