import ReservationClient from "./reservation-client";

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  return <ReservationClient eventId={eventId} />;
}
