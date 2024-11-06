export type TTaskItem = {
  name: string;
  currentProgress: number;
  finishedProgress: number;
};

const TaskItem = ({ item }: { item: TTaskItem }) => {
  const isComplete = item.currentProgress >= item.finishedProgress;
  return (
    <div className="flex flex-row justify-between w-full">
      <p>{item.name}</p>
      {/* has multilple steps to completion */}
      {item.finishedProgress > 1 && (
        <div>
          <p>
            {isComplete
              ? "Completed"
              : item.currentProgress + " / " + item.finishedProgress}
          </p>{" "}
        </div>
      )}
      {/* is a one step completion */}
      {item.finishedProgress === 1 && (
        <div>
          <p>{isComplete ? "Completed" : "Incomplete"}</p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
