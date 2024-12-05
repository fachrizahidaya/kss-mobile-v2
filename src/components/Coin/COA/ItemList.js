import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";
import CustomCard from "../../../layouts/CustomCard";

const ItemList = ({ header, isLoading, data, currencyConverter }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <>
      <View style={{ flex: 1 }}>
        {!isLoading ? (
          data?.length > 0 ? (
            <FlashList
              scrollEnabled={false}
              data={data}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              estimatedItemSize={50}
              renderItem={({ item, index }) => (
                <Item
                  name={item?.name}
                  code={item?.code}
                  balance={currencyConverter.format(item?.balance)}
                  index={index}
                  length={data?.length}
                />
              )}
            />
          ) : (
            <CustomCard>
              <View style={{ alignItems: "center" }}>
                <EmptyPlaceholder text="No data" />
              </View>
            </CustomCard>
          )
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </>
  );
};

export default ItemList;
