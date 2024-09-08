import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { Booking } from "@/app/_ts/interfaces/app_interfaces";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type bookingIdPageProps = {
  params: { bookingId: number };
};

export const metadata: Metadata = {
  title: "Edit reservation",
};

export default async function Page({ params }: bookingIdPageProps) {
  const session = await auth();
  if (!session?.user?.id)
    throw new Error("You must be logged in to update a booking");

  const booking: Booking | null = await getBooking(params.bookingId);

  if (booking === null) notFound();

  if (booking.guestId !== +session.user.id) notFound();

  const reservationId = params.bookingId;
  const { maxCapacity, name, id } = await getCabin(booking.cabinId);

  return (
    <div>
      <div className="flex justify-center gap-96">
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Edit Reservation #{reservationId} for{" "}
          <Link href={`/cabins/${id}`} className="hover:text-accent-300">
            Cabin {name}
          </Link>
        </h2>
        <Link href="/account/reservations">Go back</Link>
      </div>
      <UpdateReservationForm maxCapacity={maxCapacity} booking={booking} />
    </div>
  );
}
