export default function AdminLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-zinc-500 font-medium">Loading portal data...</p>
        </div>
    )
}
