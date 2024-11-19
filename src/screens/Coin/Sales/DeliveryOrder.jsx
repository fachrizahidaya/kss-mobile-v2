import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { useFetch } from "../../../hooks/useFetch";
import DeliveryOrderList from "../../../components/Coin/DeliveryOrder/DeliveryOrderList";
import DeliveryOrderFilter from "../../../components/Coin/DeliveryOrder/DeliveryOrderFilter";
import DataFilter from "../../../components/Coin/shared/DataFilter";
import Screen from "../../../layouts/Screen";
import CustomFilter from "../../../styles/buttons/CustomFilter";

const DeliveryOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataArray, setFilteredDataArray] = useState([]);
  const [inputToShow, setInputToShow] = useState("");
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [deliveryOrder, setDeliveryOrder] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [courier, setCourier] = useState(null);
  const [customer, setCustomer] = useState(null);

  const navigation = useNavigation();
  const filterSheetRef = useRef();

  const statusTypes = [
    { value: "Pending", label: "Pending" },
    { value: "Delivery", label: "Delivery" },
    { value: "Delivered", label: "Delivered" },
  ];

  const fetchDeliveryOrderParameters = {
    page: currentPage,
    search: searchInput,
    limit: 20,
    begin_date: startDate,
    end_date: endDate,
    status: status,
    courier: courier,
    customer: customer,
  };

  const { data, isFetching, isLoading, refetch } = useFetch(
    `/acc/delivery-order`,
    [currentPage, searchInput, startDate, endDate, status, courier, customer],
    fetchDeliveryOrderParameters
  );

  const { data: courierData } = useFetch(`/acc/courier`);

  const { data: customerData } = useFetch(`/acc/customer`);

  const courierOptions = courierData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const customerOptions = customerData?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const fetchMoreDeliveryOrder = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchDeliveryOrderHandler = useCallback(
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
    searchDeliveryOrderHandler(value);
    setInputToShow(value);
  };

  const handleClearSearch = () => {
    setInputToShow("");
    setSearchInput("");
  };

  const resetFilterHandler = () => {
    setStatus(null);
    setCourier(null);
    setCustomer(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handleOpenSheet = () => {
    filterSheetRef.current?.show();
  };

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setDeliveryOrder([]);
  }, [status, startDate, endDate]);

  useEffect(() => {
    setDeliveryOrder([]);
    setFilteredDataArray([]);
  }, [searchInput]);

  useEffect(() => {
    if (data?.data?.data.length) {
      if (!searchInput) {
        setDeliveryOrder((prevData) => [...prevData, ...data?.data?.data]);
        setFilteredDataArray([]);
      } else {
        setFilteredDataArray((prevData) => [...prevData, ...data?.data?.data]);
        setDeliveryOrder([]);
      }
    }
  }, [data]);

  return (
    <Screen
      screenTitle="Delivery Order"
      returnButton={true}
      onPress={() => navigation.goBack()}
      childrenHeader={<CustomFilter toggle={handleOpenSheet} filterAppear={status || startDate || endDate} />}
    >
      <DataFilter
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        inputToShow={inputToShow}
        setInputToShow={setInputToShow}
        setSearchInput={setSearchInput}
        placeholder="Search"
      />
      <DeliveryOrderList
        data={deliveryOrder}
        filteredData={filteredDataArray}
        isLoading={isLoading}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        fetchMore={fetchMoreDeliveryOrder}
        isFetching={isFetching}
        refetch={refetch}
        navigation={navigation}
      />
      <DeliveryOrderFilter
        startDate={startDate}
        endDate={endDate}
        handleStartDate={startDateChangeHandler}
        handleEndDate={endDateChangeHandler}
        types={statusTypes}
        handleStatusChange={setStatus}
        handleCourierChange={setCourier}
        handleCustomerChange={setCustomer}
        value={status}
        reference={filterSheetRef}
        handleResetFilter={resetFilterHandler}
        status={status}
        courier={courier}
        customer={customer}
        courierOptions={courierOptions}
        customerOptions={customerOptions}
      />
    </Screen>
  );
};

export default DeliveryOrder;
