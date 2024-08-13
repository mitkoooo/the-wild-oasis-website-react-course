export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}

export interface Country {
  name: string;
  flag: string;
  independent: boolean;
}

export interface Booking {
  id: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: bookingStatus;
  created_at: string;
  cabins: Cabin;
}

export type bookingStatus = "unconfirmed" | "checked-in" | "checked-out";
