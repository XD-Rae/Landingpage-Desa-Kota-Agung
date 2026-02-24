import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EventDetailPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch(`/api/events/${id}`);
      const data = await res.json();
      setEvent(data.data || data);
    };

    fetchDetail();
  }, [id]);

  if (!event) {
    return <div className="pt-24 text-center">Memuat detail...</div>;
  }

  return (
    <div className="pt-24 max-w-4xl mx-auto px-4">
      <Link
        to="/kegiatan/event"
        className="text-blue-700 hover:underline"
      >
        ← Kembali ke Event
      </Link>

      <h1 className="text-3xl font-bold text-blue-800 mt-4">
        {event.title}
      </h1>

      {event.date && (
        <p className="text-gray-500 mb-4">
          {new Date(event.date).toLocaleDateString("id-ID")}
        </p>
      )}

      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full rounded-xl mb-6"
        />
      )}

      <p className="text-gray-700 leading-relaxed">
        {event.description}
      </p>
    </div>
  );
};

export default EventDetailPage;
