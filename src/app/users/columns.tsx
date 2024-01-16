"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.

export type User = {
	nombre: string;
	codigo_postal: string;
	fecha_nacimiento: Date;
	provincia: string;
	apellido2: string;
	email: string;
	apellido1: string;
	numero_via: number;
	direccion_completa: string;
	direccion: string;
	ssn: string;
	tarjeta_fecha: Date;
	nombre_completo: string;
	iban: string;
	municipio: string;
	contrasenya: string;
	pasaporte: string;
	telefono: string;
	nombre_usuario: string;
	tarjeta_cvc: number;
	bic: string;
	id: string;
	tarjeta: string;
};

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "nombre_completo",
		header: "Nombre Completo",
	},
	{
		accessorKey: "nombre_usuario",
		header: "Usuario",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const user = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Abrir menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Acciones</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => console.log("Viendo..." + user.id)}
						>
							Detalles
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => console.log("Editanto..." + user.id)}
						>
							Editar
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => console.log("Eliminando... " + user.id)}
						>
							Eliminar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
