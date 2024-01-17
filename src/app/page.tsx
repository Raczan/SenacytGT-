"use client";
import * as React from "react";
import { User, columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { getData } from "@/fetch/fetchData";

export default function Home() {
  const [data, setData] = React.useState<User[]>([]);

  React.useEffect(() => {
    (async () => setData(await getData()))();
  }, []);

  return (
    <main className="flex min-h-screen flex-col lg:items-center p-4 md:p-10 lg:p-20 bg-white">
      <div>
        <div className="flex flex-col space-y-1.5 pb-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Usuarios
          </h3>
          <p className="text-sm text-muted-foreground">
            Puedes Crear, Eliminar, Editar y Filtrar usuarios a traves de la
            siguiente interfaz.
          </p>
        </div>
        <DataTable columns={columns} data={data} setData={setData} />
      </div>
    </main>
  );
}
