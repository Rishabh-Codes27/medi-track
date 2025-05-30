export default function AccountLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return <div className="min-h-screen bg-white w-full">
        {children}
    </div>
}