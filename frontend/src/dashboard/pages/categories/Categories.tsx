import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Link } from "react-router";
import Button from "../../components/Button";
import { formatDate } from "../../../helpers/format-date";
import { LoadingSvg } from "../../components/Loading";
import { toastError } from "../../../helpers/toast-error";
import { toast } from "react-toastify";
import { httpRequest } from "../../../helpers/http-request";

function Categories() {
  const queryClient = useQueryClient();
  const { data: dataCategories = [], isPending } = useQuery<CategoryIF[]>({
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
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return formatDate(row.original.createdAt ?? "");
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Link
            to={`/dashboard/categories/edit-category/${row.original.documentId}/${row.original.slug}`}
          >
            <Button size="xs" buttonType="button">
              Edit
            </Button>
          </Link>
          <Button
            disabled={deleteMutation.isPending ? true : false}
            onclick={() => {
              const deleteConfirm = confirm("Delete This Category?");
              if (deleteConfirm) {
                deleteMutation.mutate(row.original.id ?? "");
              }
            }}
            size="xs"
            buttonType="button"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await httpRequest({
        url: "/categories/" + id,
        type: "delete",
      });

      return response;
    },
    onError: (errors: any) => {
      toastError(errors);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("category deleted successfully");
    },
  });

  const table = useReactTable({
    data: dataCategories,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        <Link to={"/dashboard/categories/add-category"}>
          <Button buttonType="button">Add Category</Button>
        </Link>
      </div>

      <div className="py-[17px] md:py-[22px] px-5 bg-white rounded-2xl xl:px-[30px]">
        <div className="overflow-auto">
          {isPending ? (
            <div className="flex gap-2 items-center">
              <p>Loading Data</p>
              <LoadingSvg color="text-[#1814f3]" />
            </div>
          ) : dataCategories?.length > 0 ? (
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((row) => {
                  return (
                    <tr className="border-b border-gray-e6" id={row.id}>
                      {row.headers.map((header) => {
                        return (
                          <td className="capitalize text-blue-71 text-xs font-medium pb-[7px] pr-4 text-start xl:text-base">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row, index) => {
                  return (
                    <tr
                      className={`${
                        index !== dataCategories.length - 1 ? "border-b" : ""
                      } border-gray-f2`}
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            className={`text-black-23 text-xs font-normal py-[15px] md:py-[18px] xl:py-[23px] capitalize whitespace-nowrap pr-6 max-w-[200px] text-ellipsis overflow-hidden xl:text-base`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
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
          ) : (
            "Category Is Empty"
          )}
        </div>
      </div>
    </BaseSidebarHeader>
  );
}

export default Categories;
