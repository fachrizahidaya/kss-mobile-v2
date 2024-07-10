import Input from "../../../styles/forms/Input";

const ReceiptPurchaseOrderFilter = ({ inputToShow, handleSearch, handleClearSearch }) => {
  return (
    <Input
      value={inputToShow}
      onChangeText={handleSearch}
      placeHolder="Search Receipt..."
      onPressEndIcon={handleClearSearch}
      endIcon={inputToShow && "close-circle-outline"}
    />
  );
};

export default ReceiptPurchaseOrderFilter;
