import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import Select from "../../../../styles/forms/Select";
import { TextProps } from "../../../../styles/CustomStylings";
import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";

const NewLiveSessionForm = ({
  items,
  value,
  handleChange,
  radioButtons,
  handlePress,
  selectedId,
  handleSubmit,
  isLoading,
}) => {
  return (
    <View style={Platform.OS === "ios" ? styles.ios : styles.android}>
      <Select
        placeHolder="Select session"
        title="Session"
        items={items}
        value={value}
        onChange={(value) => handleChange(value)}
      />
      <View>
        <Text style={[TextProps, { marginBottom: 9 }]}>Host Type</Text>
        <RadioGroup radioButtons={radioButtons} onPress={handlePress} selectedId={selectedId} layout="row" />
      </View>
      <Button disabled={!value && !selectedId} onPress={handleSubmit}>
        {isLoading ? <ActivityIndicator /> : <Text style={{ color: Colors.fontLight }}>Submit</Text>}
      </Button>
    </View>
  );
};

export default NewLiveSessionForm;

const styles = StyleSheet.create({
  ios: {
    marginVertical: 14,
    marginHorizontal: 16,
    gap: 10,
  },
  android: {
    gap: 10,
  },
});
