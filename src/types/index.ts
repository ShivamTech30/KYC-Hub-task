export interface Customer {
  customerId: string;
  name: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  outstandingLoans: number;
  loanRepaymentHistory: number[];
  accountBalance: number;
  status: "Review" | "Approved" | "Rejected";
  riskScore?: number; // Calculated field
}

export interface ChartDataPoint {
  name: string;
  income: number;
  expenses: number;
}

export interface RiskDistribution {
  name: string;
  value: number;
  color: string;
}

export type StatusType = "Review" | "Approved" | "Rejected";