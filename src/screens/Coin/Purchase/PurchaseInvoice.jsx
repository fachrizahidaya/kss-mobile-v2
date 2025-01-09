import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import PurchaseInvoiceList from "../../../components/Coin/PurchaseInvoice/PurchaseInvoiceList";
import Screen from "../../../layouts/Screen";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import { useFetch } from "../../../hooks/useFetch";
import CustomFilter from "../../../styles/buttons/CustomFilter";
import PurchaseInvoiceFilter from "../../../components/Coin/PurchaseInvoice/PurchaseInvoiceFilter";

const PurchaseInvoice = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [purchaseInvoice, setPurchaseInvoice] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [supplier, setSupplier] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const currencyConverter = new Intl.NumberFormat("en-US", {});

  const statusTypes = [
    { value: "Unpaid", label: "Unpaid" },
    { value: "Paid", label: "Paid" },
    { value: "Partially Paid", label: "Partially Paid" },
  ];

  const fetchPurchaseInvoiceParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    status: status,
    supplier: supplier,
    begin_date: startDate,
    end_date: endDate,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/purchase-invoice`,
    [currentPage, searchInput],
    fetchPurchaseInvoiceParameters
  );

  const { data: supplierData } = useFetch(`/acc/supplier`);

  const supplierOptions = supplierData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const fetchMorePurchaseInvoice = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchPurchaseInvoiceHandler = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  /**
   * Handle start and end date archived
   * @param {*} date
   */
  const startDateChangeHandler = (date) => {
    setStartDate(date);
  };
  const endDateChangeHandler = (date) => {
    setEndDate(date);
  };

  const handleSearch = (value) => {
    searchPurchaseInvoiceHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const resetFilterHandler = () => {
    setStatus(null);
    setSupplier(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handleOpenFilter = () => {
    filterSheetRef.current?.show();
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setPurchaseInvoice([]);
  }, [status, startDate, endDate, supplier]);

  useEffect(() => {
    setPurchaseInvoice([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setPurchaseInvoice((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setPurchaseInvoice([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Purchase Invoice"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={
        <CustomFilter toggle={handleOpenFilter} filterAppear={status || supplier || startDate || endDate} />
      }
    >
      <DataFilter
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        inputToShow={inputToShow}
        setInputToShow={setInputToShow}
        setSearchInput={setSearchInput}
        placeholder="Search"
      />
      <PurchaseInvoiceList
        data={purchaseInvoice}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        fetchMore={fetchMorePurchaseInvoice}
        filteredData={filteredDataArray}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        navigation={navigation}
        converter={currencyConverter}
      />
      <PurchaseInvoiceFilter
        reference={filterSheetRef}
        startDate={startDate}
        endDate={endDate}
        value={status}
        supplierValue={supplier}
        types={statusTypes}
        suppliers={supplierOptions}
        status={status}
        supplier={supplier}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        handleResetFilter={resetFilterHandler}
        handleStatusChange={setStatus}
        handleSupplierChange={setSupplier}
      />
    </Screen>
  );
};

export default PurchaseInvoice;
