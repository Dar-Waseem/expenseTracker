import React, { createContext, useContext, useState } from "react";

export type ExpenseCategory = "Housing" | "Food" | "Transportation" | "Shopping";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  note: string;
}

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  getCategoryTotal: (category: ExpenseCategory) => number;
  categoryLimits: Record<ExpenseCategory, number>;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", amount: 1552.50, category: "Housing", date: new Date().toISOString(), note: "Rent" },
    { id: "2", amount: 862.50, category: "Food", date: new Date().toISOString(), note: "Dining" },
    { id: "3", amount: 517.50, category: "Transportation", date: new Date().toISOString(), note: "Uber" },
    { id: "4", amount: 517.50, category: "Shopping", date: new Date().toISOString(), note: "Misc" },
  ]);

  const totalBudget = 5000;

  const addExpense = (expenseInfo: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseInfo,
      id: Date.now().toString() + Math.random().toString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = Math.max(0, totalBudget - totalSpent);

  const getCategoryTotal = (category: ExpenseCategory) => {
    return expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  const categoryLimits: Record<ExpenseCategory, number> = {
    Housing: 2000,
    Food: 1500,
    Transportation: 800,
    Shopping: 1000,
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        totalBudget,
        totalSpent,
        remainingBudget,
        getCategoryTotal,
        categoryLimits,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};
