import CustomSheet from "../../../styles/CustomSheet";
import Select from "../../../styles/forms/Select";

const ReminderFilter = ({ option, filterChangeHandler, filter, reference }) => {
  return (
    <CustomSheet reference={reference}>
      <Select items={option} onChange={(value) => filterChangeHandler(value)} placeHolder={filter} />
    </CustomSheet>
  );
};

export default ReminderFilter;
