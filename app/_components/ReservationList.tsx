"use client";

import { Booking } from "@/app/_ts/interfaces/app_interfaces";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservationAction } from "../_lib/actions";

type ReservationListProps = {
  bookings: Booking[];
}; /* use `interface` if exporting so that consumers can extend */

const ReservationList = ({
  bookings,
}: ReservationListProps): React.JSX.Element => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings: Booking[], bookingId: number): Booking[] => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  const handleDelete = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
