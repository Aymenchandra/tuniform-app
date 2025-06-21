import { columns } from "@/app/(layout)/orders/_components/columns";
import { DataTable } from "@/app/(layout)/orders/_components/data-table";
import { LayoutView } from "@/components/layout/layout-view";
import prisma from "@/lib/prisma";
import { Order } from "@prisma/client";


const getData = async (): Promise<Order[]> => {
  return await prisma.order.findMany();
}

export const Orders = async () => {
  const data = await getData();
  return (
    <LayoutView title="All Orders">
      <DataTable data={data} columns={columns} />
    </LayoutView>
  );

}