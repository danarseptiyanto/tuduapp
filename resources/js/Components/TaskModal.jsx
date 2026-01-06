export default function TaskModal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg w-full max-w-md p-4">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
