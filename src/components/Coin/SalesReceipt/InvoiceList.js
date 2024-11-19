import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";
import Amount from "./Amount";

const InvoiceList = ({
  isLoading,
  payment,
  paid,
  discount,
  over,
  data,
  currencyConverter,
  navigation,
  handleDynamicPadding,
  dynamicPadding,
}) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <>
      <View style={{ height: screenHeight - 250 }}>
        {!isLoading ? (
          data?.length > 0 ? (
            <FlashList
              contentContainerStyle={{ paddingBottom: dynamicPadding }}
              data={data}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              estimatedItemSize={50}
              renderItem={({ item, index }) => (
                <Item
                  key={index}
                  total_amount={item?.total_amount}
                  currencyConverter={currencyConverter}
                  invoice_id={item?.sales_invoice?.id}
                  invoice_no={item?.sales_invoice?.invoice_no}
                  debit={item?.debit_amount}
                  payment={item?.payment_amount}
                  discount={item?.discount_amount}
                  total={item?.total_payment}
                  navigation={navigation}
                  index={index}
                  length={data?.length}
                />
              )}
            />
          ) : (
            <EmptyPlaceholder text="No data" />
          )
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <Amount
        payment={payment}
        paid={paid}
        discount={discount}
        over={over}
        isLoading={isLoading}
        currencyConverter={currencyConverter}
        handleDynamicPadding={handleDynamicPadding}
      />
    </>
  );
};

export default InvoiceList;
