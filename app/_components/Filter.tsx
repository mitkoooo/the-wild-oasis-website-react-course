"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Filter = (): React.JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter: string): void => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(
      `${pathname}?${params.toString()}
    `,
      { scroll: false }
    );
  };

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>

      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
};

type FilterProps = {
  filter: string;
  handleFilter: Function;
  activeFilter: string;
  children: string;
}; /* use `interface` if exporting so that consumers can extend */

const Button = ({
  filter,
  handleFilter,
  activeFilter,
  children,
}: FilterProps): React.JSX.Element => (
  <button
    className={`px-5 py-2 hover:bg-primary-700 ${
      filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
    }`}
    onClick={() => handleFilter(filter)}
  >
    {children}
  </button>
);

export default Filter;
