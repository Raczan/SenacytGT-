"use client";

import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { AddUser } from "@/components/modal-user";
import { User } from "./columns";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	setData: any;
}

let table: any;

export function DataTable<TData extends User, TValue>({
	columns,
	data,
	setData,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [open, setOpen] = React.useState(false);

	table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
		meta: {
			removeUser: (rowIndex: number) => {
				const filteredUsers = (old: User[]) =>
					old.filter((_row: User, index: number) => index !== rowIndex);
				setData(filteredUsers);
			},
			adUser: (user: User) => {
				setData((current: User[]) => [...current, user]);
			},
			updateUser: (user: User, index: number) => {
				const updated = data.map((_row: User, rowIndex: number) => {
					if (rowIndex === index) {
						return user;
					} else {
						return _row;
					}
				});
				setData(updated);
			},
		},
	});

	return (
		<div>
			<div className="flex items-center justify-between py-4">
				<Input
					placeholder="Filtrar por ID..."
					value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("id")?.setFilterValue(event.target.value)
					}
					className="max-w-sm mr-2"
				/>
				<AddUser hideBtn={false} open={open} setOpen={setOpen} type="Agregar" />
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup: any) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header: any) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row: any) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell: any) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Sin resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Anterior
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Siguiente
				</Button>
			</div>
		</div>
	);
}

export { table };
