import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Pressable, View } from "react-native";

import StatusAndDeadlineSection from "./StatusAndDeadlineSection/StatusAndDeadlineSection";
import PrioritySection from "./PrioritySection/PrioritySection";
import AdditionAndResponsibleSection from "./AddtionAndResponsibleSection/AdditionAndResponsibleSection";

const TaskListItem = ({
  id,
  no,
  task,
  title,
  priority,
  deadline,
  image,
  totalAttachments,
  totalChecklists,
  totalChecklistsDone,
  totalComments,
  status,
  responsible,
  responsibleId,
  openCloseTaskConfirmation,
  index,
  length,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.wrapper, { marginBottom: index === length - 1 ? 14 : null }]}
      onPress={() => navigation.navigate("Task Detail", { taskId: id })}
    >
      <View style={{ gap: 4 }}>
        <StatusAndDeadlineSection
          no={no}
          task={task}
          title={title}
          deadline={deadline}
          status={status}
          responsibleId={responsibleId}
          openCloseTaskConfirmation={openCloseTaskConfirmation}
        />

        <PrioritySection priority={priority} />

        <AdditionAndResponsibleSection
          image={image}
          totalAttachments={totalAttachments}
          totalChecklists={totalChecklists}
          totalChecklistsDone={totalChecklistsDone}
          totalComments={totalComments}
          responsible={responsible}
        />
      </View>
    </Pressable>
  );
};

export default TaskListItem;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    // shadowColor: "rgba(0, 0, 0, 1)",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 4,
    marginTop: 14,
    marginHorizontal: 16,
    borderRadius: 10,
  },
});
