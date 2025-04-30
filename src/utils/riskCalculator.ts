import { Customer } from '../types';

/**
 * Calculate risk score based on multiple factors
 * - Credit score (higher is better)
 * - Loan repayment history (more 1's is better)
 * - Outstanding loans vs income ratio (lower is better)
 * - Expenses to income ratio (lower is better)
 * 
 * Returns risk score from 0-100, where higher means higher risk
 */
export const calculateRiskScore = (customer: Customer): number => {
  // Credit score component (higher score = lower risk)
  // Maps credit score range (300-850) to (40-0) risk points
  const creditScoreMax = 850;
  const creditScoreMin = 300;
  const creditScoreRange = creditScoreMax - creditScoreMin;
  const creditScoreComponent = 40 * (1 - (customer.creditScore - creditScoreMin) / creditScoreRange);
  
  // Repayment history component (more successful payments = lower risk)
  // Calculate percentage of missed payments, maps to (0-30) risk points
  const repaymentHistory = customer.loanRepaymentHistory;
  const missedPayments = repaymentHistory.filter(payment => payment === 0).length;
  const totalPayments = repaymentHistory.length;
  const missedPaymentRate = totalPayments > 0 ? missedPayments / totalPayments : 0;
  const repaymentComponent = 30 * missedPaymentRate;
  
  // Loan to income ratio component (higher ratio = higher risk)
  // Maps ratio to (0-20) risk points, capped at 100% of annual income
  const annualIncome = customer.monthlyIncome * 12;
  const loanToIncomeRatio = Math.min(1, customer.outstandingLoans / annualIncome);
  const loanToIncomeComponent = 20 * loanToIncomeRatio;
  
  // Expense to income ratio component (higher ratio = higher risk)
  // Maps ratio to (0-10) risk points
  const expenseToIncomeRatio = Math.min(1, customer.monthlyExpenses / customer.monthlyIncome);
  const expenseToIncomeComponent = 10 * expenseToIncomeRatio;
  
  // Calculate total risk score (0-100)
  const riskScore = Math.round(
    creditScoreComponent + 
    repaymentComponent + 
    loanToIncomeComponent + 
    expenseToIncomeComponent
  );
  
  // Ensure risk score is within 0-100 range
  return Math.max(0, Math.min(100, riskScore));
};

/**
 * Get risk category based on risk score
 */
export const getRiskCategory = (riskScore: number): 'low' | 'medium' | 'high' | 'critical' => {
  if (riskScore < 25) return 'low';
  if (riskScore < 50) return 'medium';
  if (riskScore < 75) return 'high';
  return 'critical';
};

/**
 * Get color based on risk category
 */
export const getRiskColor = (riskScore: number): string => {
  const category = getRiskCategory(riskScore);
  
  switch (category) {
    case 'low': return '#52c41a'; // Green
    case 'medium': return '#faad14'; // Yellow
    case 'high': return '#fa8c16'; // Orange
    case 'critical': return '#f5222d'; // Red
    default: return '#1890ff'; // Blue (fallback)
  }
};

/**
 * Add risk scores to all customers
 */
export const enrichCustomersWithRiskScores = (customers: Customer[]): Customer[] => {
  return customers.map(customer => ({
    ...customer,
    riskScore: calculateRiskScore(customer)
  }));
};

/**
 * Get risk distribution data for charts
 */
export const getRiskDistribution = (customers: Customer[]): { name: string; value: number; color: string }[] => {
  const enriched = enrichCustomersWithRiskScores(customers);
  
  const distribution = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0
  };
  
  enriched.forEach(customer => {
    const score = customer.riskScore || 0;
    const category = getRiskCategory(score);
    distribution[category]++;
  });
  
  return [
    { name: 'Low Risk', value: distribution.low, color: '#52c41a' },
    { name: 'Medium Risk', value: distribution.medium, color: '#faad14' },
    { name: 'High Risk', value: distribution.high, color: '#fa8c16' },
    { name: 'Critical Risk', value: distribution.critical, color: '#f5222d' }
  ];
};