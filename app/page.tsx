"use-client"

import {
  Box,
  Button,
  Checkbox,
  ClientOnly,
  HStack,
  Heading,
  Progress,
  RadioGroup,
  Skeleton,
  VStack,
} from "@chakra-ui/react"

import Image from "next/image"
import { ColorModeToggle } from "../components/color-mode-toggle"
import getAllEvents from '../lib/getAllEvents'

interface Event {
  id: number;
  name: string;
}

export default async function Page() {
  return (
    <>
      <HStack w={"full"}>
        
      </HStack>
    </>
  )
}