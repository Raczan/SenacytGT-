"use client";
import * as React from "react";
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { table } from "@/app/users/data-table";
import { AddUser } from "@/components/add-user";

async function deleteUser(id: string) {
  const deleteEndPoint = `https://n913tmwy61.execute-api.us-east-2.amazonaws.com/items/${id}`;
  const response = await fetch(deleteEndPoint, {
    method: "DELETE",
  });
  const resDeletion = await response.json();
  console.log(resDeletion);
}

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
      const meta = table.options.meta;
      const user = row.original;
      const [open, setOpen] = React.useState(false);
      return (
        <AlertDialog>
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
                onClick={() => {
                  setOpen(true);
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <AlertDialogTrigger asChild>
                <DropdownMenuItem>Eliminar</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Estas seguro de que quieres eliminar al usuario{" "}
                {user?.nombre_usuario}?, esta accion no puede ser revertida.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  meta.removeUser(row.index);
                  deleteUser(user.id);
                }}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
          <AddUser
            hideBtn
            open={open}
            setOpen={setOpen}
            type="Editar"
            user={user}
          />
        </AlertDialog>
      );
    },
  },
];
