import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { DynamicParams } from "@/app/_ts/interfaces/global_interfaces";

export async function GET(
  request: Request,
  { params }: { params: DynamicParams }
): Promise<Response> {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
