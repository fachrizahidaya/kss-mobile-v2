import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { FlatList, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import NotificationItem from "../components/Notification/NotificationItem/NotificationItem";
import NotificationTimeStamp from "../components/Notification/NotificationTimeStamp/NotificationTimeStamp";
import axiosInstance from "../config/api";
import { useLoading } from "../hooks/useLoading";
import Screen from "../layouts/Screen";

const Notification = ({ route }) => {
  const { module, refetch } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [cumulativeNotifs, setCumulativeNotifs] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState({});
  const { isLoading: notifIsFetching, toggle: toggleNotifIsFetching } = useLoading(false);

  const navigation = useNavigation();

  const notificationFetchParameters = {
    page: currentPage,
    limit: 20,
  };

  const fetchAllNotifications = async () => {
    try {
      toggleNotifIsFetching();
      const res = await axiosInstance.get(module === "BAND" ? "/pm/notifications" : "/hr/notifications", {
        params: notificationFetchParameters,
      });
      setNotifications(res.data);
      toggleNotifIsFetching();
    } catch (error) {
      console.log(error);
      toggleNotifIsFetching();
    }
  };

  useEffect(() => {
    fetchAllNotifications();
  }, [currentPage]);

  const fetchMoreData = () => {
    if (currentPage < notifications?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (notifications?.data?.data?.length) {
      setCumulativeNotifs((prevData) => [...prevData, ...notifications?.data?.data]);
    }
  }, [notifications]);

  useFocusEffect(
    useCallback(() => {
      return async () => {
        try {
          await axiosInstance.get(module === "BAND" ? "/pm/notifications/read" : "/hr/notifications/read");
          refetch();
        } catch (error) {
          console.log(error);
        }
      };
    }, [])
  );

  return (
    <Screen
      screenTitle="Notifications"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor="#FFFFFF"
    >
      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={<RefreshControl refreshing={notifIsFetching} onRefresh={fetchAllNotifications} />}
          data={cumulativeNotifs}
          keyExtractor={(item, index) => index}
          onScrollBeginDrag={() => setIsScrolled(true)}
          onEndReachedThreshold={0.1}
          onEndReached={isScrolled ? fetchMoreData : null}
          renderItem={({ item, index }) => (
            <>
              {cumulativeNotifs[index - 1] ? (
                item?.created_at.split(" ")[0] !== cumulativeNotifs[index - 1]?.created_at.split(" ")[0] ? (
                  <NotificationTimeStamp
                    key={`${item.id}_${index}_timestamp-group`}
                    timestamp={item?.created_at.split(" ")[0]}
                  />
                ) : (
                  ""
                )
              ) : (
                <NotificationTimeStamp timestamp={item?.created_at.split(" ")[0]} />
              )}

              <NotificationItem
                name={item.from_user_name}
                modul={item.modul}
                content={item.description}
                itemId={item.reference_id}
                time={item.created_at}
                isRead={item.is_read}
                index={index}
                length={cumulativeNotifs.length}
              />
            </>
          )}
        />
      </View>
    </Screen>
  );
};

export default Notification;
