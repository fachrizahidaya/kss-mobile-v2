import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import Options from "../../../components/Setting/Account/Options";
import Button from "../../../styles/forms/Button";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

const Account = ({ route }) => {
  const { profile } = route.params;

  const userSelector = useSelector((state) => state.auth);

  const navigation = useNavigation();

  return (
    <Screen
      screenTitle="My KSS Account"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor={Colors.secondary}
    >
      <ScrollView>
        <View style={{ marginHorizontal: 16, marginVertical: 14, gap: 10 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AvatarPlaceholder
              borderRadius="full"
              size="xl"
              name={userSelector?.name}
              image={userSelector?.image}
              isThumb={false}
            />
            <Text style={[{ fontSize: 20, fontWeight: "700" }, TextProps]}>{userSelector?.name}</Text>
            <Text style={[TextProps]}>{profile?.data?.email}</Text>
          </View>
          <View style={{ backgroundColor: Colors.secondary, gap: 30 }}>
            <Options profile={profile} navigation={navigation} />

            {/* <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#FAFAFA",
              borderRadius: 9,
              height: 42,
              paddingVertical: 8,
              paddingHorizontal: 12,
              opacity: 0.5,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <View style={{ flexDirection: "row", gap: 1 }}>
                <Text style={{ fontWeight: "bold", color: "#176688" }}>KSS</Text>
                <Text style={[{ fontWeight: 400 }, TextProps]}>Drive | </Text>
                <Text style={{ fontWeight: 400, color: "#176688" }}>2 TB</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontWeight: 400, color: "#176688" }}>Upgrade</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
            </View>
          </Pressable> */}

            {/* <Button padding={10} onPress={() => navigation.navigate("Log Out")} backgroundColor="#FAFAFA">
              <Text style={{ color: "red" }}>Log out</Text>
            </Button> */}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Account;
