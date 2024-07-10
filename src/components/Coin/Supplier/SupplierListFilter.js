import Input from "../../../styles/forms/Input";

const SupplierListFilter = ({ handleSearch, inputToShow, handleClearSearch }) => {
  return (
    <Input
      value={inputToShow}
      onChangeText={handleSearch}
      placeHolder="Search Customer..."
      endIcon={inputToShow && "close-circle-outline"}
      onPressEndIcon={handleClearSearch}
    />
  );
};

export default SupplierListFilter;
