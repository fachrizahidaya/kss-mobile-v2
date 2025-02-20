import { View } from "react-native";

import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import Select from "../../../../styles/forms/Select";

const NewLiveSessionForm = ({
  sessions,
  handleSelect,
  handleSelectClock,
  handleSelectEndClock,
  selected,
  brands,
  brandSelected,
  handleBrand,
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
    </View>
  );
};

export default NewLiveSessionForm;
