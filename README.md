# FinRisk - Credit Risk Analytics Dashboard

A modern, React-based credit risk analytics dashboard for financial institutions to assess and manage customer credit risk.

## Features

- 📊 Real-time risk analytics dashboard
- 🔍 Detailed customer risk assessment
- 📈 Financial metrics visualization
- 🔄 Workflow management system
- 📱 Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running the Application

1. Start the backend server:
```bash
npm run server
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

3. For running both servers concurrently:
```bash
npm run dev:all
```

The application will be available at `http://localhost:5173`

## Risk Scoring System

The risk scoring system uses a comprehensive algorithm that evaluates multiple factors to determine a customer's credit risk level. The score ranges from 0 to 100, where higher scores indicate higher risk.

### Risk Score Components

1. **Credit Score (40% weight)**
   - Maps credit score range (300-850) to (40-0) risk points
   - Higher credit scores result in lower risk points

2. **Repayment History (30% weight)**
   - Evaluates payment history patterns
   - Calculates percentage of missed payments
   - Maps to 0-30 risk points

3. **Loan to Income Ratio (20% weight)**
   - Assesses outstanding loans relative to annual income
   - Capped at 100% of annual income
   - Maps to 0-20 risk points

4. **Expense to Income Ratio (10% weight)**
   - Evaluates monthly expenses vs. income
   - Maps to 0-10 risk points

### Risk Categories

- **Low Risk (0-24)**: 🟢 Green
  - Excellent credit history
  - Strong financial stability
  - Low debt-to-income ratio

- **Medium Risk (25-49)**: 🟡 Yellow
  - Good credit history with minor concerns
  - Moderate debt levels
  - Stable income but tighter margins

- **High Risk (50-74)**: 🟠 Orange
  - Significant credit concerns
  - High debt levels
  - History of missed payments

- **Critical Risk (75-100)**: 🔴 Red
  - Severe credit issues
  - Very high debt burden
  - Frequent missed payments

## Tech Stack

- React 18
- TypeScript
- Vite
- Ant Design
- Recharts
- Express.js
- Tailwind CSS