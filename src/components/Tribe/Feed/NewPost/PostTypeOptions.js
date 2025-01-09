import { View, Text, StyleSheet, Platform, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import CustomDateTimePicker from "../../../../styles/timepicker/CustomDateTimePicker";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomSheet from "../../../../layouts/CustomSheet";
import { Colors } from "../../../../styles/Color";

const PostTypeOptions = ({
  togglePublic,
  formik,
  toggleAnnouncement,
  isAnnouncementSelected,
  dateShown,
  handleEndDataOfAnnouncement,
  reference,
}) => {
  return (
    <CustomSheet reference={reference}>
      <Text style={[{ fontSize: 16 }, TextProps]}>Choose Post Type</Text>
      <View style={{ gap: 1, backgroundColor: "#F5F5F5", borderRadius: 10 }}>
        <Pressable
          onPress={togglePublic}
          style={[styles.container, { height: 50 }]}
        >
          <View style={styles.content}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialIcons name="people" size={15} color={Colors.iconDark} />
              <Text style={[{ fontSize: 12 }, TextProps]}>Public</Text>
            </View>
          </View>
          {formik.values.type === "Public" ? (
            <MaterialCommunityIcons name="check" color={Colors.iconDark} />
          ) : (
            ""
          )}
        </Pressable>

        <Pressable onPress={toggleAnnouncement} style={styles.container}>
          <View style={styles.content}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialCommunityIcons
                name="bullhorn"
                size={15}
                color={Colors.iconDark}
              />
              <View>
                <Text style={[{ fontSize: 12 }, TextProps]}>Announcement</Text>
                {Platform.OS === "android" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Text style={[{ fontSize: 12 }, TextProps]}>
                      End Date must be provided
                    </Text>
                    {isAnnouncementSelected && dateShown ? (
                      <CustomDateTimePicker
                        defaultValue={formik.values.end_date}
                        onChange={handleEndDataOfAnnouncement}
                        withText={true}
                        textLabel="Adjust date"
                        fontSize={12}
                      />
                    ) : null}
                  </View>
                ) : (
                  <View style={{ gap: 5 }}>
                    <Text style={[{ fontSize: 12 }, TextProps]}>
                      End Date must be provided
                    </Text>
                    {isAnnouncementSelected && dateShown ? (
                      <CustomDateTimePicker
                        defaultValue={formik.values.end_date}
                        onChange={handleEndDataOfAnnouncement}
                        fontSize={12}
                        marginLeft={-15}
                      />
                    ) : null}
                  </View>
                )}
              </View>
            </View>
          </View>
          {formik.values.type === "Announcement" ? (
            <MaterialCommunityIcons
              name="check"
              color={Colors.iconDark}
              style={{ marginLeft: Platform.OS == "ios" ? -10 : null }}
            />
          ) : (
            ""
          )}
        </Pressable>
      </View>
    </CustomSheet>
  );
};

export default PostTypeOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGrey,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
