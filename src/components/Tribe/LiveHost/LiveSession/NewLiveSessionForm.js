import { Text, View } from "react-native";

import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import Select from "../../../../styles/forms/Select";
import FormButton from "../../../../styles/buttons/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const NewLiveSessionForm = ({
  sessions,
  handleSelect,
  handleSelectClock,
  handleSelectEndClock,
  selected,
  brands,
  brandSelected,
  handleBrand,
  session,
  brand,
  isLoading,
  handleSubmit,
}) => {
  return (
    <View style={{ gap: 10 }}>
      {sessions?.length > 0 ? (
        <Select
          title="Session"
          items={sessions}
          value={selected}
          placeHolder="Select session"
          onChange={(value) => handleSelect(value)}
          needMoreFunction={true}
          onChangeClock={handleSelectClock}
          onChangeEndClock={handleSelectEndClock}
        />
      ) : sessions?.length < 0 ? (
        <EmptyPlaceholder text="You already have an active session" />
      ) : (
        <EmptyPlaceholder text="No Data" />
      )}

      {brands?.length > 0 ? (
        <Select
          title="Brand"
          items={brands}
          value={brandSelected}
          placeHolder="Select brand"
          onChange={(value) => handleBrand(value)}
        />
      ) : (
        <EmptyPlaceholder text="No Data" />
      )}

      <FormButton
        isSubmitting={isLoading}
        disabled={!session || !brand}
        onPress={handleSubmit}
      >
        <Text style={[TextProps, { color: Colors.fontLight }]}>Submit</Text>
      </FormButton>
    </View>
  );
};

export default NewLiveSessionForm;
