import { memo } from "react";

import { View, Text, Pressable, StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import SearchBox from "./SearchBox";
import { TextProps } from "../../../styles/CustomStylings";
import ContactDescription from "./ContactDescription";
import { Colors } from "../../../styles/Color";

const ChatHeader = ({
  name,
  image,
  position,
  email,
  type,
  active_member,
  handleToggleExitModal,
  handleToggleDeleteGroupModal,
  loggedInUser,
  handleToggleDeleteModal,
  roomId,
  isLoading,
  handleUpdatePin,
  isPinned,
  navigation,
  searchMessage,
  setSearchMessage,
  searchFormRef,
  searchVisible,
  groupName,
  toggleSearch,
  calendarRef,
  attendance_today,
}) => {
  const optionsArr =
    type === "personal"
      ? [
          // {
          //   name: "Search",
          //   onPress: () => toggleSearch(),
          // },
          {
            name: `${isPinned?.pin_chat ? "Unpin Chat" : "Pin Chat"}`,
            onPress: () => handleUpdatePin(),
          },
          {
            name: "Delete Chat",
            onPress: () => handleToggleDeleteModal(),
          },
        ]
      : [
          // {
          //   name: "Search",
          //   onPress: () => toggleSearch(),
          // },
          {
            name: `${isPinned?.pin_chat ? "Unpin Chat" : "Pin Chat"}`,
            onPress: () => handleUpdatePin(),
          },
          type === "group" && active_member === 1
            ? {
                name: "Exit Group",
                onPress: () => handleToggleExitModal(),
              }
            : {
                name: "Delete Group",
                onPress: () => handleToggleDeleteGroupModal(),
              },
        ];

  const params = {
    name: name,
    image: image,
    position: position,
    type: type,
    roomId: roomId,
    loggedInUser: loggedInUser,
    active_member: active_member,
  };

  const renderHeaderOptions = () => (
    <View style={styles.wrapper}>
      <View style={{ gap: 1, backgroundColor: "#F5F5F5", borderRadius: 10 }}>
        {optionsArr.map((item, index) => {
          return (
            <Pressable key={index} style={styles.content} onPress={item.onPress}>
              <Text style={[{ fontSize: 16 }, TextProps]}>{item.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <ContactDescription
          name={name}
          image={image}
          email={email}
          isLoading={isLoading}
          navigation={navigation}
          params={params}
          concatenatedNames={groupName}
          type={type}
          attendance_today={attendance_today}
        />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Pressable
            style={{ marginRight: 1 }}
            onPress={() => calendarRef.current?.show()}
          >
            <MaterialIcons name="calendar-today" size={20} color={Colors.iconDark} />
          </Pressable>
          <Pressable
            style={{ marginRight: 1 }}
            onPress={() =>
              SheetManager.show("form-sheet", {
                payload: {
                  children: renderHeaderOptions(),
                },
              })
            }
          >
            <MaterialIcons name="more-horiz" size={20} color={Colors.iconDark} />
          </Pressable>
        </View>
      </View>

      {/* Handle for search message */}
      {searchVisible && (
        <SearchBox
          onToggleSearch={toggleSearch}
          searchMessage={searchMessage}
          setSearchMessage={setSearchMessage}
          searchFormRef={searchFormRef}
        />
      )}
    </>
  );
};

export default memo(ChatHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundLight,
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGrey,
  },
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
});
