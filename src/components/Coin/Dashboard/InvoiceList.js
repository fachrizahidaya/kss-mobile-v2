import { ActivityIndicator, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import InvoiceItem from "./InvoiceItem";

const InvoiceList = ({ data, converter, isLoading, isFetching }) => {
  return (
    <View style={{ flex: 1 }}>
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={data}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          refreshing={true}
          estimatedItemSize={80}
          renderItem={({ item, index }) => (
            <InvoiceItem
              key={index}
              invoice_no={item?.invoice_no}
              status={item?.status}
              date={item?.invoice_date}
              customer={item?.customer?.name}
              amount={converter.format(item?.total_amount)}
            />
          )}
        />
      )}
    </View>
  );
};

export default InvoiceList;
