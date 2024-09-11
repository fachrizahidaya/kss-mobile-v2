import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import CourierPickupCountItem from "./CourierPickupCountItem";

const CourierPickupCountList = ({ totalData }) => {
  return totalData?.length > 0 ? (
    <View style={{ marginBottom: 8 }}>
      <FlashList
        data={totalData}
        estimatedItemSize={80}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <CourierPickupCountItem
            count={item?.total_scan}
            image={item?.courier?.image}
            name={item?.courier?.name}
            length={totalData?.length}
            index={index}
          />
        )}
      />
    </View>
  ) : null;
};

export default CourierPickupCountList;
