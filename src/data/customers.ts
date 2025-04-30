import { Customer } from '../types';

export const initialCustomers: Customer[] = [
  {
    customerId: "CUST1001",
    name: "Alice Johnson",
    monthlyIncome: 6200,
    monthlyExpenses: 3500,
    creditScore: 710,
    outstandingLoans: 15000,
    loanRepaymentHistory: [1, 0, 1, 1, 1, 1, 0, 1],
    accountBalance: 12500,
    status: "Review"
  },
  {
    customerId: "CUST1002",
    name: "Bob Smith",
    monthlyIncome: 4800,
    monthlyExpenses: 2800,
    creditScore: 640,
    outstandingLoans: 20000,
    loanRepaymentHistory: [1, 1, 1, 0, 0, 1, 0, 0],
    accountBalance: 7300,
    status: "Approved"
  },
  {
    customerId: "CUST1003",
    name: "Carol Wilson",
    monthlyIncome: 7500,
    monthlyExpenses: 4200,
    creditScore: 780,
    outstandingLoans: 5000,
    loanRepaymentHistory: [1, 1, 1, 1, 1, 1, 1, 1],
    accountBalance: 25000,
    status: "Approved"
  },
  {
    customerId: "CUST1004",
    name: "David Brown",
    monthlyIncome: 3900,
    monthlyExpenses: 3200,
    creditScore: 590,
    outstandingLoans: 25000,
    loanRepaymentHistory: [0, 0, 1, 0, 1, 0, 1, 0],
    accountBalance: 3200,
    status: "Rejected"
  },
  {
    customerId: "CUST1005",
    name: "Eva Miller",
    monthlyIncome: 5500,
    monthlyExpenses: 2900,
    creditScore: 670,
    outstandingLoans: 18000,
    loanRepaymentHistory: [1, 1, 0, 1, 1, 0, 1, 1],
    accountBalance: 8900,
    status: "Review"
  },
  {
    customerId: "CUST1006",
    name: "Frank Davis",
    monthlyIncome: 8200,
    monthlyExpenses: 5100,
    creditScore: 720,
    outstandingLoans: 30000,
    loanRepaymentHistory: [1, 1, 1, 1, 0, 1, 1, 1],
    accountBalance: 15400,
    status: "Review"
  },
  {
    customerId: "CUST1007",
    name: "Grace Taylor",
    monthlyIncome: 4100,
    monthlyExpenses: 3800,
    creditScore: 610,
    outstandingLoans: 12000,
    loanRepaymentHistory: [1, 0, 0, 1, 0, 1, 0, 1],
    accountBalance: 5200,
    status: "Rejected"
  },
  {
    customerId: "CUST1008",
    name: "Henry White",
    monthlyIncome: 9300,
    monthlyExpenses: 4700,
    creditScore: 800,
    outstandingLoans: 8000,
    loanRepaymentHistory: [1, 1, 1, 1, 1, 1, 1, 1],
    accountBalance: 32000,
    status: "Approved"
  }
];