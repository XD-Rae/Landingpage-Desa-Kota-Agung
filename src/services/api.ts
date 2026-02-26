import {
  Event,
  Dusun,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3008";
// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "https://api-buah-berak.garnusa.com";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEFAULT_TIMEOUT = 30000;

async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API fetch error: ", error);
    throw new Error("Failed to fetch data");
  }
}


// -------- Dusun API --------
export const dusunAPI = {
  // GET ALL
  getAll: async () => {
    try {
      const response = await fetchAPI<APIResponse<Dusun[]>>("/api/dusun");
      return response.data;
    } catch (error) {
      console.error("Error fetching dusun:", error);
      return [];
    }
  },

  // GET BY ID (UUID)
  getById: async (id: string) => {
    if (!id) throw new Error("ID Dusun is required");
    try {
      // id di sini adalah idDusun (UUID), bukan _id Mongo
      const response = await fetchAPI<APIResponse<Dusun>>(`/api/dusun/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching dusun ${id}:`, error);
      return undefined;
    }
  },
};


export const reportAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: any[]}>("/api/reports");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await fetchAPI<{data: any}>(`/api/reports/${id}`);
    return res.data;
  },

  create: async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        body: formData, // ✔️ multipart/form-data otomatis
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API create report error:", error);
      throw error;
    }
  },

  update: async (id: string, formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API update report error:", error);
      throw error;
    }
  },
};

export const eventAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: Event[]}>("/api/events");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await fetchAPI<{data: Event}>(`/api/events/${id}`);
    return res.data;
  },
};
