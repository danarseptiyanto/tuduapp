export default function TaskModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-[490px] rounded-[20px] bg-white/60 p-1 backdrop-blur-md">
        <div className="w-full rounded-2xl bg-white p-3">
          {/* <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                    </div> */}
          {children}
        </div>
      </div>
    </div>
  );
}
