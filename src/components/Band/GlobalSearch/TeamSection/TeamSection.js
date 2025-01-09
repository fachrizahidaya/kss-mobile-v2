import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RenderHTML from "react-native-render-html";
import { Colors } from "../../../../styles/Color";

const TeamSection = ({ teams, keyword, navigation }) => {
  const { width } = Dimensions.get("screen");

  const boldMatchCharacters = (sentence = "", characters = "") => {
    const regex = new RegExp(characters, "gi");
    return sentence.replace(regex, `<strong style="color: #176688;">$&</strong>`);
  };

  const renderItem = (team) => {
    return boldMatchCharacters(team, keyword);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontWeight: "500", color: Colors.primary }}>TEAMS</Text>

      {teams.map((team) => (
        <Pressable
          style={styles.item}
          key={team.id}
          onPress={() => navigation.navigate("My Team", { passedTeam: team })}
        >
          <View style={styles.icon}>
            <MaterialCommunityIcons name="account-group" size={20} color={Colors.primary} />
          </View>

          <View style={{ flex: 1 }}>
            <RenderHTML
              contentWidth={width}
              source={{
                html: renderItem(team.name),
              }}
            />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default TeamSection;

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  icon: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: Colors.borderGrey,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
});
