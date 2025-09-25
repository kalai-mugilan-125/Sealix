import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Interface for the structured response from your backend's 'respond' utility
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function login(payload: { email: string; password: string; role: string }): Promise<{ token: string; user: User }> {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    // 🚨 FIX: The backend's 'respond' utility wraps the actual data in a 'data' property.
    const apiResponse: ApiResponse<{ token: string; user: User }> = await response.json();
    
    // Return the nested 'data' object, which contains the token and user.
    return apiResponse.data;

  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
}

export async function register(payload: { name: string; email: string; password: string; role: string }): Promise<{ user: User }> {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const apiResponse: ApiResponse<{ user: User }> = await response.json();
    return apiResponse.data; // Also updated register to return nested data
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  // This is a client-side function to clear local storage.
  localStorage.removeItem("token");
}

export async function forgotPassword(payload: { email: string }): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to initiate password reset");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Forgot password API error:", error);
    throw error;
  }
}

export async function verifyUser(token: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // If the response is not OK, we throw an error to be caught by the calling function.
      throw new Error(response.statusText || "User verification failed");
    }

    const apiResponse: ApiResponse<{ user: User }> = await response.json();
    // The verify endpoint returns { user: req.user } from the controller
    return apiResponse.data.user;
  } catch (error) {
    console.error("User verification API error:", error);
    throw error;
  }
}