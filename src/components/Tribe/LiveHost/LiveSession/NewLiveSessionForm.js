import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";
import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";
import Select from "../../../../styles/forms/Select";

const NewLiveSessionForm = ({
  items,
  value,
  handleSubmit,
  isLoading,
  handleSelect,
  selected,
  brands,
  brand,
  handleBrand,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ gap: 8 }}>
        <Text style={[TextProps]}>Session</Text>
        {items?.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => handleSelect(item?.value)} style={styles.session}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text>{item?.label}</Text>
                {selected === item?.value ? <MaterialCommunityIcons name="check" size={20} color="#3F434A" /> : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Select title="Brand" items={brands} value={brand} placeHolder="Select brand" onChange={handleBrand} />

      <Button disabled={!value && !brand} onPress={handleSubmit}>
        {isLoading ? <ActivityIndicator /> : <Text style={{ color: Colors.fontLight }}>Submit</Text>}
      </Button>
    </View>
  );
};

export default NewLiveSessionForm;

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginHorizontal: 16,
    gap: 10,
  },
  session: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
