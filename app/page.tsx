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
    const [selectedPlace, setSelectedPlace] = useState<string[]>()
    const [selectedDate, setSelectedDate] = useState<string[]>()
    const [selectedCategory, setSelectedCategory] = useState<string[]>()

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users', { next: {revalidate: 60} })
        const events = await response.json()
          setEventsData(events)
        } catch (error) {
          console.error('Failed to fetch events', error)
        }
      }
  
      fetchEvents()
    }, [])

    return (
    <>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3} padding="1" mt={"3"} alignItems={"center"} justifyContent={"center"}>
        <Heading size={"2xl"} marginLeft={"5"} marginRight={"1"}>Upcoming events</Heading>
        <Box display="flex" gap="4" alignItems={"center"}>
          <SelectRoot
            collection={dates}
            width="320px"
            value={selectedDate}
            onValueChange={(e) => setSelectedDate(e.value)}
            defaultValue={["Upcoming"]}
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
            defaultValue={["All"]}
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
            defaultValue={["All"]}
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
    dateTime: '15-04-2025 18:00:00',
    location: 'Paris,Le Zenith',
    available: true,
    category: "Category1"
  },
  {
    id: '2',
    image: '/assets/events_image/pexels-apasaric-4201659.jpg',
    title: 'Art exposition',
    dateTime: '20-04-2025 10:00:00',
    location: 'Lyon,Musée des Beaux-Arts',
    available: false,
    category: "Category1"
  },
  {
    id: '3',
    image: '/assets/events_image/pexels-harun-tan-2311991-3980364.jpg',
    title: 'Lollapalooza 2025',
    dateTime: '03-04-2025 12:00:00',
    location: 'Paris,Parc des Princes',
    available: false,
    category: "Category2"
  },
  {
    id: '4',
    image: '/assets/events_image/pexels-nishantaneja-2362699.jpg',
    title: 'Taylor Swift',
    dateTime: '10-06-2025 20:00:00',
    location: 'New York,Madison Square Garden',
    available: true,
    category: "Category3"
  },
  {
    id: '5',
    image: '/assets/events_image/pexels-prateekkatyal-2694434.jpg',
    title: 'Paris Games Week',
    dateTime: '15-06-2025 10:00:00',
    location: 'Paris,Porte de Versailles',
    available: true,
    category: "Category4"
  },
  {
    id: '6',
    image: '/assets/events_image/pexels-maxfrancis-2246476.jpg',
    title: 'Conference',
    dateTime: '30-04-2025 09:00:00',
    location: 'London,ExCel London',
    available: true,
    category: "Category4"
  },
];