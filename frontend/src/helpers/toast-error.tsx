import { toast } from "react-toastify";

export function toastError(errors: any) {
  return toast.error(
    Array.isArray(errors) ? (
      <div className="">
        Error : <br />
        <ul className="pl-5">
          {errors.map((e: any, index: number) => (
            <li className="list-decimal" key={index}>
              {e.message}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      "Error : " + errors
    )
  );
}
