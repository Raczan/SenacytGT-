"use client";

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

export function AddUser() {
	const formSchema = z.object({
		nombre: z.string().trim().min(1, { message: "El nombre es obligatorio" }),
		codigo_postal: z.string(),
		fecha_nacimiento: z.string(),
		provincia: z.string(),
		apellido2: z.string(),
		email: z.string().email("El correo no es valido"),
		apellido1: z
			.string()
			.trim()
			.min(1, { message: "El primer apellido es obligatorio" }),
		numero_via: z.coerce.number(),
		direccion_completa: z.string(),
		direccion: z.string(),
		ssn: z.string(),
		tarjeta_fecha: z.string(),
		iban: z.string(),
		municipio: z.string(),
		contrasenya: z
			.string()
			.min(5, {
				message: "La contraseña debe tener un minimo de 5 caracteres",
			})
			.max(30, {
				message: "La contraseña no puede exceder 20 caracteres",
			}),
		pasaporte: z.string(),
		telefono: z.string(),
		nombre_usuario: z
			.string()
			.trim()
			.min(1, { message: "Nombre de usuario es obligatorio" }),
		tarjeta_cvc: z.number({ invalid_type_error: "Ingrese un cvc valida" }),
		bic: z.string(),
		id: z.string().trim().min(1, { message: "ID es obligatorio" }),
		tarjeta: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nombre: "",
			codigo_postal: "",
			fecha_nacimiento: new Date().toDateString(),
			provincia: "",
			apellido2: "",
			email: "",
			apellido1: "",
			numero_via: 789,
			direccion_completa: "",
			direccion: "",
			ssn: "",
			tarjeta_fecha: new Date().toDateString(),
			iban: "",
			municipio: "",
			contrasenya: Math.random().toString(36).substring(2, 11),
			pasaporte: "",
			telefono: "",
			nombre_usuario: "",
			tarjeta_cvc: 130,
			bic: "",
			id: Math.random().toString(36).substring(3, 12),
			tarjeta: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Dialog
			onOpenChange={() => {
				form.reset();
			}}
		>
			<DialogTrigger asChild>
				<Button variant="default">Agregar</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Agregar Usuario</DialogTitle>
					<DialogDescription>
						Llena los siguientes campos para crear un usuario. Haga clic en
						guardar cuando haya terminado.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<section>
							<Label>Nombre completo</Label>
							<div className="flex flex-col gap-2 lg:flex-row mt-2">
								<FormField
									control={form.control}
									name="nombre"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder="Nombre" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="apellido1"
									render={({ field }) => (
										<FormItem>
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
										<FormItem>
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Correo electronico</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="telefono"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefono</FormLabel>
									<FormControl>
										<Input placeholder="Telefono" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<section className="flex flex-col gap-2">
							<Label>Direccion completa</Label>
							<FormField
								control={form.control}
								name="direccion"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="Direccion" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col gap-2 lg:flex-row">
								<FormField
									control={form.control}
									name="numero_via"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="No. Via"
													{...field}
													inputMode="numeric"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="codigo_postal"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder="Codigo postal" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col gap-2 lg:flex-row">
								<FormField
									control={form.control}
									name="municipio"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder="Municipio" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="provincia"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder="Provincia" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>
						<DialogFooter>
							<Button type="submit">Guardar</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
