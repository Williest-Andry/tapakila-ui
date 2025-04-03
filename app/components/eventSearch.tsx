import getSearchedEvent from "@/lib/events/getSearchedEvents";
import React, { useState } from "react";
import Event from "../../../../Back-end/api/entity/Event";

const EventSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEvents = async (query: string = "") => {
    setLoading(true);
    
    try {
      const result = await getSearchedEvent(query);
      setEvents(result);
    } catch (error) {
      console.error("Erreur de chargement", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents(searchQuery);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events by title..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <div>
          {events.map((event) => (
            <div key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.dateTime}</p>
              <p>{event.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventSearch;
