import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlashList } from "@shopify/flash-list";

import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";

const screenHeight = Dimensions.get("window").height;

const NewLiveSessionForm = ({ sessions, handleSelect, selected, brands, brandSelected, handleBrand }) => {
  const handleSelectBrand = (value) => {
    if (sessions?.length > 0) {
      handleBrand(value);
    }
  };

  const renderSession = () => {
    if (sessions?.length > 0) {
      return (
        <FlashList
          data={sessions}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          refreshing={true}
          estimatedItemSize={50}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(item?.value)}
              style={[styles.item, { marginBottom: index === sessions?.length - 1 ? 14 : null }]}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[TextProps]}>{item?.label}</Text>
                {selected === item?.value && <MaterialCommunityIcons name="check" size={20} color={Colors.iconDark} />}
              </View>
            </TouchableOpacity>
          )}
        />
      );
    } else if (sessions?.length < 0) {
      <EmptyPlaceholder text="You already have an active session" />;
    } else {
      <EmptyPlaceholder text="No Data" />;
    }
  };

  return (
    <View style={{ gap: 10 }}>
      <View style={{ marginHorizontal: 16 }}>
        <Text style={[TextProps]}>Session</Text>
      </View>
      <View style={{ gap: 8, height: screenHeight - 600 }}>{renderSession()}</View>

      <View style={{ marginHorizontal: 16 }}>
        <Text style={[TextProps]}>Brand</Text>
      </View>
      <View style={{ gap: 8, height: screenHeight - 600 }}>
        {brands?.length > 0 ? (
          <FlashList
            data={brands}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            refreshing={true}
            estimatedItemSize={50}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectBrand(item?.value)}
                style={[styles.item, { marginBottom: index === brands?.length - 1 ? 14 : null }]}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text style={[TextProps]}>{`${
                    item?.label === "Morning Whistle" ? "MW" : item?.label === "Terry Palmer" ? "TP" : "MP"
                  } - ${item?.label}`}</Text>
                  {brandSelected === item?.value && (
                    <MaterialCommunityIcons name="check" size={20} color={Colors.iconDark} />
                  )}
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
  item: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 14,
  },
});
