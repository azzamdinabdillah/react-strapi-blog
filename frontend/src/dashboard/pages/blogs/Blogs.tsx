import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BlogIF } from "../../../interface/BlogIF";
import BaseSidebarHeader from "../../layouts/BaseSidebarHeader";
import { useEffect, useState } from "react";
import { httpRequest } from "../../../helpers/http-request";
import CardStat from "../../components/CardStat";
import Button from "../../components/Button";
import { Link } from "react-router";

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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

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
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: false,
  });

  return (
    <BaseSidebarHeader title="Blogs">
      <div className="top">
        <div className="flex gap-4 w-full overflow-auto ">
          <CardStat
            image="/dashboard/icons/stat-1.svg"
            title="Blog Total"
            subTitle={blogPosts.length}
          />
          <CardStat
            image="/dashboard/icons/stat-1.svg"
            title="Blog Total"
            subTitle={blogPosts.length}
          />
          <CardStat
            image="/dashboard/icons/stat-1.svg"
            title="Blog Total"
            subTitle={blogPosts.length}
          />
        </div>
      </div>

      <div className="flex items-center justify-between divider-section">
        <h5 className="section-title">Blogs List</h5>
        <Link to={"/dashboard/blogs/add-blog"}>
          <Button>Add Blog</Button>
        </Link>
      </div>

      <div className="py-[17px] md:py-[22px] pb-[2px] px-5 bg-white rounded-2xl xl:px-[30px]">
        <div className="overflow-auto">
          <table className="w-full overflow-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-e6">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-blue-71 text-xs font-medium pb-[7px] text-start xl:text-base"
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
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`text-black-23 text-xs font-normal py-[15px] md:py-[18px] xl:py-[23px] capitalize whitespace-nowrap pr-6 max-w-[200px] text-ellipsis overflow-hidden xl:text-base`}
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

      <div className="pagination gap-2.5 flex justify-end items-center text-[#1814F3] text-xs font-medium pt-4 xl:text-base xl:pt-[30px]">
        <button
          className="prev flex items-center gap-3 cursor-pointer disabled:opacity-30"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
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
        </button>
        <div className="gap-[22px] flex items-center">
          {Array.from({ length: table.getPageCount() }).map((_, index) => (
            <button
              key={index}
              onClick={() => table.setPageIndex(index)}
              className={`cursor-pointer ${
                table.getState().pagination.pageIndex === index
                  ? "w-[30px] h-[30px] xl:h-[40px] xl:w-[40px] flex justify-center items-center rounded-[7px] bg-[#1814F3] text-white"
                  : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="next flex items-center gap-3 cursor-pointer disabled:opacity-30"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
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
        </button>
      </div>
    </BaseSidebarHeader>
  );
}
