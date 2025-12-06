import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import {
  Shield,
  Home,
  Search,
  MessageSquare,
  Wallet,
  User,
  Bell,
  Plus,
  TrendingUp,
  Clock,
  IndianRupee,
  ArrowRight,
  FileText,
  Settings,
  LogOut,
  Briefcase,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Search, label: "Browse", href: "/marketplace" },
  { icon: MessageSquare, label: "Messages", href: "/messages", badge: 3 },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
  { icon: User, label: "Profile", href: "/profile" },
];

const stats = [
  {
    label: "In Escrow",
    value: "₹1,25,000",
    icon: Shield,
    change: "+12.5%",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    label: "Completed",
    value: "₹4,50,000",
    icon: CheckCircle,
    change: "+8.2%",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Active Projects",
    value: "4",
    icon: Briefcase,
    change: "+2",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Pending Actions",
    value: "2",
    icon: Clock,
    change: "",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const recentProjects = [
  {
    id: 1,
    title: "E-commerce Website Development",
    client: "TechStart Pvt. Ltd.",
    amount: 85000,
    status: "escrow" as const,
    progress: 65,
    dueDate: "Dec 15, 2024",
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    client: "GreenLeaf Co.",
    amount: 40000,
    status: "pending" as const,
    progress: 0,
    dueDate: "Dec 20, 2024",
  },
  {
    id: 3,
    title: "SEO Optimization",
    client: "BlueSky Media",
    amount: 25000,
    status: "completed" as const,
    progress: 100,
    dueDate: "Nov 28, 2024",
  },
];

const notifications = [
  {
    id: 1,
    type: "payment",
    message: "₹25,000 released to your account",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "project",
    message: "New milestone approved for Website Development",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "message",
    message: "New message from TechStart Pvt. Ltd.",
    time: "1 day ago",
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
                <Shield className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-sidebar-foreground">
                SecureEscrow
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                  item.href === "/dashboard" &&
                    "bg-sidebar-accent text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sidebar-foreground truncate">
                  Arjun Mehta
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  Service Provider
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, Arjun
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button
              onClick={() => navigate("/new-project")}
              className="bg-gradient-accent text-accent-foreground gap-2"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      stat.bgColor
                    )}
                  >
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  {stat.change && (
                    <span className="flex items-center gap-1 text-xs font-medium text-success">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Projects */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Active Projects</h2>
                <Link
                  to="/projects"
                  className="text-sm text-accent hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/project/${project.id}`}
                    className="block p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.client}
                        </p>
                      </div>
                      <StatusBadge variant={project.status}>
                        {project.status === "escrow"
                          ? "In Escrow"
                          : project.status === "pending"
                          ? "Pending"
                          : "Completed"}
                      </StatusBadge>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="flex items-center gap-1 font-medium">
                        <IndianRupee className="h-4 w-4" />
                        {project.amount.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        Due: {project.dueDate}
                      </span>
                    </div>

                    {project.status !== "completed" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-accent transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                  >
                    <FileText className="h-4 w-4" />
                    Create Invoice
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                  >
                    <Wallet className="h-4 w-4" />
                    Request Payout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Raise Dispute
                  </Button>
                </div>
              </div>

              {/* Notifications */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Recent Activity</h3>
                  <Link
                    to="/notifications"
                    className="text-sm text-accent hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        {notification.type === "payment" ? (
                          <Wallet className="h-4 w-4 text-success" />
                        ) : notification.type === "project" ? (
                          <Briefcase className="h-4 w-4 text-info" />
                        ) : (
                          <MessageSquare className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
