import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../styles/Screen";

const Company = () => {
  const userSelector = useSelector((state) => state.auth);
  const navigation = useNavigation();

  return (
    <Screen screenTitle="My Company" returnButton={true} onPress={() => navigation.goBack()} backgroundColor="#FFFFFF">
      <View style={{ marginVertical: 14, marginHorizontal: 16, gap: 24 }}>
        <View>
          <Text style={TextProps}>
            This account is under subscription of{" "}
            <Text style={[{ fontWeight: "bold" }, TextProps]}>{userSelector.company}</Text>
          </Text>
        </View>
        <View>
          <Text style={[{ fontWeight: "bold" }, TextProps]}>Address:</Text>
          <Text style={TextProps}>
            Jl. Raya Pajajaran No.14 No 62, RT.002/RW.005, Gandasari, Kec. Jatiuwung, Kabupaten Tangerang, Banten 15137
          </Text>
        </View>
        <View>
          <Text style={[{ fontWeight: "bold" }, TextProps]}>Phone:</Text>
          <Text style={TextProps}>+62 21 588 8220</Text>
        </View>
        <View>
          <Text style={[{ fontWeight: "bold" }, TextProps]}>Email:</Text>
          <Text style={TextProps}>{userSelector.email}</Text>
        </View>
      </View>
    </Screen>
  );
};

export default Company;
