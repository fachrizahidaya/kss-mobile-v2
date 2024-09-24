import _ from "lodash";

import { Text, View } from "react-native";

import Select from "../forms/Select";
import Button from "../forms/Button";
import CustomSheet from "../../layouts/CustomSheet";

const TaskFilterSheet = ({
  reference,
  members,
  labels,
  setSelectedLabelId,
  selectedLabelId,
  responsibleId,
  deadlineSort,
  selectedPriority,
  setResponsibleId,
  setDeadlineSort,
  setSelectedPriority,
}) => {
  const resetAllFilter = () => {
    setResponsibleId("all");
    setSelectedLabelId(null);
    setDeadlineSort("asc");
    setSelectedPriority("");
  };

  const render = [
    <Select
      title="Responsible"
      value={responsibleId}
      placeHolder="Select member"
      items={[
        { value: "all", label: "All Member" },
        { value: "", label: "Not Assigned" },
        ...(Array.isArray(members)
          ? members.map((member) => {
              return {
                value: member?.user_id || member?.responsible_id,
                label: member?.member_name?.split(" ")[0] || member?.responsible_name?.split(" ")[0],
              };
            })
          : null),
      ]}
      onChange={(value) => setResponsibleId(value)}
    />,
    <Select
      title="Label"
      value={selectedLabelId}
      placeHolder="Select label"
      items={[
        { value: "", label: "No Label" },
        ...(Array.isArray(labels?.data)
          ? labels.data.map((label) => ({
              value: label.label_id,
              label: label.label_name,
            }))
          : []),
      ]}
      onChange={(value) => setSelectedLabelId(value)}
    />,
    <Select
      title="Sort Deadline"
      value={deadlineSort}
      placeHolder="Sort Deadline"
      items={[
        { value: "asc", label: "Closest" },
        { value: "desc", label: "Latest" },
      ]}
      onChange={(value) => setDeadlineSort(value)}
    />,
    <Select
      title="Priority"
      value={selectedPriority}
      placeHolder="Select priority"
      items={[
        { value: "", label: "All Priority" },
        { value: "Low", label: "Low" },
        { value: "Medium", label: "Medium" },
        { value: "High", label: "High" },
      ]}
      onChange={(value) => setSelectedPriority(value)}
    />,
    <Button
      disabled={!selectedLabelId && !responsibleId && !deadlineSort && !selectedPriority}
      onPress={resetAllFilter}
      padding={10}
    >
      <Text style={{ color: "#fff" }}>Reset Filter</Text>
    </Button>,
  ];

  return (
    <CustomSheet reference={reference}>
      {render.map((item, index) => {
        return <View key={index}>{item}</View>;
      })}
    </CustomSheet>
  );
};

export default TaskFilterSheet;
