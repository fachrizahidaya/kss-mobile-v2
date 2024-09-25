import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Skeleton } from "moti/skeleton";

import InvoiceItem from "./InvoiceItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import { SkeletonCommonProps } from "../../../styles/CustomStylings";

const InvoiceList = ({ data, converter, isLoading }) => {
  return (
    <View style={{ flex: 1 }}>
      {!isLoading ? (
        data?.length > 0 ? (
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
        ) : (
          <EmptyPlaceholder text="No data" />
        )
      ) : (
        <View style={{ marginHorizontal: 14 }}>
          <Skeleton width="100%" height={500} radius={20} {...SkeletonCommonProps} />
        </View>
      )}
    </View>
  );
};

export default InvoiceList;
