"use client";

import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  NativeSelect,
  Separator,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useCategories } from "@/lib/api/queries/events-categories.queries";
import { useCreateEvent } from "@/lib/api/queries/events.queries";
import { useCreateTicketType } from "@/lib/api/queries/ticket-type.queries";
import {
  createEventSchema,
  createTicketTypeSchema,
  type CreateEventInput,
  type CreateTicketTypeInput,
} from "@/schema/event.schema";
import { toaster } from "@/components/ui/toaster";

interface DraftTicket extends CreateTicketTypeInput {
  _id: string;
}

const EMPTY_EVENT: CreateEventInput = {
  title: "",
  description: "",
  location: "",
  eventDate: "",
  categoryId: "",
};

const EMPTY_TICKET: CreateTicketTypeInput = {
  name: "",
  price: 0,
  totalSeats: 1,
  maxPerUser: 5,
};

export default function CreateEventForm() {
  const [step, setStep] = useState<"event" | "tickets" | "done">("event");
  const [createdEventId, setCreatedEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<CreateEventInput>(EMPTY_EVENT);
  const [eventErrors, setEventErrors] = useState<
    Partial<Record<keyof CreateEventInput, string>>
  >({});
  const [tickets, setTickets] = useState<DraftTicket[]>([]);
  const [ticketForm, setTicketForm] =
    useState<CreateTicketTypeInput>(EMPTY_TICKET);
  const [ticketErrors, setTicketErrors] = useState<
    Partial<Record<keyof CreateTicketTypeInput, string>>
  >({});

  const { data: categoriesData } = useCategories();
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : (categoriesData?.data ?? []);

  const { mutate: createEvent, isPending: isCreatingEvent } = useCreateEvent();
  const { mutate: createTicketType, isPending: isCreatingTicket } =
    useCreateTicketType();

  const handleEventChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({ ...prev, [name]: value }));
    setEventErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmitEvent = () => {
    const result = createEventSchema.safeParse(eventForm);
    if (!result.success) {
      const errors: typeof eventErrors = {};
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof CreateEventInput;
        if (!errors[field]) errors[field] = e.message;
      });
      setEventErrors(errors);
      return;
    }

    const { categoryId, ...rest } = result.data;
    createEvent(
      {
        ...rest,
        category: { id: categoryId },
        eventDate: new Date(rest.eventDate).toISOString(),
      },
      {
        onSuccess: (data) => {
          setCreatedEventId(data.id);
          setStep("tickets");
          toaster.success({
            title: "Event created!",
            description: "Now add ticket types.",
          });
        },
        onError: (error) => {
          const message =
            error && typeof error === "object" && "message" in error
              ? String((error as { message: string }).message)
              : "Unable to create the event.";
          toaster.error({ title: "Error", description: message });
        },
      },
    );
  };

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicketForm((prev) => ({ ...prev, [name]: value }));
    setTicketErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleAddTicket = () => {
    const result = createTicketTypeSchema.safeParse(ticketForm);
    if (!result.success) {
      const errors: typeof ticketErrors = {};
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof CreateTicketTypeInput;
        if (!errors[field]) errors[field] = e.message;
      });
      setTicketErrors(errors);
      return;
    }
    setTickets((prev) => [
      ...prev,
      { ...result.data, _id: crypto.randomUUID() },
    ]);
    setTicketForm(EMPTY_TICKET);
  };

  const handleRemoveTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t._id !== id));
  };

  const handleSubmitTickets = async () => {
    if (!createdEventId) return;

    if (tickets.length === 0) {
      toaster.error({
        title: "No ticket types",
        description: "Add at least one ticket type.",
      });
      return;
    }

    let hasError = false;
    for (const ticket of tickets) {
      await new Promise<void>((resolve) => {
        const { _id, ...body } = ticket;
        createTicketType(
          { eventId: createdEventId, body },
          {
            onSuccess: () => resolve(),
            onError: () => {
              hasError = true;
              resolve();
            },
          },
        );
      });
    }

    if (hasError) {
      toaster.error({
        title: "Partial error",
        description: "Some ticket types could not be created.",
      });
    } else {
      toaster.success({
        title: "Event published!",
        description: "Your event and tickets are ready.",
      });
      setStep("done");
      setEventForm(EMPTY_EVENT);
      setTickets([]);
      setCreatedEventId(null);
    }
  };

  const handleReset = () => {
    setStep("event");
    setEventForm(EMPTY_EVENT);
    setTickets([]);
    setCreatedEventId(null);
    setEventErrors({});
    setTicketErrors({});
  };

  return (
    <Box
      border="1px solid"
      borderColor="border"
      borderRadius="2xl"
      p={{ base: 5, md: 7 }}
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.800" }}
      shadow="sm"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading fontSize="lg" fontWeight="bold" mb={0.5}>
            Create an event
          </Heading>
          <Text fontSize="sm" color="text">
            {step === "event" && "Step 1 — Event details"}
            {step === "tickets" && "Step 2 — Ticket types"}
            {step === "done" && "Event published successfully"}
          </Text>
        </Box>

        <HStack gap={2}>
          <Badge
            colorPalette={step === "event" ? "purple" : "green"}
            variant="solid"
            borderRadius="full"
            px={3}
          >
            1
          </Badge>
          <Box w={6} h="1px" bg="border" />
          <Badge
            colorPalette={
              step === "tickets" ? "purple" : step === "done" ? "green" : "gray"
            }
            variant={step === "event" ? "outline" : "solid"}
            borderRadius="full"
            px={3}
          >
            2
          </Badge>
        </HStack>
      </Flex>

      {step === "done" && (
        <Stack gap={4} align="center" py={6} textAlign="center">
          <Text fontSize="3xl">🎉</Text>
          <Heading fontSize="md">Your event is live!</Heading>
          <Text color="text" fontSize="sm">
            Attendees can now find and book your event.
          </Text>
          <Button colorPalette="purple" size="sm" onClick={handleReset}>
            Create another event
          </Button>
        </Stack>
      )}

      {step === "event" && (
        <Stack gap={4}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            <Box>
              <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
                Title *
              </Text>
              <Input
                name="title"
                placeholder="My awesome event"
                value={eventForm.title}
                onChange={handleEventChange}
                size="sm"
                borderColor={eventErrors.title ? "danger" : undefined}
              />
              {eventErrors.title && (
                <Text color="danger" fontSize="xs" mt={1}>
                  {eventErrors.title}
                </Text>
              )}
            </Box>

            <Box>
              <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
                Category *
              </Text>
              <NativeSelect.Root size="sm">
                <NativeSelect.Field
                  name="categoryId"
                  value={eventForm.categoryId}
                  onChange={handleEventChange}
                  borderColor={eventErrors.categoryId ? "danger" : undefined}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </NativeSelect.Field>
              </NativeSelect.Root>
              {eventErrors.categoryId && (
                <Text color="danger" fontSize="xs" mt={1}>
                  {eventErrors.categoryId}
                </Text>
              )}
            </Box>
          </Grid>

          <Box>
            <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
              Location *
            </Text>
            <Input
              name="location"
              placeholder="Antananarivo, Madagascar"
              value={eventForm.location}
              onChange={handleEventChange}
              size="sm"
              borderColor={eventErrors.location ? "danger" : undefined}
            />
            {eventErrors.location && (
              <Text color="danger" fontSize="xs" mt={1}>
                {eventErrors.location}
              </Text>
            )}
          </Box>

          <Box>
            <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
              Date & time *
            </Text>
            <Input
              name="eventDate"
              type="datetime-local"
              value={eventForm.eventDate}
              onChange={handleEventChange}
              size="sm"
              borderColor={eventErrors.eventDate ? "danger" : undefined}
            />
            {eventErrors.eventDate && (
              <Text color="danger" fontSize="xs" mt={1}>
                {eventErrors.eventDate}
              </Text>
            )}
          </Box>

          <Box>
            <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
              Description
            </Text>
            <Textarea
              name="description"
              placeholder="Describe your event..."
              value={eventForm.description}
              onChange={handleEventChange}
              size="sm"
              rows={3}
            />
          </Box>

          <Flex justify="flex-end" mt={2}>
            <Button
              colorPalette="purple"
              size="sm"
              fontWeight="semibold"
              loading={isCreatingEvent}
              loadingText="Creating..."
              onClick={handleSubmitEvent}
            >
              Next - Add tickets →
            </Button>
          </Flex>
        </Stack>
      )}

      {step === "tickets" && (
        <Stack gap={5}>
          {tickets.length > 0 && (
            <Stack gap={2}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="text"
                textTransform="uppercase"
              >
                Added ticket types ({tickets.length})
              </Text>
              {tickets.map((ticket) => (
                <Flex
                  key={ticket._id}
                  justify="space-between"
                  align="center"
                  p={3}
                  border="1px solid"
                  borderColor="border"
                  borderRadius="lg"
                  _dark={{ borderColor: "gray.700" }}
                >
                  <Box>
                    <Text fontWeight="semibold" fontSize="sm">
                      {ticket.name}
                    </Text>
                    <Text fontSize="xs" color="text">
                      {ticket.totalSeats} seats ·{" "}
                      {ticket.price.toLocaleString()} MGA · max{" "}
                      {ticket.maxPerUser}/user
                    </Text>
                  </Box>
                  <Button
                    size="xs"
                    variant="ghost"
                    colorPalette="red"
                    onClick={() => handleRemoveTicket(ticket._id)}
                  >
                    <FaTrash />
                  </Button>
                </Flex>
              ))}
            </Stack>
          )}

          <Separator />

          <Text fontSize="sm" fontWeight="semibold">
            Add a ticket type
          </Text>

          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={3}>
            <Box>
              <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
                Name *
              </Text>
              <Input
                name="name"
                placeholder="VIP, Standard..."
                value={ticketForm.name}
                onChange={handleTicketChange}
                size="sm"
                borderColor={ticketErrors.name ? "danger" : undefined}
              />
              {ticketErrors.name && (
                <Text color="danger" fontSize="xs" mt={1}>
                  {ticketErrors.name}
                </Text>
              )}
            </Box>

            <Box>
              <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
                Price (MGA) *
              </Text>
              <Input
                name="price"
                type="number"
                min={0}
                placeholder="20000"
                value={ticketForm.price}
                onChange={handleTicketChange}
                size="sm"
                borderColor={ticketErrors.price ? "danger" : undefined}
              />
              {ticketErrors.price && (
                <Text color="danger" fontSize="xs" mt={1}>
                  {ticketErrors.price}
                </Text>
              )}
            </Box>

            <Box>
              <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
                Total seats *
              </Text>
              <Input
                name="totalSeats"
                type="number"
                min={1}
                placeholder="100"
                value={ticketForm.totalSeats}
                onChange={handleTicketChange}
                size="sm"
                borderColor={ticketErrors.totalSeats ? "danger" : undefined}
              />
              {ticketErrors.totalSeats && (
                <Text color="danger" fontSize="xs" mt={1}>
                  {ticketErrors.totalSeats}
                </Text>
              )}
            </Box>

            <Box>
              <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
                Max per user
              </Text>
              <Input
                name="maxPerUser"
                type="number"
                min={1}
                placeholder="5"
                value={ticketForm.maxPerUser}
                onChange={handleTicketChange}
                size="sm"
              />
            </Box>
          </Grid>

          <Button
            variant="outline"
            colorPalette="purple"
            size="sm"
            onClick={handleAddTicket}
            alignSelf="flex-start"
          >
            <FaPlus />
            Add ticket type
          </Button>

          <Separator />

          <Flex justify="space-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("event")}
              disabled={isCreatingTicket}
            >
              ← Back
            </Button>
            <Button
              colorPalette="purple"
              size="sm"
              fontWeight="semibold"
              loading={isCreatingTicket}
              loadingText="Publishing..."
              onClick={handleSubmitTickets}
              disabled={tickets.length === 0}
            >
              Publish event
            </Button>
          </Flex>
        </Stack>
      )}
    </Box>
  );
}
