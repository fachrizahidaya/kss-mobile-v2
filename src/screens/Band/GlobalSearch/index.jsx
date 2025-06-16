import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import _ from "lodash";

import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import Input from "../../../styles/forms/Input";
import { useFetch } from "../../../hooks/useFetch";
import GlobalSearchItems from "../../../components/Band/GlobalSearch/GlobalSearchItems/GlobalSearchItems";
import { Colors } from "../../../styles/Color";

const GlobalSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [shownInput, setShownInput] = useState("");

  const navigation = useNavigation();
  const { data, isFetching } = useFetch(searchInput && "/pm/global-search", [searchInput], {
    search: searchInput,
    sort: "desc",
  });

  const handleSearch = useCallback(
    _.debounce((value) => {
      setSearchInput(value);
    }, 500),
    []
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            gap: 15,
            marginHorizontal: 16,
            marginVertical: 13,
            justifyContent: "center",
            gap: 20,
            paddingBottom: 20,
          }}
        >
          <Input
            value={shownInput}
            placeHolder="Search"
            startAdornment={
              <Pressable>
                <MaterialCommunityIcons name="magnify" size={20} color={Colors.iconDark} />
              </Pressable>
            }
            onChangeText={(value) => {
              handleSearch(value);
              setShownInput(value);
            }}
            endAdornment={
              <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                {shownInput && (
                  <Pressable
                    onPress={() => {
                      setSearchInput("");
                      setShownInput("");
                    }}
                  >
                    <MaterialCommunityIcons name="close" size={20} color={Colors.iconDark} />
                  </Pressable>
                )}
              </View>
            }
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {!isFetching ? (
              <>
                {data?.project?.length > 0 || data?.task?.length || data?.team?.length ? (
                  <GlobalSearchItems data={data} keyword={searchInput} navigation={navigation} />
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

export default GlobalSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  text: {
    color: Colors.fontGrey,
    textAlign: "center",
  },
});
