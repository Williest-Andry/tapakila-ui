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

export interface Event {
  id: string;
  image: string;
  title: string;
  dateTime: string;
  location: string;
  available: boolean;
  category: string;
}

interface EventsListProps {
  events: Event[];
}

export default function Page() {
    const [eventsData, setEventsData] = useState<Event[]>([])

    const [selectedDate, setSelectedDate] = useState<string[]>(["Upcoming"])
    const [selectedPlace, setSelectedPlace] = useState<string[]>(["All"])
    const [selectedCategory, setSelectedCategory] = useState<string[]>(["All"])

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

      <EventsList events={events} />
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


const events: Event[] = [
  {
    id: '1',
    image: '/assets/events_image/pexels-apasaric-2341830.jpg',
    title: 'Jazz concert',
    dateTime: '2025-04-15 18:00:00',
    location: 'place4',
    available: true,
    category: "category1"
  },
  {
    id: '2',
    image: '/assets/events_image/pexels-apasaric-4201659.jpg',
    title: 'Art exposition',
    dateTime: '2025-04-20 10:00:00',
    location: 'place3',
    available: false,
    category: "category1"
  },
  {
    id: '3',
    image: '/assets/events_image/pexels-harun-tan-2311991-3980364.jpg',
    title: 'Lollapalooza 2025',
    dateTime: '2025-04-03 12:00:00',
    location: 'place4',
    available: false,
    category: "category2"
  },
  {
    id: '4',
    image: '/assets/events_image/pexels-nishantaneja-2362699.jpg',
    title: 'Taylor Swift',
    dateTime: '2025-06-15 20:00:00',
    location: 'place2',
    available: true,
    category: "category3"
  },
  {
    id: '5',
    image: '/assets/events_image/pexels-prateekkatyal-2694434.jpg',
    title: 'Paris Games Week',
    dateTime: '2025-06-15 10:00:00',
    location: 'place3',
    available: true,
    category: "category4"
  },
  {
    id: '6',
    image: '/assets/events_image/pexels-maxfrancis-2246476.jpg',
    title: 'Conference',
    dateTime: '2025-04-30 09:00:00',
    location: 'place4',
    available: true,
    category: "category4"
  },
];

function filterAndSortEvents(events: Event[], dateOrder: string[], locationFilter: string[], categoryFilter: string[]): Event[] {
  let organizedData: Event[] = events;

  if (dateOrder[0] === 'Latest') {
    return organizedData.sort((a, b) => new Date(b.dateTime.replace(" ", "T")).getTime() - new Date(a.dateTime.replace(" ", "T")).getTime());
  } else {
    return organizedData.sort((a, b) => new Date(a.dateTime.replace(" ", "T")).getTime() - new Date(b.dateTime.replace(" ", "T")).getTime());
  }
  
   
}