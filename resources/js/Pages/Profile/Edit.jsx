import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import TuduLogo from "@/Components/TuduLogo";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <div className="bg-[#F8F6F5]">
            <div className="mx-auto min-h-screen max-w-[1540px] justify-between">
                <div className="mx-6 flex items-center justify-between pt-7 md:mx-14">
                    <Link href={route("tasks.index")}>
                        <TuduLogo />
                    </Link>
                    <PrimaryButton
                        onClick={() => router.get(route("tasks.index"))}
                    >
                        Back to Tasks
                    </PrimaryButton>
                </div>
                <div className="mx-6 py-8 md:mx-14">
                    <div className="mx-auto space-y-4 md:space-y-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-6">
                            <div className="h-min w-full rounded-[20px] bg-black/5 p-1 backdrop-blur-md">
                                <p className="my-1.5 text-center text-sm font-semibold text-gray-700 md:text-base">
                                    Profile Information
                                </p>
                                <div className="rounded-[18px] bg-white p-4 shadow-sm sm:p-8">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl"
                                    />
                                </div>
                            </div>
                            <div className="h-min w-full rounded-[20px] bg-black/5 p-1 backdrop-blur-md">
                                <p className="my-1.5 text-center text-sm font-semibold text-gray-700 md:text-base">
                                    Update Password
                                </p>
                                <div className="rounded-[18px] bg-white p-4 shadow-sm sm:p-8">
                                    <UpdatePasswordForm className="max-w-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="h-min w-full rounded-[20px] bg-black/5 p-1 backdrop-blur-md">
                            <p className="my-1.5 text-center text-sm font-semibold text-gray-700 md:text-base">
                                Delete Account
                            </p>
                            <div className="rounded-[18px] bg-white p-4 shadow-sm sm:p-8">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
