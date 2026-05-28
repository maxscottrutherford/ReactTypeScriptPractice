import { useState } from "react";

type WorkoutSet = {
  exerciseName: string;
  weight: number | null;
  reps: number | null;
  id: number | null;
};

const App = () => {
  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([
    { exerciseName: "Bench", weight: 135, reps: 10, id: 1 },
    { exerciseName: "Bench", weight: 185, reps: 8, id: 2 },
    { exerciseName: "Bench", weight: 205, reps: 6, id: 3 },
  ]);

  const [workoutSetData, setWorkoutSetData] = useState<WorkoutSet>({
    exerciseName: "",
    weight: null,
    reps: null,
    id: null,
  });

  const totalVolume = workoutSets.reduce((total, set) => {
    if (set.weight === null || set.reps === null) {
      return total;
    }

    return total + set.weight * set.reps;
  }, 0);

  const handleWorkoutSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = Math.floor(Math.random() * 1000);
    setWorkoutSets(workoutSets.concat({ ...workoutSetData, id: newId }));
    setWorkoutSetData({
      exerciseName: "",
      weight: null,
      reps: null,
      id: null,
    });
  };

  const handleWorkoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    let newValue: unknown = value;

    if (type === "number") {
      newValue = Number(value);
    }

    setWorkoutSetData({
      ...workoutSetData,
      [name]: newValue,
    });
  };

  const handleWorkoutSetDelete = (id: number | null) => {
    setWorkoutSets((prevSets) => prevSets.filter((set) => set.id !== id));
  };

  const isDataIncomplete = workoutSetData.exerciseName.trim() === '' || workoutSetData.weight === null || workoutSetData.reps === null;

  return (
    <div>
      <h1>Live Workout Set Logger</h1>
      <form onSubmit={handleWorkoutSubmit}>
        <div>
          <label>Workout Name: </label>
          <input
            name="exerciseName"
            value={workoutSetData.exerciseName}
            onChange={handleWorkoutChange}
            placeholder="Bench, Squat, etc."
          />
        </div>
        <div>
          <label>Weight: </label>
          <input
            name="weight"
            type="number"
            value={workoutSetData.weight ?? ""}
            onChange={handleWorkoutChange}
            placeholder="135, 225, etc."
          />
        </div>
        <div>
          <label>Reps: </label>
          <input
            name="reps"
            type="number"
            value={workoutSetData.reps ?? ""}
            onChange={handleWorkoutChange}
            placeholder="1 - 10"
          />
        </div>
        <button type="submit" disabled={isDataIncomplete}>
          Add Set
        </button>
      </form>
      <h3>Workout Sets</h3>
      <ul>
        {workoutSets.map((workoutSet) => (
          <li key={workoutSet.id}>
            {workoutSet.reps} of {workoutSet.exerciseName} at{" "}
            {workoutSet.weight}lb
            <button
              onClick={() => handleWorkoutSetDelete(workoutSet.id)}
              style={{ margin: "5px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3>Total Workout Volume: {totalVolume}</h3>
    </div>
  );
};

export default App;
