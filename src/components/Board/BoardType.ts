export type BoardType = {
  name: string;
  id: string;
  columns: ColumnType[];
};

export type ColumnType = {
  name: string;
  id: string;
  tasks: TaskType[];
};

export type TaskType = {
  title: string;
  id: string;
  description: string;
  status: string;
  subtasks: SubtasksType[];
};

export type SubtasksType = {
  title: string;
  id: string;
  isCompleted: boolean;
};
