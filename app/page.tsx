"use client"

import {
  Box,
  Button,
  Center,
  createListCollection,
  Flex,
  Heading,
  Link,
} from "@chakra-ui/react"

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"

import getAllEvents from '../lib/getAllEvents'
import { GoTriangleDown } from "react-icons/go";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  name: string;
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
      <Flex alignItems="center" gap={5} mt={2} mb={2}>
        <Heading size={"2xl"} marginLeft={"20"} marginRight={"20"}>Upcoming events</Heading>
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
      </Flex>
      
      <ul>
        {eventsData.map((event: Event) => (
          <li key={event.id}><Link href={`/event/${event.id}`}>{event.name}</Link></li>
        ))}
      </ul>
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
