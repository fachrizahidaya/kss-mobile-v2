import { memo } from "react";

import Select from "../../../../styles/forms/Select";

const TeamSelection = ({ onChange, selectedTeam, teams }) => {
  return (
    <Select
      value={selectedTeam?.id}
      onChange={(value) => onChange(value)}
      items={
        teams.length > 0
          ? teams.map((team) => {
              return { value: team.id, label: team.name };
            })
          : null
      }
    />
  );
};

export default memo(TeamSelection);
