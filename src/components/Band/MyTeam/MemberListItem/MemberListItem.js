import { SheetManager } from "react-native-actions-sheet";

import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";

const MemberListItem = ({
  member,
  name,
  image,
  email,
  totalProjects,
  totalTasks,
  master,
  loggedInUser,
  openRemoveMemberModal,
}) => {
  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string?.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  const userInitialGenerator = () => {
    const nameArray = name?.split(" ");
    let alias = "";

    if (nameArray?.length >= 2) {
      alias = nameArray[0][0] + nameArray[1][0];
    } else {
      alias = nameArray[0][0];
    }

    return alias;
  };

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, position: "relative" }}>
        {image ? (
          <Image
            style={{ height: 63, width: 63, resizeMode: "contain", borderRadius: 10 }}
            source={{ uri: `${process.env.EXPO_PUBLIC_API}/image/${image}` }}
            alt={`${name} avatar`}
          />
        ) : (
          <View
            style={{
              height: 63,
              width: 63,
              backgroundColor: stringToColor(name),
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: 500, fontSize: 20, color: "#FFFFFF" }}>{userInitialGenerator()}</Text>
          </View>
        )}

        <View>
          <Text style={[{ width: 125 }, TextProps]} numberOfLines={2}>
            {name}
          </Text>

          {master === name && <MaterialCommunityIcons name="shield-account-variant" size={20} color="#FFD240" />}
        </View>

        <View style={{ position: "absolute", bottom: 0, right: 0, flexDirection: "row", gap: 10 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={[{ opacity: 0.5 }, TextProps]}>Task</Text>
            <Text style={TextProps}>{totalTasks}</Text>
          </View>

          <View style={{ borderWidth: 1, borderColor: "#E8E9EB" }} />

          <View style={{ alignItems: "center" }}>
            <Text style={[{ opacity: 0.5 }, TextProps]}>Project</Text>
            <Text style={TextProps}>{totalProjects}</Text>
          </View>
        </View>

        {loggedInUser === master && (
          <>
            {name !== master && (
              <Pressable
                style={{ position: "absolute", top: -5, right: -5, borderRadius: 50 }}
                onPress={() =>
                  SheetManager.show("form-sheet", {
                    payload: {
                      children: (
                        <View style={styles.menu}>
                          <View style={styles.wrapper}>
                            <TouchableOpacity
                              onPress={async () => {
                                await SheetManager.hide("form-sheet");
                                openRemoveMemberModal(member);
                              }}
                              style={styles.menuItem}
                            >
                              <Text style={{ fontSize: 16, fontWeight: 700, color: "#EB0E29" }}>Remove member</Text>
                              <MaterialCommunityIcons name="trash-can-outline" color="#EB0E29" size={20} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ),
                    },
                  })
                }
              >
                <MaterialCommunityIcons name="dots-vertical" size={20} color="#3F434A" />
              </Pressable>
            )}
          </>
        )}
      </View>

      <View style={{ borderWidth: 1, borderColor: "#E8E9EB" }} />

      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={TextProps}>Email:</Text>
          <Text style={TextProps}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

export default MemberListItem;

const styles = StyleSheet.create({
  card: {
    gap: 23,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    // shadowColor: "rgba(0, 0, 0, 0.3)",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
    marginVertical: 4,
    marginHorizontal: 14,
  },
  menu: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
});
