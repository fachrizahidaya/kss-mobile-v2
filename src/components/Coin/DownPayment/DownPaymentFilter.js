import Input from "../../shared/Forms/Input";

const DownPaymentFilter = ({ handleSearch, inputToShow, handleClearSearch }) => {
  return (
    <Input
      value={inputToShow}
      onChangeText={handleSearch}
      placeHolder="Search SO..."
      endIcon={inputToShow && "close-circle-outline"}
      onPressEndIcon={handleClearSearch}
    />
  );
};

export default DownPaymentFilter;
