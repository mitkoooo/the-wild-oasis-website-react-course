import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { Cabin } from "../_ts/interfaces/app_interfaces";

const CabinList = async (): Promise<React.JSX.Element | null> => {
  const cabins: Array<Cabin> = await getCabins();

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
