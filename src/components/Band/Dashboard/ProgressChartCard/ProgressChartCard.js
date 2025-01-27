import { memo } from "react";

import { View, Text } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";
import CustomCard from "../../../../layouts/CustomCard";

const ProgressChartCard = ({ data, open, onProgress, finish, navigation }) => {
  const color = [
    "rgba(23, 102, 136, 0.2)",
    "rgba(252, 210, 65, 0.2)",
    "rgba(255, 150, 93, 0.2)",
  ];

  const chartConfig = {
    backgroundGradientFrom: Colors.secondary,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: Colors.secondary,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1, index) => color[index],
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <CustomCard handlePress={() => navigation.navigate("Tasks")}>
      <Text style={[{ fontSize: 20, fontWeight: "500" }, TextProps]}>
        This Year Tasks
      </Text>
      <View>
        <ProgressChart
          data={data}
          width={200}
          height={200}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={true}
          withCustomBarColorFromData={true}
          center={true}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>

      <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 50,
              backgroundColor: Colors.primary,
            }}
          />
          <Text style={[{ fontSize: 24, fontWeight: "600" }, TextProps]}>
            {open}
          </Text>
          <Text style={TextProps}>Open</Text>
        </View>

        <View style={{ borderWidth: 1, borderColor: Colors.borderGrey }} />

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 50,
              backgroundColor: "#FCD241",
            }}
          ></View>
          <Text style={[{ fontSize: 24, fontWeight: "600" }, TextProps]}>
            {onProgress}
          </Text>
          <Text style={TextProps}>In Progress</Text>
        </View>

        <View style={{ borderWidth: 1, borderColor: Colors.borderGrey }} />

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 50,
              backgroundColor: "#FF965D",
            }}
          ></View>
          <Text style={[{ fontSize: 24, fontWeight: "600" }, TextProps]}>
            {finish}
          </Text>
          <Text style={TextProps}>Finish</Text>
        </View>
      </View>
    </CustomCard>
  );
};

export default memo(ProgressChartCard);
