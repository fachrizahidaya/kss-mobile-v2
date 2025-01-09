import Input from "../../../styles/forms/Input";

const CustomerListFilter = ({ handleSearch, inputToShow, handleClearSearch }) => {
  return (
    <Input
      value={inputToShow}
      onChangeText={handleSearch}
      onPressEndIcon={handleClearSearch}
      endIcon={inputToShow && "close-circle-outline"}
      placeHolder="Search"
    />
  );
};

export default CustomerListFilter;
