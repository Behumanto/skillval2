import { Sidebar } from "@/app/components/Sidebar";

// Gemeenschappelijke layout voor rolgebaseerde dashboards.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
