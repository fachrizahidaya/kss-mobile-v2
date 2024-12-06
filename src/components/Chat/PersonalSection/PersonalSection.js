import { memo } from "react";

import { StyleSheet, View, Text, Pressable } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ContactListItem from "../ContactListItem/ContactListItem";
import { Colors } from "../../../styles/Color";

const PersonalSection = ({
  personalChats,
  searchKeyword,
  searchResult,
  handleClickMore,
  handlePinControl,
  navigation,
  userSelector,
  menuOptions,
  setRequest,
  setError,
  toggleAlert,
}) => {
  const renderActionSheet = () =>
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.wrapper}>
            <View style={{ gap: 1, backgroundColor: Colors.backgroundLight, borderRadius: 10 }}>
              {menuOptions.map((option, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={option.onPress}
                    style={[
                      styles.container,
                      { justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: Colors.borderWhite },
                    ]}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>{option.name}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              style={[{ justifyContent: "center" }, styles.container]}
              onPress={() => SheetManager.hide("form-sheet")}
            >
              <Text style={{ fontSize: 16, fontWeight: "400", color: Colors.primary }}>Cancel</Text>
            </Pressable>
          </View>
        ),
      },
    });

  return !searchKeyword ? (
    <>
      <View style={styles.header}>
        <Text style={{ fontWeight: "500", opacity: 0.5 }}>PEOPLE</Text>

        <Pressable style={[styles.addButton]} onPress={renderActionSheet}>
          <MaterialIcons name="add" size={15} color={Colors.iconDark} />
        </Pressable>
      </View>

      {personalChats.length > 0 &&
        personalChats.map((personal) => {
          return (
            <ContactListItem
              chat={personal}
              type="personal"
              key={personal.id}
              id={personal.id}
              userId={personal?.user?.id}
              name={personal.user?.name}
              image={personal.user?.image}
              position={personal.user?.employee?.position?.position?.name}
              email={personal.user?.email}
              message={personal.latest_message?.message}
              latest={personal.latest_message}
              fileName={personal.latest_message?.file_name}
              project={personal.latest_message?.project_id}
              task={personal.latest_message?.task_id}
              isDeleted={personal.latest_message?.delete_for_everyone}
              time={personal.latest_message?.created_time}
              timestamp={personal.latest_message?.created_at}
              isRead={personal.unread}
              isPinned={personal?.pin_personal}
              active_member={0}
              handleClickMore={handleClickMore}
              handleTogglePin={handlePinControl}
              navigation={navigation}
              userSelector={userSelector}
              attendance_today={personal?.user?.employee?.attendance_today}
              setRequest={setRequest}
              setError={setError}
              toggleAlert={toggleAlert}
            />
          );
        })}
    </>
  ) : (
    <>
      {searchResult?.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={{ fontWeight: "500", opacity: 0.5 }}>PEOPLE</Text>

            <Pressable style={styles.addButton} onPress={() => navigation.navigate("New Chat")}>
              <MaterialIcons name="add" color={Colors.iconDark} size={15} />
            </Pressable>
          </View>

          {searchResult.map((personal) => {
            return (
              <ContactListItem
                chat={personal}
                type="personal"
                key={personal.id}
                id={personal.id}
                userId={personal.user?.id}
                name={personal.user?.name}
                image={personal.user?.image}
                position={personal.user?.employee?.position?.position?.name}
                email={personal.user?.email}
                message={personal.latest_message?.message}
                latest={personal.latest_message}
                fileName={personal.latest_message?.file_name}
                project={personal.latest_message?.project_id}
                task={personal.latest_message?.task_id}
                isDeleted={personal.latest_message?.delete_for_everyone}
                time={personal.latest_message?.created_time}
                isRead={personal.unread}
                timestamp={personal.latest_message?.created_at}
                isPinned={personal?.pin_personal}
                active_member={0}
                handleClickMore={handleClickMore}
                handleTogglePin={handlePinControl}
                searchKeyword={searchKeyword}
                navigation={navigation}
                userSelector={userSelector}
                attendance_today={personal?.user?.employee?.attendance_today}
                setRequest={setRequest}
                setError={setError}
                toggleAlert={toggleAlert}
              />
            );
          })}
        </>
      ) : null}
    </>
  );
};

export default memo(PersonalSection);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: "#f1f2f3",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 8,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
});
