import { FormEvent, useState } from "react";
import { InputTextGroup } from "../../components/Inputs";
import BaseSidebarHeader from "../../layouts/BaseSidebarHeader";
import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import api from "../../../helpers/axios-config";
import { toast } from "react-toastify";
import { LoadingButton } from "../../components/Loading";

export default function FormCategory() {
  const [name, setName] = useState<string>("");
  const addMutation = useMutation({
    mutationFn: async () =>
      api.post("/categories", {
        data: { name },
      }),
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await addMutation.mutateAsync();
      toast.success("category added successfully");
      setName("");
    } catch (errors: any) {
      errors = errors.response.data.error.details.errors;
      toast.error(
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
  };

  return (
    <BaseSidebarHeader title="Add Category">
      <div className="py-5.5 px-5 bg-white rounded-2xl w-full">
        <form className="flex gap-3 w-full flex-col" onSubmit={onSubmit}>
          <InputTextGroup
            label="Name"
            placeholder="Input category name here"
            onChangeInput={(e) => setName(e.target.value)}
            value={name}
          />

          <Button
            disabled={addMutation.isPending ? true : false}
            customClassName="w-fit"
            buttonType="submit"
          >
            {addMutation.isPending ? <LoadingButton /> : "Submit"}
          </Button>
        </form>
      </div>
    </BaseSidebarHeader>
  );
}
