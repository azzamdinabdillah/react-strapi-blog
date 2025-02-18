import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BlogIF } from "../../interface/BlogIF";
import BaseSidebarHeader from "../layouts/BaseSidebarHeader";
import { useEffect, useState } from "react";
import { httpRequest } from "../../helpers/http-request";

const columns: ColumnDef<BlogIF>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
];

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState<BlogIF[]>([]);

  async function fetchData() {
    const response = await httpRequest({
      type: "get",
      url: "/blogs?populate=*",
    });
    setBlogPosts(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const table = useReactTable({
    data: blogPosts,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <BaseSidebarHeader title="Overview">
      <div className="py-[17px] pb-[2px] px-5 bg-white rounded-2xl">
        <div className="overflow-auto">
          <table className="w-full overflow-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-e6">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-blue-71 text-xs font-medium pb-[7px] text-start"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index !== blogPosts.length - 1 ? "border-b" : ""
                  } border-gray-f2`}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <td
                      key={cell.id}
                      className={`text-black-23 text-xs font-normal py-[15px] capitalize whitespace-nowrap pr-6 max-w-[200px] text-ellipsis overflow-hidden`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination gap-2.5 flex justify-end items-center text-[#1814F3] text-xs font-medium pt-4">
        <div className="prev flex items-center gap-3">
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 1L2 6L7 11" stroke="#1814F3" stroke-width="1.5" />
          </svg>
          Previous
        </div>
        <div className="gap-[22px] flex items-center">
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-[7px] bg-[#1814F3] text-white">1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
        <div className="next flex items-center gap-3">
          Next
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 11L6 6L1 1" stroke="#1814F3" stroke-width="1.5" />
          </svg>
        </div>
      </div>
    </BaseSidebarHeader>
  );
}
