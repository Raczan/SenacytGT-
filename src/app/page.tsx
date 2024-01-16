import { User, columns } from "../app/users/columns";
import { DataTable } from "../app/users/data-table";

async function getData(): Promise<User[]> {
	// Fetch data from API.
	const getUsers =
		"https://n913tmwy61.execute-api.us-east-2.amazonaws.com/items";
	const response = await fetch(getUsers);
	const users = await response.json();
	return users;
}

export default async function Home() {
	const data = await getData();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
			<div className="rounded-lg bg-white">
				<div className="flex flex-col space-y-1.5 p-6">
					<h3 className="text-2xl font-semibold leading-none tracking-tight">
						Usuarios
					</h3>
					<p className="text-sm text-muted-foreground">
						Puedes Crear, Eliminar, Editar y Filtrar usuarios a traves de la
						siguiente interfaz.
					</p>
				</div>
				<div className="p-6 pt-0">
					<DataTable columns={columns} data={data} />
				</div>
			</div>
		</main>
	);
}
