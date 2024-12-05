import { useCallback } from "react";

import { SheetManager } from "react-native-actions-sheet";
import { Pressable, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Select from "../../../../styles/forms/Select";
import { Colors } from "../../../../styles/Color";

const FilterLeave = ({ filterYear, setFilterYear, filterType, setFilterType }) => {
  return (
    <>
      <Pressable
        style={{ padding: 5, borderWidth: 1, borderRadius: 10, borderColor: Colors.borderGrey }}
        onPress={() =>
          SheetManager.show("form-sheet", {
            payload: {
              children: (
                <View
                  style={{
                    gap: 21,
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    paddingBottom: 40,
                  }}
                >
                  <Select
                    value={filterYear}
                    placeHolder={filterYear ? filterYear : "Select year"}
                    items={[
                      { value: 2024, label: 2024 },
                      { value: 2023, label: 2023 },
                    ]}
                    onChange={(value) => setFilterYear(value)}
                    hasParentSheet
                  />
                  <Select
                    value={filterType}
                    placeHolder={filterType ? filterType : "Select type"}
                    items={[
                      { value: "personal", label: "Personal" },
                      { value: "team", label: "Team" },
                    ]}
                    onChange={(value) => setFilterType(value)}
                    hasParentSheet
                  />
                </View>
              ),
            },
          })
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <MaterialCommunityIcons name="tune-variant" size={20} color={Colors.iconDark} />
        </View>
      </Pressable>
    </>
  );
};

export default FilterLeave;
