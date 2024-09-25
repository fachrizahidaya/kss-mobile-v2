import { useRoute, useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

import { FlashList } from "@shopify/flash-list";

import FAQCard from "../../../components/Setting/FAQ/FAQCard";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";

const FAQDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { data, name, description } = route.params;
  return (
    <Screen screenTitle={name} returnButton={true} onPress={() => navigation.goBack()}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {description && <Text style={[TextProps, { marginHorizontal: 16, marginTop: 14 }]}>{description}</Text>}
          <FlashList
            data={data}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            estimatedItemSize={60}
            renderItem={({ item, index }) => (
              <FAQCard key={index} question={item.question} answer={item.answer} index={index} length={data?.length} />
            )}
          />
        </View>
      </View>
    </Screen>
  );
};

export default FAQDetail;
