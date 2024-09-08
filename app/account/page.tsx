import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

const Page = async (): Promise<React.JSX.Element> => {
  const session = await auth();
  if (session === null) throw new Error("The session is null");

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session?.user?.name}
    </h2>
  );
};

export default Page;
