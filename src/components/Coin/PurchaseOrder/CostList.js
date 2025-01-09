import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import CostItem from "./CostItem";

const CostList = ({ data, isLoading, converter }) => {
  return (
    <View style={{ flex: 1, gap: 10 }}>
      {!isLoading ? (
        data?.length > 0 ? (
          <FlashList
            data={data}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            estimatedItemSize={50}
            renderItem={({ item, index }) => (
              <CostItem
                key={index}
                name={item?.coa?.name}
                coa={item?.coa?.code}
                amount={item?.total_payment || item?.amount}
                index={index}
                notes={item?.notes}
                length={data?.length}
                converter={converter}
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
  );
};

export default CostList;
