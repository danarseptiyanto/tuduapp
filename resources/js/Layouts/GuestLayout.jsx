import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({
    title,
    children,
    bottomLink,
    bottomText1,
    bottomText2,
}) {
    return (
        <div className="flex min-h-screen flex-col items-center gap-5 bg-[#F8F6F5] pt-6 sm:justify-center sm:pt-0">
            <div className="mb-2 flex items-center justify-center gap-2">
                <div className="flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#F9C974]">
                    <svg
                        className="h-6 w-6 fill-gray-800"
                        viewBox="0 0 176 178"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M149.273 107.52C149.273 100.216 155.197 94.292 162.502 94.292C169.806 94.292 175.73 100.216 175.73 107.52C175.73 126.821 167.905 144.296 155.255 156.947C142.604 169.597 125.13 177.422 105.828 177.422C86.5267 177.422 69.0527 169.597 56.402 156.947C43.7513 144.296 35.9267 126.822 35.9267 107.52H35.979L35.8378 13.1761C35.8378 5.89952 41.7373 0 49.0139 0C56.2905 0 62.19 5.89952 62.19 13.1761L62.3312 107.52H62.3835C62.3835 119.519 67.2463 130.38 75.1076 138.241C82.9689 146.102 93.8302 150.965 105.828 150.965C117.827 150.965 128.688 146.102 136.549 138.241C144.41 130.38 149.273 119.519 149.273 107.52Z" />
                        <path d="M73.9862 103.701C68.8211 98.5645 68.7971 90.213 73.9339 85.048C79.0708 79.8829 87.4222 79.8589 92.5873 84.9957L106.413 98.6902L150.034 54.1705C155.143 48.9772 163.494 48.9065 168.689 54.0151C173.883 59.1237 173.953 67.4751 168.845 72.6699L115.907 126.696C110.77 131.861 102.419 131.885 97.2538 126.749L73.9876 103.701H73.9862Z" />
                        <path d="M114.424 42.1948C121.729 42.1948 127.652 48.1184 127.652 55.4232C127.652 62.728 121.729 68.6516 114.424 68.6516H13.2284C5.92353 68.6516 0 62.728 0 55.4232C0 48.1184 5.92353 42.1948 13.2284 42.1948H114.424Z" />
                    </svg>
                </div>
                <p className="text-xl font-semibold text-gray-800">tudus</p>
            </div>
            <div className="w-full max-w-[490px] px-2">
                <div className="w-full max-w-[490px] rounded-[20px] bg-black/5 p-1 backdrop-blur-md">
                    <p className="my-1.5 text-center font-semibold text-gray-700">
                        {title}
                    </p>
                    <div className="w-full overflow-hidden rounded-2xl bg-white px-6 pt-10 pb-6">
                        {children}
                    </div>
                </div>
            </div>
            <Link
                href={bottomLink}
                className="text-sm text-gray-600 hover:text-gray-900"
            >
                {bottomText1}
                <span className="text-black"> {bottomText2}</span>
            </Link>
            <div className="absolute bottom-5 flex items-center gap-1.5 text-[13px] text-gray-600">
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
