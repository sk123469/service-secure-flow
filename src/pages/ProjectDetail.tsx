import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Shield,
  ArrowLeft,
  Send,
  Paperclip,
  Check,
  Clock,
  IndianRupee,
  MessageSquare,
  FileText,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockProject = {
  id: 1,
  title: "E-commerce Website Development",
  client: "TechStart Pvt. Ltd.",
  provider: "Arjun Mehta",
  totalAmount: 85000,
  status: "escrow" as const,
  startDate: "Nov 15, 2024",
  dueDate: "Dec 15, 2024",
  milestones: [
    {
      id: 1,
      title: "Design Phase",
      amount: 25000,
      status: "completed",
      deliverables: ["Wireframes", "UI Mockups", "Design System"],
    },
    {
      id: 2,
      title: "Frontend Development",
      amount: 35000,
      status: "in-progress",
      deliverables: ["React Components", "Responsive Layout", "Integration"],
    },
    {
      id: 3,
      title: "Backend & Testing",
      amount: 25000,
      status: "pending",
      deliverables: ["API Development", "Database", "QA Testing"],
    },
  ],
  messages: [
    {
      id: 1,
      sender: "provider",
      name: "Arjun Mehta",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      message:
        "I've completed the design phase. Please review the deliverables and let me know if any changes are needed.",
      time: "2 days ago",
      attachments: ["design-mockups.fig", "style-guide.pdf"],
    },
    {
      id: 2,
      sender: "client",
      name: "TechStart Team",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      message:
        "The designs look great! We've approved milestone 1. Please proceed with the frontend development.",
      time: "1 day ago",
    },
    {
      id: 3,
      sender: "system",
      message: "Milestone 1 completed. ₹25,000 released to service provider.",
      time: "1 day ago",
    },
  ],
  activity: [
    { action: "Milestone 1 approved", time: "1 day ago", type: "success" },
    { action: "Design files uploaded", time: "2 days ago", type: "info" },
    { action: "Escrow funded", time: "5 days ago", type: "success" },
    { action: "Project created", time: "5 days ago", type: "info" },
  ],
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "messages" | "files">(
    "overview"
  );
  const [newMessage, setNewMessage] = useState("");

  const completedMilestones = mockProject.milestones.filter(
    (m) => m.status === "completed"
  ).length;
  const progress = Math.round(
    (completedMilestones / mockProject.milestones.length) * 100
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold">{mockProject.title}</h1>
            <p className="text-sm text-muted-foreground">
              with {mockProject.provider}
            </p>
          </div>
          <StatusBadge variant={mockProject.status} size="lg">
            In Escrow
          </StatusBadge>
        </div>
      </header>

      <main className="container py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
              {(["overview", "messages", "files"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize",
                    activeTab === tab
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in">
                {/* Progress Card */}
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Project Progress</h3>
                    <span className="text-2xl font-bold text-accent">
                      {progress}%
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-accent transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{completedMilestones} of {mockProject.milestones.length} milestones completed</span>
                    <span>Due: {mockProject.dueDate}</span>
                  </div>
                </div>

                {/* Milestones */}
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <h3 className="font-semibold mb-4">Milestones</h3>
                  <div className="space-y-4">
                    {mockProject.milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className={cn(
                          "p-4 rounded-xl border transition-all",
                          milestone.status === "completed"
                            ? "border-success/30 bg-success/5"
                            : milestone.status === "in-progress"
                            ? "border-info/30 bg-info/5"
                            : "border-border bg-muted/30"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center",
                                milestone.status === "completed"
                                  ? "bg-success text-success-foreground"
                                  : milestone.status === "in-progress"
                                  ? "bg-info text-info-foreground"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {milestone.status === "completed" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <span className="text-sm font-semibold">
                                  {index + 1}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{milestone.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {milestone.deliverables.join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold flex items-center gap-1">
                              <IndianRupee className="h-4 w-4" />
                              {milestone.amount.toLocaleString()}
                            </p>
                            <StatusBadge
                              variant={
                                milestone.status === "completed"
                                  ? "completed"
                                  : milestone.status === "in-progress"
                                  ? "escrow"
                                  : "pending"
                              }
                              size="sm"
                              showIcon={false}
                            >
                              {milestone.status === "in-progress"
                                ? "In Progress"
                                : milestone.status.charAt(0).toUpperCase() +
                                  milestone.status.slice(1)}
                            </StatusBadge>
                          </div>
                        </div>

                        {milestone.status === "in-progress" && (
                          <div className="mt-4 pt-4 border-t border-border flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Request Revision
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-accent text-accent-foreground"
                            >
                              Approve & Release
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <div className="space-y-6 max-h-[500px] overflow-y-auto mb-6">
                    {mockProject.messages.map((msg) => (
                      <div key={msg.id}>
                        {msg.sender === "system" ? (
                          <div className="flex items-center gap-2 justify-center py-2">
                            <div className="h-px flex-1 bg-border" />
                            <span className="text-xs text-muted-foreground px-2">
                              {msg.message}
                            </span>
                            <div className="h-px flex-1 bg-border" />
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "flex gap-3",
                              msg.sender === "client" && "flex-row-reverse"
                            )}
                          >
                            <img
                              src={msg.avatar}
                              alt={msg.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div
                              className={cn(
                                "max-w-[70%]",
                                msg.sender === "client" && "text-right"
                              )}
                            >
                              <p className="text-sm font-medium mb-1">
                                {msg.name}
                              </p>
                              <div
                                className={cn(
                                  "p-4 rounded-2xl",
                                  msg.sender === "client"
                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                    : "bg-muted rounded-tl-sm"
                                )}
                              >
                                <p className="text-sm">{msg.message}</p>
                              </div>
                              {msg.attachments && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {msg.attachments.map((file) => (
                                    <button
                                      key={file}
                                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-xs hover:bg-muted/80"
                                    >
                                      <FileText className="h-3.5 w-3.5" />
                                      {file}
                                      <Download className="h-3 w-3" />
                                    </button>
                                  ))}
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {msg.time}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button className="bg-gradient-accent text-accent-foreground">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "files" && (
              <div className="p-6 rounded-2xl border border-border bg-card animate-fade-in">
                <h3 className="font-semibold mb-4">Project Files</h3>
                <div className="space-y-3">
                  {["design-mockups.fig", "style-guide.pdf", "requirements.docx"].map(
                    (file) => (
                      <div
                        key={file}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{file}</span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Escrow Status */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-accent" />
                <h3 className="font-semibold">Escrow Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="font-medium flex items-center gap-1">
                    <IndianRupee className="h-3.5 w-3.5" />
                    {mockProject.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Released</span>
                  <span className="font-medium text-success flex items-center gap-1">
                    <IndianRupee className="h-3.5 w-3.5" />
                    25,000
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">In Escrow</span>
                  <span className="font-medium text-info flex items-center gap-1">
                    <IndianRupee className="h-3.5 w-3.5" />
                    60,000
                  </span>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-semibold mb-4">Activity Log</h3>
              <div className="space-y-4">
                {mockProject.activity.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                        item.type === "success"
                          ? "bg-success/10 text-success"
                          : "bg-info/10 text-info"
                      )}
                    >
                      {item.type === "success" ? (
                        <CheckCircle className="h-3.5 w-3.5" />
                      ) : (
                        <Clock className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">{item.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                View Contract
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-destructive hover:text-destructive"
              >
                <AlertTriangle className="h-4 w-4" />
                Raise Dispute
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
