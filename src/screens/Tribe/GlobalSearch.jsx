import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import Input from "../../styles/forms/Input";
import { useFetch } from "../../hooks/useFetch";
import GlobalSearchItems from "../../components/Tribe/GlobalSearch/GlobalSearchItems/GlobalSearchItems";

const GlobalSearchTribe = () => {
  const [searchInput, setSearchInput] = useState("");
  const [shownInput, setShownInput] = useState("");

  const navigation = useNavigation();

  const { data, isFetching } = useFetch(searchInput && "/hr/global-search", [searchInput], {
    search: searchInput,
    sort: "desc",
  });

  const { data: employees } = useFetch("/hr/employees");

  /**
   * Handle show username in post
   */
  const employeeUsername = employees?.data?.map((item) => {
    return {
      username: item.username,
      id: item.id,
      name: item.name,
    };
  });

  /**
   * Handle search for employee and feed in Tribe
   */
  const handleSearch = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
    }, 500),
    []
  );

  const searchHandler = (value) => {
    handleSearch(value);
    setShownInput(value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setShownInput("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={{ gap: 15, marginHorizontal: 16, marginVertical: 13, justifyContent: "center", gap: 20 }}>
          <Input
            value={shownInput}
            placeHolder="Search"
            startAdornment={
              <Pressable>
                <MaterialCommunityIcons name="magnify" size={20} color="#3F434A" />
              </Pressable>
            }
            onChangeText={searchHandler}
            endAdornment={
              <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                {shownInput ? (
                  <Pressable onPress={handleClearSearch}>
                    <MaterialCommunityIcons name="close" size={20} color="#3F434A" />
                  </Pressable>
                ) : null}
              </View>
            }
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {!isFetching ? (
              <>
                {data?.employee?.length > 0 || data?.post?.length ? (
                  <GlobalSearchItems data={data} employeeUsername={employeeUsername} navigation={navigation} />
                ) : (
                  <Text style={styles.text}>No result</Text>
                )}
              </>
            ) : (
              <Text style={styles.text}>Data is being fetched...</Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default GlobalSearchTribe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#8A9099",
    textAlign: "center",
  },
});
