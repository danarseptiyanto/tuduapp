import ThemeToggle from "@/Components/ThemeToggle";
import { Link } from "@inertiajs/react";
import TuduLogo from "@/Components/TuduLogo";

export default function GuestLayout({
    title,
    children,
    bottomLink,
    bottomText1,
    bottomText2,
}) {
    return (
        <div className="flex h-full min-h-dvh flex-col items-center justify-between bg-[#F8F6F5] dark:bg-[#1F1F1F]">
            <div className="mx-auto w-full max-w-[1540px] justify-between">
                <div className="mx-6 flex items-center justify-between pt-[29px] md:mx-14 md:pt-7">
                    <TuduLogo />
                    <div className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-xl bg-[#F9C974] hover:bg-amber-400">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[490px] px-6 md:px-0">
                <div className="w-full max-w-[490px] rounded-[20px] bg-black/5 p-1 backdrop-blur-md dark:bg-[#161616]">
                    <p className="my-1.5 text-center font-semibold text-gray-700 dark:text-[#d1cfc0]">
                        {title}
                    </p>
                    <div className="w-full overflow-hidden rounded-2xl bg-white px-4 pt-6 pb-4 md:px-6 md:pt-10 md:pb-6 dark:bg-[#292929]">
                        {children}
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <Link
                        href={bottomLink}
                        className="text-[12.5px] text-gray-600 md:text-sm dark:text-white"
                    >
                        {bottomText1}
                        <span className="text-black dark:text-white/60">
                            {" "}
                            {bottomText2}
                        </span>
                    </Link>
                </div>
            </div>
            <div className="flex items-center gap-1.5 pb-6 text-[13px] text-gray-600 dark:text-[#d1cfc0]">
                Project by
                <a
                    className="flex aspect-square h-5.5 items-center justify-center rounded-sm bg-orange-500"
                    data-discover="true"
                    target="_blank"
                    href="https://danars.net"
                >
                    <svg
                        className="aspect-square h-3.5 fill-white"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.4724 0C15.4262 0 18.1366 1.00514 20.2748 2.68566L18.664 6.0626C17.0735 4.5251 14.8866 3.57955 12.4765 3.57955C7.60356 3.57955 3.65571 7.44516 3.65571 12.2166C3.65571 16.0107 6.15507 19.2327 9.6282 20.3927L8.26492 23.718C3.44879 22.0256 0 17.5164 0 12.2166C0 5.47064 5.58298 0.00397296 12.4724 0.00397296V0Z"
                        ></path>
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22.8067 5.36734C24.1578 7.31802 24.949 9.6779 24.949 12.2126C24.949 18.9585 19.3661 24.4252 12.4766 24.4252C11.5028 24.4252 10.5534 24.3139 9.64453 24.1074L11.0281 20.7304C11.4988 20.8059 11.9816 20.8456 12.4766 20.8456C17.3495 20.8456 21.2974 16.98 21.2974 12.2086C21.2974 11.3942 21.1797 10.6036 20.9647 9.85668L22.8067 5.36337V5.36734Z"
                        ></path>
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.9194 19.6697L15.0814 24.155C14.5499 24.2663 14.0022 24.3457 13.4463 24.3855C13.4544 24.3855 13.4585 24.3855 13.4666 24.3855L15.0733 20.4643C15.7265 20.2696 16.3433 19.9994 16.9235 19.6697H16.9194Z"
                            fill="black"
                            fill-opacity="0.14902"
                        ></path>
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.05171 22.0295C4.65003 21.7356 4.26458 21.4217 3.89941 21.084L5.41282 17.3932C5.72524 17.8024 6.07418 18.1798 6.45152 18.5295L5.02331 22.0137L5.04766 22.0335L5.05171 22.0295Z"
                            fill="black"
                            fill-opacity="0.14902"
                        ></path>
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.0139 9.84079L5.02734 22.0097C6.00518 22.7248 7.09256 23.3009 8.26515 23.7101L8.4883 23.1658L13.9536 9.84079H10.0179H10.0139ZM13.4627 24.3855L15.0694 20.4642L19.9383 8.58934L21.7844 4.08411L23.241 0.532364H19.354L19.3053 0.536337L18.8306 1.69641L17.447 5.07335L11.0282 20.7265L9.64466 24.1034C10.5535 24.31 11.4948 24.4173 12.4686 24.4212C12.5741 24.4212 12.6796 24.4212 12.7851 24.4173H12.8013C12.8987 24.4133 12.9961 24.4093 13.0934 24.4053L13.1381 24.4014C13.2273 24.3974 13.3125 24.3894 13.4018 24.3855C13.4221 24.3855 13.4424 24.3815 13.4627 24.3815V24.3855Z"
                        ></path>
                    </svg>
                </a>
                <a
                    target="_blank"
                    className="cursor-pointer"
                    href="https://danars.net"
                >
                    danars.net
                </a>
            </div>
        </div>
    );
}
