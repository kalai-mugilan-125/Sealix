// src/app/api/dashboard.ts

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to get the token safely
const getToken = (): string | null => {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
};

// --- INTERFACES for Data Structure ---

interface ChartDataItem {
    name: string;
    value: number; // Used generically for Issued or Verifications
}

interface IssuerDashboardData {
    totalIssued: number;
    valid: number;
    revoked: number;
    chartData: { name: string; issued: number; }[]; // Matches backend service output
}

interface UserDashboardData {
    ownedDocuments: number;
    pendingVerifications: number;
    sharedWithMe: number;
}

interface VerifierDashboardData {
    totalVerifications: number;
    valid: number;
    revoked: number;
    invalid: number;
    chartData: { name: string; verifications: number; }[]; // Matches backend service output
}

// --- API FETCH FUNCTIONS ---

async function fetchData<T>(endpoint: string): Promise<T> {
  const token = getToken();
  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }

  const response = await fetch(`${API_URL}/api/dashboard/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to fetch ${endpoint} data.`);
  }

  const data = await response.json();
  // The backend responds with { data: actualData }
  return data.data as T; 
}

export const fetchIssuerDashboard = (): Promise<IssuerDashboardData> => {
  return fetchData<IssuerDashboardData>('issuer');
};

export const fetchUserDashboard = (): Promise<UserDashboardData> => {
  return fetchData<UserDashboardData>('user');
};

export const fetchVerifierDashboard = (): Promise<VerifierDashboardData> => {
  return fetchData<VerifierDashboardData>('verifier');
};