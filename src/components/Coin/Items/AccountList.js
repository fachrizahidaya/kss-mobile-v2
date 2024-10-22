import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Item from "./Item";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const AccountList = ({ isLoading, data }) => {
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
                description={item?.name}
                code={item?.coa?.code}
                name={item?.coa?.name}
                isAccount={true}
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

export default AccountList;
