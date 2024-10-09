export interface TimeTransaction {
  id: string;
  description: string;
  category: string;
  duration: number; // in minutes
  date: string;
}

export interface Category {
  id: string;
  name: string;
  budgetedTime: { [monthKey: string]: number }; // monthKey format: "YYYY-MM"
}

export interface AppState {
  transactions: TimeTransaction[];
  categories: Category[];
}