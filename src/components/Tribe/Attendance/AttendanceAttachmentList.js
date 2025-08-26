import { ActivityIndicator, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";

import AttendanceAttachmentItem from "./AttendanceAttachmentItem";

const AttendanceAttachmentList = ({
  data,
  isFetching,
  refetch,
  setAttachmentId,
  toggleImage,
  isFullScreen,
  setIsFullScreen,
  setSelectedPicture,
  confirmationStatus,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.1}
        estimatedItemSize={30}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />
        }
        ListFooterComponent={() => isFetching && <ActivityIndicator />}
        renderItem={({ item, index }) => (
          <AttendanceAttachmentItem
            key={index}
            file_path={item?.file_path}
            title={item?.title}
            begin_date={item?.begin_date}
            end_date={item?.end_date}
            setAttachmentId={setAttachmentId}
            id={item?.id}
            index={index}
            length={data?.length}
            toggleImage={toggleImage}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            setSelectedPicture={setSelectedPicture}
            confirmationStatus={confirmationStatus}
          />
        )}
      />
    </View>
  );
};

export default AttendanceAttachmentList;
