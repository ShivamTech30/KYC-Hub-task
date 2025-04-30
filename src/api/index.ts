import axios from 'axios';
import { Customer, StatusType } from '../types';

const API_URL = 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCustomers = async (retries = MAX_RETRIES): Promise<Customer[]> => {
  try {
    const response = await axiosInstance.get('/customers');
    return response.data;
  } catch (error) {
    if (retries > 0 && axios.isAxiosError(error) && (!error.response || error.code === 'ECONNABORTED')) {
      console.log(`Retrying fetchCustomers... (${retries} attempts remaining)`);
      await sleep(RETRY_DELAY);
      return fetchCustomers(retries - 1);
    }
    console.error('Error fetching customers:', error);
    throw new Error('Failed to fetch customers. Please ensure the server is running and try again.');
  }
};


// export async function askChatGPT(prompt: string): Promise<string> {
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer s`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: prompt },
//       ],
//     }),
//   });

//   const data = await response.json();
//   return data.choices[0]?.message?.content || "";
// }

export const updateCustomerStatus = async (
  customerId: string, 
  newStatus: StatusType,
  retries = MAX_RETRIES
): Promise<Customer> => {
  try {
    const response = await axiosInstance.patch(`/customers/${customerId}`, { status: newStatus });
    return response.data;
  } catch (error) {
    if (retries > 0 && axios.isAxiosError(error) && (!error.response || error.code === 'ECONNABORTED')) {
      console.log(`Retrying updateCustomerStatus... (${retries} attempts remaining)`);
      await sleep(RETRY_DELAY);
      return updateCustomerStatus(customerId, newStatus, retries - 1);
    }
    console.error('Error updating customer status:', error);
    throw new Error('Failed to update customer status. Please try again later.');
  }
};

export const createAlert = async (
  customerId: string, 
  riskScore: number,
  retries = MAX_RETRIES
): Promise<void> => {
  try {
    await axiosInstance.post('/alerts', { 
      customerId, 
      riskScore, 
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    if (retries > 0 && axios.isAxiosError(error) && (!error.response || error.code === 'ECONNABORTED')) {
      console.log(`Retrying createAlert... (${retries} attempts remaining)`);
      await sleep(RETRY_DELAY);
      return createAlert(customerId, riskScore, retries - 1);
    }
    console.error('Error creating alert:', error);
    throw new Error('Failed to create alert. Please try again later.');
  }
};