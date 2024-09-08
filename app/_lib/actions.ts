"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  isValidAlphanumeric,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";
import { RawBooking } from "../_ts/interfaces/app_interfaces";

export async function updateGuestAction(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID") + "";
  const [nationality, countryFlag] = (formData.get?.("nationality") + "").split(
    "%"
  );

  if (!isValidAlphanumeric(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  await updateGuest(+session.user.id, updateData);

  revalidatePath("/account/profile");
}

export async function deleteReservationAction(
  bookingId: number
): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) throw new Error("You must be logged in");

  const BookingsIDs = (await getBookings(+session?.user?.id)).map(
    (booking) => booking.id
  );

  if (BookingsIDs.includes(bookingId))
    throw new Error(
      "Only bookings of the currently logged in user can be deleted by that user"
    );

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservationAction(
  formData: FormData
): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) throw new Error("You must be logged in");

  const id = +(formData?.get("bookingId") ?? 0);
  const numGuests = +(formData?.get("numGuests") ?? 0);
  const observations = formData?.get("observations") + "";

  const updatedData = {
    id,
    numGuests,
    observations,
  };

  await updateBooking(id, updatedData);

  redirect("/account/reservations");
}

export async function createBookingAction(
  bookingData: {
    startDate: Date | undefined;
    endDate: Date | undefined;
    numNights: number;
    cabinPrice: number;
    cabinId: number;
  },
  formData: FormData
): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("You must be logged in");

  if (bookingData.startDate === undefined || bookingData.endDate === undefined)
    throw new Error("Invalid dates");

  const numGuests = +(formData.get("numGuests") ?? 0);

  const observations = (formData.get("observations") + "").slice(0, 1000);

  const newBooking: RawBooking = {
    ...bookingData,
    guestId: +session.user.id,
    numGuests,
    observations,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function signInAction(): Promise<void> {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
