import type { Metadata } from "next";
import EventDetailsPage from "@/components/features/event/event-details-page";

export const metadata: Metadata = {
  title: "Event details",
  description: "View event details, ticket availability and book tickets.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EventDetailsPage eventId={id} />;
}
