export type BoardType = {
  name: string;
  id: number;
  columns: ColumnType[];
};

export type ColumnType = {
  name: string;
  id: number;
  tasks: TaskType[];
};

export type TaskType = {
  title: string;
  id: number;
  description: string;
  status: string;
  subtasks: SubtasksType[];
};

export type SubtasksType = {
  title: string;
  id: number;
  isCompleted: boolean;
};
