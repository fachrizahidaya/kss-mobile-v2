import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { SafeAreaView, View, Pressable, Text, Image, Dimensions, StyleSheet } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../styles/AvatarPlaceholder";
import { useFetch } from "../hooks/useFetch";
import { useWebsocketContext } from "../hoc/WebsocketContextProvider";
import InAppNotificationCard from "./InAppNotificationCard";
import { useDisclosure } from "../hooks/useDisclosure";
import { TextProps } from "../styles/CustomStylings";

const Header = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const userSelector = useSelector((state) => state.auth);
  const moduleSelector = useSelector((state) => state.module);
  const [routeName, setRouteName] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadNotificationList, setUnreadNotificationList] = useState([]);
  const [currentPage] = useState(1);
  const [messageData, setMessageData] = useState(null);

  const {
    isOpen: notificationCardIsOpen,
    open: openNotificationCard,
    toggle: toggleNotificationCard,
  } = useDisclosure(false);
  const { laravelEcho } = useWebsocketContext();
  const { data: myProfile } = useFetch("/hr/my-profile");
  const { data: notifications, refetch: refetchNotifications } = useFetch(
    moduleSelector.module_name === "BAND" ? "/pm/notifications/new" : "/hr/notifications/new"
  );

  const userFetchParameters = {
    page: currentPage,
    limit: 1000,
  };
  const { data: unreads } = useFetch("/chat/unread-message");

  const { data: user } = useFetch("/chat/user", [currentPage], userFetchParameters);

  /**
   * Handle for mention name in group member
   */
  const userNameHandler = user?.data?.data.map((item) => {
    return item?.name;
  });

  const screenWidth = Dimensions.get("screen");

  /**
   * Unread messages changes event listener
   */
  const unreadMessagesEvent = () => {
    laravelEcho?.channel(`unread.message.${userSelector?.id}`)?.listen(".unread.message", (event) => {
      openNotificationCard();
      setUnreadMessages(event);
      setMessageData(event?.notification?.message);
    });
  };

  useEffect(() => {
    const unreadData = notifications?.data.filter((val) => {
      return val.is_read == 0;
    });
    setUnreadNotificationList(unreadData || []);
  }, [notifications]);

  useEffect(() => {
    setInterval(() => {
      refetchNotifications();
    }, 300000);
    refetchNotifications();
  }, [moduleSelector.module_name]);

  useEffect(() => {
    if (unreads) {
      setUnreadMessages({ data: { total_unread: unreads.data.total_unread } });
    }
  }, [unreads]);

  useEffect(() => {
    if (userSelector.id) {
      unreadMessagesEvent();
    }
  }, []);

  useEffect(() => {
    const { routes } = navigation.getState();

    const filteredRoutes = routes.filter((route) => route.name !== "Chat Room");
    setRouteName(filteredRoutes);

    navigation.reset({
      index: filteredRoutes.length - 1,
      routes: filteredRoutes,
    });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <View style={styles.wrapper}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {/* {routeName[1]?.name === "Chat List" && (
            <MaterialCommunityIcons name="chevron-left" size={20} onPress={() => navigation.goBack()} color="#3F434A" />
          )} */}
          <Pressable onPress={() => navigation.navigate("Setting Screen")}>
            <AvatarPlaceholder size="md" image={userSelector.image} name={userSelector.name} isThumb={false} />
          </Pressable>

          <View>
            <Text style={[{ fontWeight: 700, fontSize: 18, lineHeight: 24 }, TextProps]}>
              {userSelector.name.length > 30 ? userSelector.name.split(" ")[0] : userSelector.name}
            </Text>

            {myProfile?.data && (
              // adjust for the position font properties
              <Text
                style={[{ fontSize: 14, overflow: "hidden", maxWidth: screenWidth.width - 180 }, TextProps]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {myProfile.data.position_name || "You have no position"}
              </Text>
            )}
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          {routeName[1]?.name !== "Chat List" ? (
            <View style={{ position: "relative" }}>
              <Pressable
                onPress={() => {
                  if (routes.name == "Notification") {
                    navigation.goBack();
                  } else {
                    navigation.navigate("Notification", {
                      module: moduleSelector.module_name,
                      refetch: refetchNotifications,
                    });
                  }
                }}
              >
                <MaterialCommunityIcons name="bell-outline" size={20} color="#3F434A" />
              </Pressable>

              {unreadNotificationList?.length > 0 && (
                <View style={styles.notification}>
                  <Text style={{ fontSize: 12, textAlign: "center", color: "#FFFFFF" }}>
                    {unreadNotificationList.length <= 5 ? unreadNotificationList.length : "5+"}
                  </Text>
                </View>
              )}
            </View>
          ) : null}

          <Pressable
            onPress={() => {
              if (
                routeName[0]?.state?.routeNames[2] !== "Setting Tribe" &&
                routeName[0]?.state?.routeNames[2] !== "Setting Band"
              ) {
                navigation.navigate("Chat List");
              }
            }}
            style={{ position: "relative" }}
          >
            {!routeName[0]?.state?.routeNames[2].includes("Tribe") &&
              !routeName[0]?.state?.routeNames[2].includes("Band") &&
              unreadMessages?.data?.total_unread > 0 && (
                <View
                  style={{
                    height: 22,
                    width: 22,
                    position: "absolute",
                    top: -12,
                    right: -8,
                    backgroundColor: routeName[1]?.name === "Chat List" ? "#FFFFFF" : "#FD7972",
                    borderRadius: 50,
                    zIndex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {routeName[1]?.name === "Chat List" ? null : (
                    <Text style={{ fontSize: 12, textAlign: "center", color: "#FFFFFF" }}>
                      {unreadMessages?.data?.total_unread <= 5 ? unreadMessages?.data?.total_unread : "5+"}
                    </Text>
                  )}
                </View>
              )}

            {routeName[1]?.name === "Chat List" ? null : (
              <Image source={require("../assets/icons/nest_logo.png")} alt="Nest" style={{ height: 30, width: 30 }} />
            )}
          </Pressable>
        </View>

        <InAppNotificationCard
          message={unreadMessages?.notification}
          isOpen={notificationCardIsOpen}
          close={toggleNotificationCard}
          memberName={userNameHandler}
          messageData={messageData}
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#E8E9EB",
    position: "relative",
    margin: 0,
  },
  notification: {
    height: 22,
    width: 22,
    position: "absolute",
    top: -12,
    right: -8,
    backgroundColor: "#FD7972",
    borderRadius: 50,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
