import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirmation, setShowPasswordConfirmation] =
		useState(false);

	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	const submit = (e) => {
		e.preventDefault();

		post(route("register"), {
			onFinish: () => reset("password", "password_confirmation"),
		});
	};

	return (
		<GuestLayout
			bottomLink={route("login")}
			bottomText1="Already have an account?"
			bottomText2="Login here"
			title="Register"
		>
			<Head title="Register - Tudus" />

			<form onSubmit={submit}>
				<div>
					<InputLabel htmlFor="name" value="Name" />

					<TextInput
						id="name"
						name="name"
						value={data.name}
						className="mt-1 block w-full"
						autoComplete="name"
						isFocused={true}
						onChange={(e) => setData("name", e.target.value)}
						placeholder="John Doe"
						required
					/>

					<InputError message={errors.name} className="mt-2" />
				</div>

				<div className="mt-3 md:mt-4">
					<InputLabel htmlFor="email" value="Email" />

					<TextInput
						id="email"
						type="email"
						name="email"
						value={data.email}
						className="mt-1 block w-full"
						autoComplete="username"
						onChange={(e) => setData("email", e.target.value)}
						placeholder="your@email.com"
						required
					/>

					<InputError message={errors.email} className="mt-2" />
				</div>

				<div className="mt-3 md:mt-4">
					<InputLabel htmlFor="password" value="Password" />

					<div className="relative">
						<TextInput
							id="password"
							type={showPassword ? "text" : "password"}
							name="password"
							value={data.password}
							className="mt-1 block w-full pr-10"
							autoComplete="new-password"
							onChange={(e) =>
								setData("password", e.target.value)
							}
							placeholder="Create a password"
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-[#d1cfc0] dark:hover:text-white"
							tabIndex={-1}
						>
							{showPassword ? (
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
									/>
								</svg>
							) : (
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							)}
						</button>
					</div>

					<InputError message={errors.password} className="mt-2" />
				</div>

				<div className="mt-3 md:mt-4">
					<InputLabel
						htmlFor="password_confirmation"
						value="Confirm Password"
					/>

					<div className="relative">
						<TextInput
							id="password_confirmation"
							type={
								showPasswordConfirmation ? "text" : "password"
							}
							name="password_confirmation"
							value={data.password_confirmation}
							className="mt-1 block w-full pr-10"
							autoComplete="new-password"
							onChange={(e) =>
								setData("password_confirmation", e.target.value)
							}
							placeholder="Confirm your password"
							required
						/>
						<button
							type="button"
							onClick={() =>
								setShowPasswordConfirmation(
									!showPasswordConfirmation,
								)
							}
							className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-[#d1cfc0] dark:hover:text-white"
							tabIndex={-1}
						>
							{showPasswordConfirmation ? (
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
									/>
								</svg>
							) : (
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							)}
						</button>
					</div>

					<InputError
						message={errors.password_confirmation}
						className="mt-2"
					/>
				</div>

				<div className="mt-4 flex items-center justify-start">
					<button
						type="submit"
						disabled={processing}
						className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#F9C974] px-5 text-sm font-medium whitespace-nowrap text-black transition-all hover:bg-gray-400 md:w-min"
					>
						Register
					</button>
				</div>
			</form>

			<div className="mt-6 flex items-center justify-center">
				<span className="w-full border-t border-gray-300 dark:border-white/15"></span>
				<span className="px-3 text-sm text-gray-500 dark:text-[#d1cfc0]">
					or
				</span>
				<span className="w-full border-t border-gray-300 dark:border-white/15"></span>
			</div>

			<div className="mt-6">
				<a
					href={route("google.redirect")}
					className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-white/15 dark:bg-[#D1CFC0]/20 dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0] dark:hover:bg-[#D1CFC0]/30"
				>
					<svg className="h-5 w-5" viewBox="0 0 24 24">
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					Sign up with Google
				</a>
			</div>
		</GuestLayout>
	);
}
