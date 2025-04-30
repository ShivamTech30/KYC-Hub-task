import { Customer, ChartDataPoint } from '../types';

/**
 * Generate income vs expenses chart data from customers
 */
export const generateIncomeExpensesChartData = (customers: Customer[]): ChartDataPoint[] => {
  // Sort customers by income from highest to lowest
  const sortedCustomers = [...customers].sort((a, b) => b.monthlyIncome - a.monthlyIncome);
  
  // Create chart data using customer names and their income/expenses
  return sortedCustomers.map(customer => ({
    name: customer.name.split(' ')[0], // Use first name only for cleaner chart
    income: customer.monthlyIncome,
    expenses: customer.monthlyExpenses
  }));
};

/**
 * Generate total financial metrics
 */
export const calculateFinancialMetrics = (customers: Customer[]) => {
  const totalIncome = customers.reduce((sum, customer) => sum + customer.monthlyIncome, 0);
  const totalExpenses = customers.reduce((sum, customer) => sum + customer.monthlyExpenses, 0);
  const totalLoans = customers.reduce((sum, customer) => sum + customer.outstandingLoans, 0);
  const totalBalance = customers.reduce((sum, customer) => sum + customer.accountBalance, 0);
  
  const averageIncome = totalIncome / customers.length;
  const averageExpenses = totalExpenses / customers.length;
  
  // Calculate growth metrics (in a real app, these would come from historical data)
  // Here we're simulating modest growth
  const incomeGrowth = 5.3; // 5.3% growth
  const expenseGrowth = 3.2; // 3.2% growth
  const loanGrowth = -2.1; // 2.1% reduction
  
  return {
    totalIncome,
    totalExpenses,
    totalLoans,
    totalBalance,
    averageIncome,
    averageExpenses,
    incomeGrowth,
    expenseGrowth,
    loanGrowth
  };
};