export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface Country {
  name: string;
  flag: string;
  independent: boolean;
}

export interface Booking {
  id: number;
  cabinId: number;
  guestId: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  numGuests: number;
  status: bookingStatus;
  isPaid: boolean;
  hasBreakfast: boolean;
  created_at: string;
  observations: string;
}

export interface RawBooking {
  cabinId: number;
  guestId: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  numGuests: number;
  status: bookingStatus;
  isPaid: boolean;
  hasBreakfast: boolean;
  observations: string;
}

export interface Guest {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
}

export interface Settings {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  breakfastPrice: number;
}

export type bookingStatus = "unconfirmed" | "checked-in" | "checked-out";
