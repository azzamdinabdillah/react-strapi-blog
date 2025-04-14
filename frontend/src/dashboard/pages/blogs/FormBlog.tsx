import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  InputImage,
  InputTextAreaGroup,
  InputTextGroup,
} from "../../components/Inputs";
import { Label } from "../../components/Label";
import { Select } from "../../components/Selects";
import BaseSidebarHeader from "../../layouts/BaseSidebarHeader";
import { CategoryIF } from "../../../interface/BlogIF";
import { httpRequest } from "../../../helpers/http-request";
import { produce } from "immer";
import Button from "../../components/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RichText } from "../../components/RichText";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import api from "../../../helpers/axios-config";
import { LoadingSvg } from "../../components/Loading";
import { toastError } from "../../../helpers/toast-error";

interface InputPostIF {
  title: string;
  author: string;
  description: string;
  category: string;
  image: number | { id: number } | null;
  content: any;
  slug: string;
}

export default function FormBlog() {
  const params = useParams();
  const queryClient = useQueryClient();
  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryIF[]>([]);
  const [editDataIsLoading, setEditDataIsLoading] = useState(false);
  const [inputs, setInputs] = useState<InputPostIF>({
    author: "",
    category: "",
    content: "",
    description: "",
    image: null,
    title: "",
    slug: "",
  });

  if (params.id) {
    const { data: editData } = useQuery({
      queryKey: ["editData"],
      queryFn: async () => {
        setEditDataIsLoading(true);
        const response = await httpRequest({
          type: "get",
          url: `/blogs/${params.id}?populate=*`,
        });

        setEditDataIsLoading(false);
        return response;
      },
    });

    useEffect(() => {
      if (editData && categories.length > 0) {
        setInputs({
          author: editData.author,
          category: editData.category.documentId,
          content: editData.content,
          description: editData.description,
          image: editData.image,
          title: editData.title,
          slug: editData.slug,
        });

        setEditDataIsLoading(false);
        setIsEditPage(true);
        setPreviewImage(editData.image.url);
      }
    }, [editData, categories]);
  } else {
    useEffect(() => {
      setIsEditPage(false);
    }, []);
  }

  async function getCategories(): Promise<CategoryIF[] | void> {
    const response = await httpRequest({
      type: "get",
      url: "/categories",
    });
    setCategories(response);
  }

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.[0];

    if (image) {
      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  const mutationImage = useMutation({
    mutationFn: async (image: File | null) => {
      const formData = new FormData();
      formData.append("files", image || "");

      const response = await httpRequest({
        type: "post",
        url: "/upload",
        body: formData,
      });

      setInputs(
        produce((draft) => {
          draft.image = response[0].id;
        })
      );

      return response;
    },
  });

  const mutation = useMutation({
    mutationFn: async (dataPost: InputPostIF) => {
      return await httpRequest({
        type: isEditPage ? "put" : "post",
        url: isEditPage ? `/blogs/${params.id}` : "/blogs",
        body: JSON.stringify({
          data: dataPost,
        }),
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      });
    },
  });

  const deleteImage = useMutation({
    mutationFn: async (imageId: number) =>
      await api.delete(`/upload/files/${imageId}`),
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let imageId;

    try {
      if (!isEditPage) {
        const imageUpload = await mutationImage.mutateAsync(image);
        imageId = imageUpload[0].id;

        const newInputs = {
          ...inputs,
          image: imageId,
        };

        await mutation.mutateAsync(newInputs);

        toast.success("Blog added successfully");
      } else {
        if (image !== null) {
          const imageUpload = await mutationImage.mutateAsync(image);
          const imageId = imageUpload[0].id;

          await deleteImage.mutateAsync(
            typeof inputs.image === "object"
              ? (inputs.image as { id: number }).id
              : inputs.image
          );

          const newInputs = {
            ...inputs,
            image: imageId,
          };
          await mutation.mutateAsync(newInputs);
        } else {
          const newInputs = {
            ...inputs,
            image:
              typeof inputs.image === "object"
                ? (inputs.image as { id: number }).id
                : inputs.image,
          };

          await mutation.mutateAsync(newInputs);
        }

        toast.success("Blog updated successfully");
        queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      }
    } catch (errors: any) {
      if (imageId) {
        deleteImage.mutate(imageId);
      }
      toastError(errors);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <BaseSidebarHeader
      title={`Blog / ${isEditPage ? "Edit Blog" : "Add Blog"}`}
    >
      <div className="py-5.5 px-5 bg-white rounded-2xl">
        {editDataIsLoading ? (
          <div className="flex gap-2 items-center">
            <p>Loading Data</p>
            <LoadingSvg color="text-[#1814f3]" />
          </div>
        ) : (
          <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
            <InputTextGroup
              placeholder="Charlene Reed"
              label="Title"
              value={inputs.title}
              onChangeInput={(e) =>
                setInputs(
                  produce((draft) => {
                    draft.title = e.target.value;
                    draft.slug = e.target.value
                      .split(" ")
                      .join("-")
                      .toLowerCase();
                  })
                )
              }
            />
            <InputTextGroup
              readonly={true}
              placeholder="Slug"
              label="Slug"
              value={inputs.slug}
            />
            <InputTextGroup
              placeholder="Azam Din Abdillah"
              label="Author"
              value={inputs.author}
              onChangeInput={(e) =>
                setInputs(
                  produce((draft) => {
                    draft.author = e.target.value;
                  })
                )
              }
            />
            <InputTextAreaGroup
              placeholder="Write your description here...."
              label="Description"
              value={inputs.description}
              onChangeTextarea={(e) =>
                setInputs(
                  produce((draft) => {
                    draft.description = e.target.value;
                  })
                )
              }
            />
            <div className="flex flex-col gap-[9px]">
              <Label label="Category" />
              <Select
                placeholder="Choose category"
                onChange={(e) =>
                  setInputs(
                    produce((draft) => {
                      draft.category = e.target.value;
                    })
                  )
                }
                selected={inputs.category}
                option={categories.map((cat) => ({
                  label: "Category",
                  text: cat.name,
                  value: cat.documentId || "",
                }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-[9px]">
                <Label
                  label="Thumbnail"
                  note={
                    isEditPage &&
                    "( if you don't want to change the image, just let it go )"
                  }
                />
                <InputImage
                  placeholder="Put your image here"
                  onChangeInput={handleImage}
                />
              </div>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt=""
                  className="w-full h-[400px] object-cover rounded"
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-[9px]">
              <Label label="Content" />
              <RichText
                value={inputs.content}
                onChange={(e) =>
                  setInputs(
                    produce((draft) => {
                      draft.content = e.target.value;
                    })
                  )
                }
              />
            </div>

            <Button
              disabled={
                mutation.isPending || mutationImage.isPending ? true : false
              }
              buttonType="submit"
              customClassName="w-fit"
            >
              {mutation.isPending || mutationImage.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  Loading
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx={12}
                      cy={12}
                      r={10}
                      stroke="currentColor"
                      strokeWidth={4}
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        )}
      </div>
    </BaseSidebarHeader>
  );
}
