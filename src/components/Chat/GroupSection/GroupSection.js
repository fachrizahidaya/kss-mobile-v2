import { memo } from "react";

import { StyleSheet, View, Text, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ContactListItem from "../ContactListItem/ContactListItem";
import { Colors } from "../../../styles/Color";

const GroupSection = ({
  groupChats,
  searchKeyword,
  searchResult,
  handleClickMore,
  handlePinControl,
  navigation,
  userSelector,
  setRequest,
  setError,
  toggleAlert,
}) => {
  return !searchKeyword ? (
    <>
      <View style={styles.header}>
        <Text style={{ fontWeight: "500", opacity: 0.5 }}>TEAMS</Text>

        <Pressable style={styles.addButton} onPress={() => navigation.navigate("Group Participant")}>
          <MaterialIcons name="add" color={Colors.iconDark} size={15} />
        </Pressable>
      </View>

      {groupChats.length > 0 &&
        groupChats.map((group) => (
          <ContactListItem
            chat={group}
            key={group.id}
            id={group.id}
            name={group.name}
            image={group.image}
            position={null}
            email={null}
            latest={group.latest_message}
            message={group.latest_message?.message}
            fileName={group.latest_message?.file_name}
            project={group.latest_message?.project_id}
            task={group.latest_message?.task_id}
            isDeleted={group.latest_message?.delete_for_everyone}
            time={group.latest_message?.created_time}
            timestamp={group.latest_message?.created_at}
            isRead={group.unread}
            isPinned={group?.pin_group}
            type="group"
            active_member={group?.active_member}
            handleClickMore={handleClickMore}
            handleTogglePin={handlePinControl}
            navigation={navigation}
            userSelector={userSelector}
            setRequest={setRequest}
            setError={setError}
            toggleAlert={toggleAlert}
          />
        ))}
    </>
  ) : (
    <>
      {searchResult?.length > 0 && (
        <>
          <View style={styles.header}>
            <Text style={{ fontWeight: "500", opacity: 0.5 }}>TEAMS</Text>

            <Pressable style={styles.addButton} onPress={() => navigation.navigate("Group Participant")}>
              <MaterialIcons name="add" color={Colors.iconDark} size={15} />
            </Pressable>
          </View>

          {searchResult.map((group) => {
            return (
              <ContactListItem
                chat={group}
                key={group.id}
                id={group.id}
                name={group.name}
                image={group.image}
                position={null}
                email={null}
                message={group.latest_message?.message}
                fileName={group.latest_message?.file_name}
                project={group.latest_message?.project_id}
                task={group.latest_message?.task_id}
                isDeleted={group.latest_message?.delete_for_everyone}
                time={group.latest_message?.created_time}
                timestamp={group.latest_message?.created_at}
                isRead={group.unread}
                isPinned={group?.pin_group}
                type="group"
                active_member={group?.active_member}
                handleClickMore={handleClickMore}
                handleTogglePin={handlePinControl}
                searchKeyword={searchKeyword}
                navigation={navigation}
                userSelector={userSelector}
                setRequest={setRequest}
                setError={setError}
                toggleAlert={toggleAlert}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default memo(GroupSection);

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
});
