import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../_ts/interfaces/app_interfaces";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

type ReservationProps = {
  cabin: Cabin;
}; /* use `interface` if exporting so that consumers can extend */

const Reservation = async ({
  cabin,
}: ReservationProps): Promise<React.JSX.Element> => {
  const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(cabin.id);
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
