import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import TextExpander from "@/app/_components/TextExpander";
import type { Metadata } from "next";
import Image from "next/image";

import Reservation from "@/app/_components/Reservation";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

type cabinIdPageProps = {
  params: { cabinId: number };
};

// export const metadata = {
//   title: "Cabin",
// };

export const generateMetadata = async ({
  params,
}: cabinIdPageProps): Promise<Metadata> => {
  const cabin = await getCabin(params.cabinId);

  if (cabin.name === null)
    return {
      title: "Cabin Not found",
    };

  return {
    title: `Cabin ${cabin.name}`,
  };
};

export const generateStaticParams = async () => {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: "" + cabin.id }));

  return ids;
};

export default async function Page({ params }: cabinIdPageProps) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
