import { FormEvent, useEffect, useState } from "react";
import { InputTextGroup } from "../../components/Inputs";
import BaseSidebarHeader from "../../layouts/BaseSidebarHeader";
import Button from "../../components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../helpers/axios-config";
import { toast } from "react-toastify";
import { LoadingButton } from "../../components/Loading";
import { toastError } from "../../../helpers/toast-error";
import { useParams } from "react-router";
import { httpRequest } from "../../../helpers/http-request";

export default function FormCategory() {
  const [name, setName] = useState<string>("");
  const [idEdit, setIdEdit] = useState<string | null>();
  const params = useParams();

  useEffect(() => {
    if (params.documentId) {
      setIdEdit(params.documentId ?? "");
    } else {
      setName("");
      setIdEdit(null);
    }
  }, [params.documentId]);

  const { data: editData, isSuccess } = useQuery({
    queryKey: ["editData", idEdit],
    queryFn: async () =>
      httpRequest({
        type: "get",
        url: "/categories/" + idEdit,
      }),
    enabled: !!idEdit,
  });

  useEffect(() => {
    if (isSuccess) {
      setName(editData.name);
    }
  }, [editData]);

  const addMutation = useMutation({
    mutationFn: async () =>
      api.post("/categories", {
        data: { name, slug: name.split(" ").join("-").toLowerCase() },
      }),
  });

  const editMutation = useMutation({
    mutationFn: async (id: string) =>
      api.put(`/categories/${id}`, {
        data: { name, slug: name.split(" ").join("-").toLowerCase() },
      }),
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (idEdit) {
        await editMutation.mutateAsync(idEdit);
        toast.success("category updated successfully");
      } else {
        await addMutation.mutateAsync();
        toast.success("category added successfully");
      }
      setName("");
    } catch (errors: any) {
      errors = errors.response.data.error.details.errors;
      toastError(errors);
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
