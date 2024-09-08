"use client";

import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

function isEmpty(obj: Object) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

const initialState: DateRange = {
  from: undefined,
  to: undefined,
};

type ReservationContextType = {
  range: DateRange;
  setRange: Function;
  resetRange: () => void;
};

const fallbackValue: ReservationContextType = {
  range: initialState,
  setRange: function () {},
  resetRange: () => {},
};

const ReservationContext = createContext(fallbackValue);

type ReservationProviderProps = {
  children: React.JSX.Element;
};

const ReservationProvider = ({ children }: ReservationProviderProps) => {
  const [range, setRange]: [DateRange, Function] = useState(initialState);
  const resetRange = (): void => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context: {
    range: DateRange;
    setRange: Function;
    resetRange: () => void;
  } = useContext(ReservationContext);

  if (isEmpty(context))
    throw new Error("The context was used outside of its provider.");

  return context;
};

export { ReservationProvider, useReservation };
