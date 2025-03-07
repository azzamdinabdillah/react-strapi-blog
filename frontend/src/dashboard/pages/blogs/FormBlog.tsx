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
import { useMutation, useQuery } from "@tanstack/react-query";
import { RichText } from "../../components/RichText";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import api from "../../../helpers/axios-config";

interface InputPostIF {
  title: string;
  author: string;
  description: string;
  category: string;
  image: number | { id: number };
  content: any;
}

export default function FormBlog() {
  const params = useParams();
  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryIF[]>([]);
  const [inputs, setInputs] = useState<InputPostIF>({
    author: "Azam Din Abdillah",
    category: "dzwqgmvm4sy98oaaldzt7mv1",
    // category: "xy46jis1ufhncvhlmk170lc9",
    content: "<h1>halo</h1>",
    description: "dan ini adalah deskripsi",
    image: 0,
    title: "Cara Ngoding JavaScript",
  });

  if (params.id) {
    console.log('enek id ne');
    
    const { data: editData } = useQuery({
      queryKey: ["editData"],
      queryFn: async () => {
        const response = await httpRequest({
          type: "get",
          url: `/blogs/${params.id}?populate=*`,
        });

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
        });
        
        setIsEditPage(true);
        setPreviewImage(import.meta.env.VITE_BE_URL + editData.image.url);
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

    setInputs(
      produce((draft) => {
        draft.category = response[1].documentId;
      })
    );
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

      if (image !== null) {
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
      } else {
        return false;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      
      toast.success("Image uploaded succesfully");
    },
    onError: (error) => {
      console.log(error);

      toast.success("Image uploaded failed " + error);
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
    onSuccess: () => {
      toast.success(`Data ${isEditPage ? "Updated" : "Added"} succesfully`);
    },
    onError: () => toast.success("Data added failed"),
  });

  const deleteImage = useMutation({
    mutationFn: async (imageId: number) =>
      await api.delete(`/upload/files/${imageId}`),
    onError: () => toast.error("Image failed to delete from server"),
    onSuccess: () => toast.success("data successfully deleted from server"),
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const imageUpload = await mutationImage.mutateAsync(image);

      if (imageUpload) {

        const imageId = imageUpload[0].id;

        const newInputs = {
          ...inputs,
          image: imageId,
        };

        if (isEditPage) {
          await deleteImage.mutateAsync(
            typeof inputs.image === "object"
              ? (inputs.image as { id: number }).id
              : inputs.image
          );
        }
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
    } catch (error) {
      console.log(error);
      toast.error(error as any);
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
        <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
          <InputTextGroup
            placeholder="Charlene Reed"
            label="Title"
            value={inputs.title}
            onChangeInput={(e) =>
              setInputs(
                produce((draft) => {
                  draft.title = e.target.value;
                })
              )
            }
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
              <Label label="Thumbnail" />
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
      </div>
    </BaseSidebarHeader>
  );
}
