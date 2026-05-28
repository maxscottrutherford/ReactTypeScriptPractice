import { useState } from "react";

type Participant = {
  name: string;
  journalsCompleted: number;
  totalJournals: number;
  lastActiveDate: string;
};

const mockParticipants: Participant[] = [
  {
    name: "James Carter",
    journalsCompleted: 8,
    totalJournals: 10,
    lastActiveDate: "2026-05-26",
  },
  {
    name: "Maria Lopez",
    journalsCompleted: 4,
    totalJournals: 12,
    lastActiveDate: "2026-05-18",
  },
  {
    name: "Devon Williams",
    journalsCompleted: 2,
    totalJournals: 8,
    lastActiveDate: "2026-05-10",
  },
  {
    name: "Ashley Turner",
    journalsCompleted: 10,
    totalJournals: 10,
    lastActiveDate: "2026-05-22",
  },
  {
    name: "Marcus Reed",
    journalsCompleted: 1,
    totalJournals: 6,
    lastActiveDate: "2026-04-30",
  }
];

type BadgeInfo = {
  status: string;
  color: string;
};

const App = () => {
  const [currentTime] = useState(() => Date.now());

  const getBadgeInfo = (dateValue: string): BadgeInfo => {
    const dayDifference =
      (currentTime - Date.parse(dateValue)) / 1000 / 3600 / 24;
    if (dayDifference <= 7) {
      return { status: "Active", color: "green" };
    } else if (dayDifference < 15) {
      return { status: "At Risk", color: "yellow" };
    } else {
      return { status: "Inactive", color: "red" };
    }
  };

  return (
    <div>
      <h1>Participant Session Cards</h1>
      {mockParticipants.map((participant) => {
        const { status, color } = getBadgeInfo(participant.lastActiveDate);
        return (
          <div
            key={participant.name}
            style={{
              border: "1px, solid, black",
              margin: "5px",
              borderRadius: "10px",
              padding: "10px",
              backgroundColor: "grey",
            }}
          >
            <p style={{ fontWeight: "bold" }}>Name: {participant.name}</p>
            <p>
              Journal Progress: {participant.journalsCompleted}/
              {participant.totalJournals}
            </p>
            <p style={{ color: color }}>{status}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
