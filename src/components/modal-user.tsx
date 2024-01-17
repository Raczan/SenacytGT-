"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { table } from "@/components/data-table";
import { putUser } from "@/fetch/fetchData";
import { User } from "@/components/columns";

export function AddUser({
	hideBtn,
	open,
	setOpen,
	type,
	user,
	index,
}: {
	hideBtn: boolean;
	open: any;
	setOpen: any;
	type: string;
	user?: User;
	index?: number;
}) {
	const formSchema = z.object({
		nombre: z.string().trim().min(1, { message: "El nombre es obligatorio" }),
		codigo_postal: z.string(),
		fecha_nacimiento: z.string(),
		provincia: z.string(),
		apellido2: z.string(),
		email: z.string(),
		apellido1: z
			.string()
			.trim()
			.min(1, { message: "El primer apellido es obligatorio" }),
		numero_via: z.string(),
		direccion_completa: z.string(),
		direccion: z.string(),
		ssn: z.string(),
		tarjeta_fecha: z.string(),
		nombre_completo: z.string(),
		iban: z.string(),
		municipio: z.string(),
		contrasenya: z.string(),
		pasaporte: z.string(),
		telefono: z.string(),
		nombre_usuario: z
			.string()
			.trim()
			.min(1, { message: "Nombre de usuario es obligatorio" }),
		tarjeta_cvc: z.string(),
		bic: z.string(),
		id: z
			.string()
			.min(1, { message: "ID es obligatorio" })
			.regex(
				new RegExp(/^\d{8}[A-Z]$/),
				"Primeros 8 caracteres son dígitos, y el último es una letra mayúscula"
			),
		tarjeta: z.string(),
	});

	const defaultVal = {
		nombre: user?.nombre ? user.nombre : "",
		codigo_postal: "03004",
		fecha_nacimiento: "01/01/2024",
		provincia: "Sumpango",
		apellido2: user?.apellido2 ? user.apellido2 : "",
		email: "email@gmail.com",
		apellido1: user?.apellido1 ? user.apellido1 : "",
		numero_via: "94",
		direccion_completa: "Plazuela Iglesia, 94, 44257, Vinaceite(Teruel)",
		direccion: "Plazuela Iglesia",
		ssn: "43128974032",
		tarjeta_fecha: "11/27",
		nombre_completo: "SAMUEL SANTO LINARES",
		iban: "ES8800818361962444238963",
		municipio: "Vinaceite",
		contrasenya: "bS3iK1kN",
		pasaporte: "NRW794204D",
		telefono: "782609481",
		nombre_usuario: user?.nombre_usuario ? user.nombre_usuario : "",
		tarjeta_cvc: "922",
		bic: "BSABESM1320",
		id: user?.id ? user.id : "",
		tarjeta: "4956383969444906",
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultVal,
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		values.nombre_completo =
			values.nombre + " " + values.apellido1 + " " + values.apellido2;
		putUser(values);
		setOpen(false);
		const meta = table.options.meta;
		if (type === "Editar") {
			meta.updateUser(values, index);
		} else {
			meta.adUser(values);
		}
	}

	useEffect(() => {
		if (!open) {
			form.reset();
		} else {
			form.reset(defaultVal);
		}
	}, [open]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className={hideBtn ? "hidden" : ""}>
				<Button variant="default">Agregar</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{type} Usuario</DialogTitle>
					<DialogDescription>
						Llena los siguientes campos para {type} un usuario. Haga clic en
						guardar cuando haya terminado.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<section>
							<Label>Nombre completo</Label>
							<FormField
								control={form.control}
								name="nombre"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="Nombre" {...field} className="mt-2" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col gap-2 lg:flex-row mt-2">
								<FormField
									control={form.control}
									name="apellido1"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormControl>
												<Input placeholder="Primer apellido" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="apellido2"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormControl>
												<Input placeholder="Segundo apellido" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>
						<FormField
							control={form.control}
							name="nombre_usuario"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre usuario</FormLabel>
									<FormControl>
										<Input placeholder="Nombre usuario" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ID</FormLabel>
									<FormControl>
										<Input placeholder="Id unico" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Guardar</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
