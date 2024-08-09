import { Dimensions, Pressable, Text, View } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { BarChart } from "react-native-gifted-charts";
import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";

const SalesTrend = ({ sumByMonth }) => {
  const screenWidth = Dimensions.get("window").width - 130;
  const valuePerMonth = [];

  for (const monthYear in sumByMonth) {
    valuePerMonth.push(sumByMonth[monthYear]);
  }

  const barData = [
    { value: 1000000000, label: "May 24" },
    { value: 2000000000, label: "Jun 24" },
    { value: 3000000000, label: "Jul 24" },
  ];

  return (
    <Pressable style={[card.card]}>
      <View style={{ gap: 20 }}>
        <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Sales Trend</Text>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <BarChart
            width={screenWidth}
            noOfSections={3}
            frontColor={"#377893"}
            barWidth={35}
            data={barData}
            initialSpacing={60}
            yAxisTextStyle={{ color: "#3F434A" }}
            xAxisLabelTextStyle={{ color: "#3F434A" }}
            spacing={30}
            yAxisLabelWidth={35}
            yAxisColor={"#E8E9EB"}
            xAxisColor={"#E8E9EB"}
            barBorderTopRightRadius={5}
            barBorderTopLeftRadius={5}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default SalesTrend;
