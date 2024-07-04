import Input from "../../shared/Forms/Input";

const CustomerListFilter = ({ handleSearch, inputToShow, handleClearSearch }) => {
  return (
    <Input
      value={inputToShow}
      onChangeText={handleSearch}
      onPressEndIcon={handleClearSearch}
      endIcon={inputToShow && "close-circle-outline"}
      placeHolder="Search Customer..."
    />
  );
};

export default CustomerListFilter;
