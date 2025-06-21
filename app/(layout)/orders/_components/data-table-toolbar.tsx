"use client";

import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table-components/data-table-view-options";
import { CirclePlus, TrashIcon } from "lucide-react";
import { CalendarDatePicker } from "@/components/calendar-date-picker";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AddOrderForm } from "@/components/layout/crud-forms/orders/add-order-form";
import { DeleteManyForm } from "@/components/layout/crud-forms/deleteMany";

interface RowData<T> {
  id: number;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData extends RowData<string>>({
  table,
}: DataTableToolbarProps<TData>) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isMultiDeleteOpen, setIsMultiDeleteOpen] = useState(false);

  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("createdAt")?.setFilterValue([from, to]);
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter Customer Name..."
          value={(table.getColumn("customer_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("customer_name")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-9 w-[250px]"
          variant="outline"
        />
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <>
            <Button variant="outline" size="sm" onClick={() => {setIsMultiDeleteOpen(true);}}>
              <TrashIcon className="mr-2 size-4" aria-hidden="true" />
              Delete ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
            <ResponsiveDialog
              isOpen={isMultiDeleteOpen}
              setIsOpen={setIsMultiDeleteOpen}
              title="Delete All Orders"
              description={`Are you sure you want to delete these selected Orders (${table.getFilteredSelectedRowModel().rows.length})`}
            >
              <DeleteManyForm ids={Object.values(table.getSelectedRowModel().rowsById).map(item => item.original.id)} setIsOpen={setIsMultiDeleteOpen}/>
            </ResponsiveDialog>
          </>
        ) : null}
        <DataTableViewOptions table={table} />


        <Button
          size="sm"
          className="bg-green-600"
          onClick={() => {
            setIsAddOpen(true);
          }}>
          <CirclePlus /> Add
        </Button>
        <ResponsiveDialog
          isOpen={isAddOpen}
          setIsOpen={setIsAddOpen}
          title="Add Order"
        >
          <AddOrderForm setIsOpen={setIsAddOpen} />
        </ResponsiveDialog>
      </div>
    </div>
  );
}