import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

    const data = await response.json();
    return data;
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  // This is a client-side function to clear local storage.
  // Add a backend call here if your server requires it to invalidate refresh tokens.
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
      // This prevents the code from trying to parse an invalid JSON body.
      throw new Error(response.statusText || "User verification failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("User verification API error:", error);
    throw error;
  }
}