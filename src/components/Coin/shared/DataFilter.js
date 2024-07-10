import Input from "../../../styles/forms/Input";

const DataFilter = ({ inputToShow, handleSearch, placeholder, handleClearSearch }) => {
  return (
    <Input
      value={inputToShow}
      onChangeText={handleSearch}
      placeHolder={placeholder}
      endIcon={inputToShow && "close-circle-outline"}
      onPressEndIcon={handleClearSearch}
    />
  );
};

export default DataFilter;
