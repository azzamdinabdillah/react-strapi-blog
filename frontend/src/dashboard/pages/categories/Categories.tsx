import { useQuery } from "@tanstack/react-query";
import CardStat from "../../components/CardStat";
import BaseSidebarHeader from "../../layouts/BaseSidebarHeader";
import api from "../../../helpers/axios-config";
import { CategoryIF } from "../../../interface/BlogIF";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { Link } from "react-router";
import Button from "../../components/Button";

function Categories() {
  const { data: dataCategories = [] } = useQuery<CategoryIF[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get(
        "/categories?pagination[pageSize]=100&sort=createdAt:desc"
      );
      return response.data.data;
    },
  });

  const columns: ColumnDef<CategoryIF>[] = [
    {
      accessorKey: "name",
      header: "Category Name",
    },
    {
      accessorKey: "slug",
      header: "slug",
    },
  ];

  const table = useReactTable({
    data: dataCategories,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  //   useEffect(() => {
  //     console.log(table.getRowModel());
  //   }, [dataCategories]);

  return (
    <BaseSidebarHeader title="Category">
      <div className="top flex gap-4 overflow-auto">
        <CardStat
          image="/dashboard/icons/stat-1.svg"
          title="Blog Total"
          subTitle={dataCategories?.length ?? 0}
        />
      </div>

      <div className="flex items-center justify-between divider-section">
        <h5 className="section-title">Category List</h5>
        <Link to={"/dashboard/blogs/add-blog"}>
          <Button buttonType="button">Add Category</Button>
        </Link>
      </div>

      <div className="py-[17px] md:py-[22px] pb-[2px] px-5 bg-white rounded-2xl xl:px-[30px]">
        <div className="overflow-auto">
          <table>
            <thead>
              {table.getHeaderGroups().map((row) => {
                return (
                  <tr className="border-b border-gray-e6" id={row.id}>
                    {row.headers.map((header) => {
                      return (
                        <td className="text-blue-71 text-xs font-medium pb-[7px] pr-4 text-start xl:text-base">
                          {flexRender(header.id, header.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => {
                console.log(row);
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      console.log(cell);

                      return (
                        <td>
                          {flexRender(
                            cell.row.original.name,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </BaseSidebarHeader>
  );
}

export default Categories;
