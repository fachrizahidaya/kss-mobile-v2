import { FlashList } from "@shopify/flash-list";

import CourierPickupCountItem from "./CourierPickupCountItem";

const CourierPickupCountList = ({ totalData }) => {
  return totalData?.length > 0 ? (
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
  ) : null;
};

export default CourierPickupCountList;
