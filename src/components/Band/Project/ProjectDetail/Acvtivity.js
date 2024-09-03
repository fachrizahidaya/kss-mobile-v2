import dayjs from "dayjs";

import { FlashList } from "@shopify/flash-list";
import { Pressable, ScrollView, Text, View } from "react-native";

import { TextProps } from "../../../../styles/CustomStylings";
import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";

const Acvtivity = ({ data, navigation }) => {
  return (
    <ScrollView style={{ maxHeight: 400 }}>
      <View style={{ flex: 1, minHeight: 2 }}>
        <FlashList
          data={data}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          estimatedItemSize={191}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                if (item.modul === "Task") {
                  navigation.navigate("Task Detail", { taskId: item.reference_id });
                } else if (item.modul === "Project") {
                  navigation.navigate("Project Detail", { projectId: item.reference_id });
                }
              }}
            >
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 8 }}>
                <AvatarPlaceholder name={item.user_name} image={item.user_image} style={{ marginTop: 4 }} size="xs" />

                <View>
                  <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
                    <Text style={[{ fontWeight: "500" }, TextProps]}>{item?.user_name.split(" ")[0]}</Text>
                    <Text style={TextProps}>{dayjs(item?.created_at).fromNow()}</Text>
                  </View>

                  <View>
                    <Text style={TextProps}>{item?.description}</Text>

                    <Text style={[{ width: 300 }, TextProps]} numberOfLines={2}>
                      {item.object_title}
                      <Text style={{ color: "#377893" }}> #{item.reference_no}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Acvtivity;
