import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlashList } from "@shopify/flash-list";

import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";
import Select from "../../../../styles/forms/Select";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";

const screenHeight = Dimensions.get("window").height;

const NewLiveSessionForm = ({ items, handleSelect, selected, brands, brand, handleBrand }) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={{ marginHorizontal: 16 }}>
        <Text style={[TextProps]}>Session</Text>
      </View>
      <View style={{ gap: 8, height: screenHeight - 660 }}>
        {items ? (
          <FlashList
            data={items}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            refreshing={true}
            estimatedItemSize={80}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(item?.value)}
                style={[styles.session, { marginBottom: index === items?.length - 1 ? 14 : null }]}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text>{item?.label}</Text>
                  {selected === item?.value ? <MaterialCommunityIcons name="check" size={20} color="#3F434A" /> : null}
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <EmptyPlaceholder text="No Data" />
        )}
      </View>
      {/* <Select title="Session" items={items} value={brand} placeHolder="Select session" onChange={handleSelect} /> */}
      {/* <Select title="Brand" items={brands} value={brand} placeHolder="Select brand" onChange={handleBrand} /> */}
      <View style={{ marginHorizontal: 16 }}>
        <Text style={[TextProps]}>Brand</Text>
      </View>
      <View style={{ gap: 8, height: screenHeight - 660 }}>
        {brands ? (
          <FlashList
            data={brands}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            refreshing={true}
            estimatedItemSize={80}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(item?.value)}
                style={[styles.session, { marginBottom: index === brands?.length - 1 ? 14 : null }]}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text>{item?.label}</Text>
                  {selected === item?.value ? <MaterialCommunityIcons name="check" size={20} color="#3F434A" /> : null}
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <EmptyPlaceholder text="No Data" />
        )}
      </View>
    </View>
  );
};

export default NewLiveSessionForm;

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginHorizontal: 16,
    gap: 10,
  },
  session: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 14,
  },
});
