import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";

const ReceivedItem = ({ isReceive, data, isLoading, navigation }) => {
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
                name={null}
                qty={null}
                delivered_qty={null}
                receive_date={dayjs(item?.receive_date).format("DD MMM YYYY")}
                receive_no={item?.receive_no}
                unit={null}
                item_id={null}
                navigation={navigation}
                isReceive={isReceive}
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

export default ReceivedItem;
