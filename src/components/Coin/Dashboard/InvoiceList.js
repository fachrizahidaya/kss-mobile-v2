import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import InvoiceItem from "./InvoiceItem";

const InvoiceList = ({ data }) => {
  return (
    <View style={{ flex: 1 }}>
      {data?.length > 0 ? (
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
              customer={item?.customer}
            />
          )}
        />
      ) : (
        <EmptyPlaceholder text="No data" />
      )}
    </View>
  );
};

export default InvoiceList;
