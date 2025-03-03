import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  InputImage,
  InputTextAreaGroup,
  InputTextGroup,
} from "../../components/Inputs";
import { Label } from "../../components/Label";
import { SelectGroup } from "../../components/Selects";
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
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryIF[]>([]);
  const [inputs, setInputs] = useState<InputPostIF>({
    author: "Azam Din Abdillah",
    // category: "dzwqgmvm4sy98oaaldzt7mv1",
    category: "xy46jis1ufhncvhlmk170lc9",
    content: [
      {
        "type": "doc",
        "from": 0,
        "to": 574,
        "content": [
          {
            "type": "heading",
            "from": 0,
            "to": 11,
            "attrs": {
              "level": 2
            },
            "content": [
              {
                "type": "text",
                "from": 1,
                "to": 10,
                "text": "Hi there,"
              }
            ]
          },
          {
            "type": "paragraph",
            "from": 11,
            "to": 169,
            "content": [
              {
                "type": "text",
                "from": 12,
                "to": 22,
                "text": "this is a "
              },
              {
                "type": "text",
                "from": 22,
                "to": 27,
                "marks": [
                  {
                    "type": "italic"
                  }
                ],
                "text": "basic"
              },
              {
                "type": "text",
                "from": 27,
                "to": 39,
                "text": " example of "
              },
              {
                "type": "text",
                "from": 39,
                "to": 45,
                "marks": [
                  {
                    "type": "bold"
                  }
                ],
                "text": "Tiptap"
              },
              {
                "type": "text",
                "from": 45,
                "to": 168,
                "text": ". Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:"
              }
            ]
          },
          {
            "type": "bullet_list",
            "from": 169,
            "to": 230,
            "content": [
              {
                "type": "list_item",
                "from": 170,
                "to": 205,
                "attrs": {
                  "color": ""
                },
                "content": [
                  {
                    "type": "paragraph",
                    "from": 171,
                    "to": 204,
                    "content": [
                      {
                        "type": "text",
                        "from": 172,
                        "to": 203,
                        "text": "That’s a bullet list with one …"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    ],
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

    // 3. Update `inputs` sebelum submit ke `/blogs`
    const newInputs = {
      ...inputs,
      image: imageId, // Pastikan `image` memiliki ID yang valid
    };
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
          <SelectGroup
            label="Category"
            selected={inputs.category}
            option={categories.map((cat) => ({
              label: "Category",
              text: cat.name,
              value: cat.documentId || "",
            }))}
          />
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
          <RichText/>

          <Button buttonType="submit" customClassName="w-fit">
            Submit
          </Button>
        </form>
      </div>
    </BaseSidebarHeader>
  );
}
