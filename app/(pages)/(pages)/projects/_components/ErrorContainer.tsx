import { ResponseError } from "@utils/types";

export default function ErrorContainer({ error }: { error: ResponseError }) {
  return (
    <div className="my-6 w-fit rounded-2xl bg-secondary-orange p-3 text-primary">
      <h2 className="pb-4 text-size-lg">{error.name}</h2>
      <p className="text-size-sm font-semibold">{error.message}</p>
    </div>
  );
}
