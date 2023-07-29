"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { versions } from "@/lib/utils";
import { OdooSessionTableShapeRequest } from "@/lib/validators/odooSessionsSchema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<OdooSessionTableShapeRequest>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "db",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Database" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("db")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Domain" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("url")}</div>,
  },
  {
    accessorKey: "port",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Port" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("port")}</div>,
  },
  {
    accessorKey: "odooVersion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Odoo Version" />
    ),
    cell: ({ row }) => {
      const version = versions.find(
        (version) => version.value === row.original.odooVersion
      );

      return (
        <div className="flex space-x-2 w-[20px]">
          {version && <Badge variant="outline">{version.label}</Badge>}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("username")}</div>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
