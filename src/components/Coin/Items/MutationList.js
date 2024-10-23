import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";

const MutationList = ({ data, isLoading }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View style={{ height: screenHeight - 300 }}>
      {!isLoading ? (
        data?.length > 0 ? (
          <FlashList
            data={data}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            estimatedItemSize={50}
            renderItem={({ item, index }) => (
              <Item
                key={index}
                source_no={item?.source_no}
                date={dayjs(item?.process_date).format("DD MMM YYYY")}
                type={item?.process_type}
                desc={item?.description}
                whs_name={item?.warehouse?.name}
                qty_in={item?.qty_in}
                qty_out={item?.qty_out}
                qty_stock={item?.total}
                isMutation={true}
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
  );
};

export default MutationList;
