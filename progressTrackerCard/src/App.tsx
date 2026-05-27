import { useState } from "react";

type ProgressTrackerCardProps = {
  name: string;
  journalsAssigned: number;
  journalsCompleted: number;
  handleCompletion: React.MouseEventHandler<HTMLButtonElement>;
};

const ProgressTrackerCard = (props: ProgressTrackerCardProps) => {

  const progressPercentage =
    (props.journalsCompleted / props.journalsAssigned) * 100;

  console.log(progressPercentage);

  return (
    <div>
      <h2>Participant Name: {props.name}</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <progress value={props.journalsCompleted} max={props.journalsAssigned}>
          {progressPercentage} %
        </progress>
        <p style={{ marginLeft: "10px" }}>{progressPercentage} %</p>
      </div>
      <h3>
        Status:
        {progressPercentage === 0
          ? " Not Started"
          : progressPercentage < 100
            ? " In Progress"
            : " Completed"}
      </h3>
      <button
        type="button"
        onClick={props.handleCompletion}
        disabled={progressPercentage >= 100}
      >
        Add Completion
      </button>
    </div>
  );
};

const mockParticipant = {
  name: "James Carter",
  totalJournals: 10,
  completedJournals: 7,
};

const App = () => {
  const [progress, setProgress] = useState<number>(
    mockParticipant.completedJournals,
  );

  console.log(progress);

  const handleProgressClick = () => {
    setProgress(progress + 1);
  };

  return (
    <div>
      <h1>Progress Tracker Component</h1>
      <ProgressTrackerCard
        name={mockParticipant.name}
        journalsAssigned={mockParticipant.totalJournals}
        journalsCompleted={progress}
        handleCompletion={handleProgressClick}
      />
    </div>
  );
};

export default App;
