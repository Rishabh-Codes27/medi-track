export default function CalendarLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return <div className="min-h-screen bg-white w-full">
        {children}
    </div>
}