import { TopBar } from "@/components/layout/top-bar";
import { SideBar } from "@/components/layout/sidebar";

export default function DashboardLayout({children,}: {children: React.ReactNode}){
    return (
        <div className="min-h-screen">
            <TopBar />
            <div className="flex">
                <SideBar />
                <main className="flex-1 px-6 py-8">
                    <div className="mx-auto max-w-container">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}