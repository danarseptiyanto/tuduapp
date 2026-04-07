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
            <div className="mb-5 flex items-center justify-center gap-2">
                <div className="flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#F9C974]">
                    <svg
                        width="22"
                        height="21"
                        viewBox="0 0 22 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.5238 3.8147e-06C13.0161 3.8147e-06 15.3029 0.848087 17.1071 2.26603L15.748 5.11532C14.406 3.81806 12.5608 3.02025 10.5272 3.02025C6.4157 3.02025 3.08471 6.28186 3.08471 10.3077C3.08471 13.509 5.19354 16.2276 8.12399 17.2064L6.97372 20.0121C2.91011 18.5841 0.00019455 14.7795 0.00019455 10.3077C0.00019455 4.61586 4.71083 0.003356 10.5238 0.003356V3.8147e-06Z"
                            fill="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.2434 4.52869C20.3834 6.17458 21.0509 8.16573 21.0509 10.3044C21.0509 15.9963 16.3403 20.6088 10.5273 20.6088C9.70569 20.6088 8.9046 20.5149 8.13776 20.3406L9.30515 17.4913C9.70226 17.555 10.1097 17.5885 10.5273 17.5885C14.6388 17.5885 17.9698 14.3269 17.9698 10.301C17.9698 9.61384 17.8706 8.94677 17.6891 8.31657L19.2434 4.52534V4.52869Z"
                            fill="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.2757 16.5963L12.7249 20.3808C12.2764 20.4747 11.8142 20.5417 11.3452 20.5752C11.3521 20.5752 11.3555 20.5752 11.3624 20.5752L12.718 17.2667C13.2692 17.1025 13.7896 16.8745 14.2791 16.5963H14.2757Z"
                            fill="black"
                            fillOpacity="0.14902"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.26212 18.5874C3.9232 18.3394 3.59797 18.0746 3.28986 17.7896L4.5668 14.6755C4.83041 15.0208 5.12482 15.3392 5.4432 15.6342L4.23815 18.574L4.25869 18.5908L4.26212 18.5874Z"
                            fill="black"
                            fillOpacity="0.14902"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.4494 8.30317L4.242 18.5707C5.06705 19.1741 5.98453 19.6601 6.9739 20.0054L7.16219 19.5461L11.7736 8.30317H8.45282H8.4494ZM11.3593 20.5752L12.715 17.2667L16.8231 7.24726L18.3808 3.44597L19.6098 0.449181H16.3301L16.2891 0.452533L15.8885 1.43135L14.7211 4.28064L9.30526 17.4879L8.13787 20.3372C8.90472 20.5116 9.69895 20.6021 10.5206 20.6054C10.6096 20.6054 10.6986 20.6054 10.7876 20.6021H10.8013C10.8835 20.5987 10.9656 20.5954 11.0478 20.592L11.0854 20.5886C11.1608 20.5853 11.2326 20.5786 11.308 20.5752C11.3251 20.5752 11.3422 20.5719 11.3593 20.5719V20.5752Z"
                            fill="black"
                        />
                    </svg>
                </div>
                <p className="text-xl font-bold text-gray-800">Tudus</p>
            </div>
            <div className="w-full max-w-[490px] rounded-[20px] bg-black/5 p-1 backdrop-blur-md">
                <p className="my-1.5 text-center font-semibold text-gray-700">
                    {title}
                </p>
                <div className="w-full overflow-hidden bg-white px-6 pt-10 pb-6 sm:rounded-2xl">
                    {children}
                </div>
            </div>
            <Link
                href={bottomLink}
                className="text-sm text-gray-600 hover:text-gray-900"
            >
                {bottomText1}
                <span className="text-black"> {bottomText2}</span>
            </Link>
        </div>
    );
}
