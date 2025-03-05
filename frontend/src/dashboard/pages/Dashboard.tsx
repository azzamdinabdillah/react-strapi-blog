import { useQuery } from "@tanstack/react-query";
import BaseSidebarHeader from "../layouts/BaseSidebarHeader";
import api from "../../helpers/axios-config";

export default function Dashboard() {
  const {data: userData} = useQuery({
    queryKey: ["user"],
    queryFn: async () => await api.get('/users/me')
  });

  return (
    <BaseSidebarHeader title="Overview">
      <h1 className="capitalize">Welcome {userData?.data.username}</h1>
    </BaseSidebarHeader>
  );
}
