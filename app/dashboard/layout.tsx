import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | InvestDash",
  description: "View and manage your investment portfolio",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 