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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </BaseSidebarHeader>
  );
}
