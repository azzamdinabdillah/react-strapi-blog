import { useQuery } from "@tanstack/react-query";
import BaseSidebarHeader from "../layouts/BaseSidebarHeader";
import api from "../../helpers/axios-config";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await api.get("/users/me"),
  });

  // toast.success('adas')

  useEffect(() => console.log(userData), [userData]);

  return (
    <BaseSidebarHeader title="Overview">
      <h1 className="capitalize">Welcome {userData?.data.username}</h1>
    </BaseSidebarHeader>
  );
}
