"use client";

import { useFormStatus } from "react-dom";
import { updateReservationAction } from "../_lib/actions";
import { Booking } from "../_ts/interfaces/app_interfaces";

type UpdateReservationFormProps = {
  maxCapacity: number;
  booking: Booking;
}; /* use `interface` if exporting so that consumers can extend */

const UpdateReservationForm = ({
  maxCapacity,
  booking,
}: UpdateReservationFormProps): React.JSX.Element => {
  const { id, numGuests, observations } = booking;

  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateReservationAction}
    >
      <div className="space-y-2">
        <input name="bookingId" hidden value={id}></input>
        <label htmlFor="numGuests" defaultValue={numGuests}>
          How many guests?
        </label>
        <select
          name="numGuests"
          defaultValue={numGuests}
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={observations}
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
};

const Button = (): React.JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "Updating..." : "Update reservation"}
    </button>
  );
};
export default UpdateReservationForm;
