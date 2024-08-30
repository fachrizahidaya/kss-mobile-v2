import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";

import CourierPickupCountItem from "./CourierPickupCountItem";

const CourierPickupCountList = ({ totalData }) => {
  const length = totalData?.length;

  return (
    <View style={{ marginVertical: 4 }}>
      <FlashList
        data={totalData}
        estimatedItemSize={50}
        horizontal
        renderItem={({ item, index }) => (
          <CourierPickupCountItem
            count={item?.total_scan}
            image={item?.courier?.image}
            name={item?.courier?.name}
            length={length}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default CourierPickupCountList;
