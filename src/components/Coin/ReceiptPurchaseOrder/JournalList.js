import ItemList from "../Journal/ItemList";

const JournalList = ({ header, currencyConverter, data, isLoading, debit, credit }) => {
  return (
    <ItemList
      header={header}
      currencyConverter={currencyConverter}
      data={data}
      isLoading={isLoading}
      debit={debit}
      credit={credit}
    />
  );
};

export default JournalList;
