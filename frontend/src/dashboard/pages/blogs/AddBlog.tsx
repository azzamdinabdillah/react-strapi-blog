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
import { useMutation } from "@tanstack/react-query";
import { RichText } from "../../components/RichText";

interface InputPostIF {
  title: string;
  author: string;
  description: string;
  category: string;
  image: number;
  content: any;
}

export default function AddBlog() {
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
    onError: (error) => console.log(error),
  });

  const mutation = useMutation({
    mutationFn: async (dataPost: InputPostIF) => {
      return await httpRequest({
        type: "post",
        url: "/blogs",
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
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => console.log(error),
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const imageUpload = await mutationImage.mutateAsync(image);
    const imageId = imageUpload[0].id;
    const newInputs = {
      ...inputs,
      image: imageId,
    };

    console.log(newInputs);

    await mutation.mutateAsync(newInputs);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <BaseSidebarHeader title="Blogs / Add Blog">
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
          {/* <InputTextGroup
            placeholder="Write your content here"
            label="Content"
            value={inputs.content}
            onChangeInput={(e) =>
              setInputs(
                produce((draft) => {
                  draft.content = e.target.value;
                })
              )
            }
          /> */}
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

          <Button buttonType="submit" customClassName="w-fit">
            Submit
          </Button>
        </form>
      </div>
    </BaseSidebarHeader>
  );
}
