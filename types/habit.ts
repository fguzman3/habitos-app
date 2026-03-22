export type Priority = "low" | "mid" | "high"; 


export type habito = { 
  id: string;
  title: string;
  priority?: Priority;
  createdAt: string;
  lastDoneAt?: string | null;
  streak: number;
  isComplete: boolean;
};
