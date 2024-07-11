import Input from "../../../styles/forms/Input";

const DownPaymentFilter = ({ handleSearch, inputToShow, handleClearSearch }) => {
  return (
    <Input
      value={inputToShow}
      onChangeText={handleSearch}
      placeHolder="Search"
      endIcon={inputToShow && "close-circle-outline"}
      onPressEndIcon={handleClearSearch}
    />
  );
};

export default DownPaymentFilter;
