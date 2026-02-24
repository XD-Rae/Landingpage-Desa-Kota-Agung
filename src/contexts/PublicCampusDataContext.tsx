import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Event } from "../types";
import { eventAPI } from "../services/api";

/* ================= TYPE ================= */
interface PublicCampusDataContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

/* ================= CONTEXT ================= */
const PublicCampusDataContext =
  createContext<PublicCampusDataContextType | undefined>(undefined);

/* ================= HOOK ================= */
export const usePublicCampusData = () => {
  const context = useContext(PublicCampusDataContext);
  if (!context) {
    throw new Error(
      "usePublicCampusData must be used within a PublicCampusDataProvider"
    );
  }
  return context;
};

/* ================= PROVIDER ================= */
export const PublicCampusDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const eventsData = await eventAPI.getAll();
      setEvents(eventsData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PublicCampusDataContext.Provider
      value={{
        events,
        loading,
        error,
        refreshData: fetchData,
      }}
    >
      {children}
    </PublicCampusDataContext.Provider>
  );
};
