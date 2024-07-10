import Input from "../../../styles/forms/Input";

const DeliveryOrderFilter = ({ inputToShow, handleSearch, handleClearSearch }) => {
  return (
    <Input
      value={inputToShow}
      onChangeText={handleSearch}
      placeHolder="Search DO..."
      onPressEndIcon={handleClearSearch}
      endIcon={inputToShow && "close-circle-outline"}
    />
  );
};

export default DeliveryOrderFilter;
