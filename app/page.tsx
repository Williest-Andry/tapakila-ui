"use client"

import {
  Box,
  createListCollection,
  Flex,
  Grid,
  Heading,
  HStack,
} from "@chakra-ui/react"

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"

import { useEffect, useState } from "react";
import EventsList from "./components/events-list";
import { log } from "console";

import Event from "../../../Back-end/api/entity/Event.js"
import getAllEvents from "@/lib/getAllEvents";

interface EventsListProps {
  events: Event[];
}

export default function Page() {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");


  const [selectedDate, setSelectedDate] = useState<string[]>(["Upcoming"])
  const [selectedPlace, setSelectedPlace] = useState<string[]>(["All"])
  const [selectedCategory, setSelectedCategory] = useState<string[]>(["All"])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllEvents();
        setData(result);
      } catch (error) {
        console.error("Erreur de chargement", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredAndSortedEvents = filterAndSortEvents(data, selectedDate, selectedPlace, selectedCategory);

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3} padding="1" mt={"3"} alignItems={"center"} justifyContent={"center"}>
        <Heading size={"2xl"} marginLeft={"5"} marginRight={"1"}>Upcoming events</Heading>
        <Box display="flex" gap="4" alignItems={"center"}>
          <SelectRoot
            collection={dates}
            width="320px"
            value={selectedDate}
            onValueChange={(e) => {setSelectedDate(e.value)}}
          >
            <SelectLabel>Date</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              {dates.items.map((date) => (
                <SelectItem item={date} key={date.value}>
                  {date.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Box display="flex" gap="4" alignItems={"center"}>
          <SelectRoot
            collection={places}
            width="320px"
            value={selectedPlace}
            onValueChange={(e) => setSelectedPlace(e.value)}
          >
            <SelectLabel>Place</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Select place" />
            </SelectTrigger>
            <SelectContent>
              {places.items.map((place) => (
                <SelectItem item={place} key={place.value}>
                  {place.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Box display="flex" gap="4" alignItems={"center"}>
          <SelectRoot
            collection={categories}
            width="320px"
            value={selectedCategory}
            onValueChange={(e) => setSelectedCategory(e.value)}
          >
            <SelectLabel>Category</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.items.map((category) => (
                <SelectItem item={category} key={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
      </Grid>
      
      {/* List of events */}

      <EventsList events={filteredAndSortedEvents} />
    </>
  )
}

const dates = createListCollection({
  items: [
    { label: "Upcoming", value: "Upcoming" },
    { label: "Latest", value: "Latest" },
  ],
})

const places = createListCollection({
  items: [
    { label: "All", value: "All" },
    { label: "place1", value: "place1" },
    { label: "place2", value: "place2" },
    { label: "place3", value: "place3" },
    { label: "place4", value: "place4" },
  ],
})

const categories = createListCollection({
  items: [
    { label: "All", value: "All" },
    { label: "category1", value: "category1" },
    { label: "category2", value: "category2" },
    { label: "category3", value: "category3" },
    { label: "category4", value: "category4" },
  ],
})

function filterAndSortEvents(events: Event[], dateOrder: string[], locationFilter: string[], categoryFilter: string[]): Event[] {
  let organizedData: Event[] = events;

  if (locationFilter[0] !== "All") {
    organizedData = organizedData.filter(event => event.location === locationFilter[0]);
  }

  if (categoryFilter[0] !== "All") {
    organizedData = organizedData.filter(event => event.category === categoryFilter[0]);
  }

  if (dateOrder[0] === "Latest") {
    organizedData = organizedData.sort((a, b) =>
      new Date(b.dateTime.replace(" ", "T")).getTime() - new Date(a.dateTime.replace(" ", "T")).getTime()
    );
  } else {
    organizedData = organizedData.sort((a, b) =>
      new Date(a.dateTime.replace(" ", "T")).getTime() - new Date(b.dateTime.replace(" ", "T")).getTime()
    );
  }

  return organizedData;
}