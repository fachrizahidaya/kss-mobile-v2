import { ActivityIndicator, Text } from "react-native";

import Button from "../../../../styles/forms/Button";

const AppraisalReviewSaveButton = ({ isLoading, differences, onSubmit }) => {
  const handleSave = () => {
    if (isLoading || differences.length === 0) {
      null;
    } else {
      onSubmit();
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
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#FFFFFF" }}>Save</Text>
      )}
    </Button>
  );
};

export default AppraisalReviewSaveButton;
