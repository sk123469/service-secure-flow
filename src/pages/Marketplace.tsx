import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  IndianRupee,
  ArrowRight,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All Services",
  "Software Development",
  "Design & Creative",
  "Marketing & SEO",
  "Consulting",
  "Legal Services",
  "Financial Services",
  "Content Writing",
  "Video & Animation",
];

const mockProviders = [
  {
    id: 1,
    name: "Arjun Mehta",
    title: "Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 127,
    location: "Mumbai, India",
    hourlyRate: 2500,
    skills: ["React", "Node.js", "Python", "AWS"],
    verified: "full" as const,
    completedProjects: 89,
    responseTime: "< 1 hour",
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviews: 94,
    location: "Bangalore, India",
    hourlyRate: 2000,
    skills: ["Figma", "UI Design", "Prototyping", "Design Systems"],
    verified: "full" as const,
    completedProjects: 72,
    responseTime: "< 2 hours",
  },
  {
    id: 3,
    name: "Rahul Verma",
    title: "Digital Marketing Expert",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    reviews: 68,
    location: "Delhi, India",
    hourlyRate: 1500,
    skills: ["SEO", "Google Ads", "Facebook Ads", "Analytics"],
    verified: "basic" as const,
    completedProjects: 45,
    responseTime: "< 3 hours",
  },
  {
    id: 4,
    name: "Sneha Patel",
    title: "Content Strategist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 156,
    location: "Pune, India",
    hourlyRate: 1800,
    skills: ["Content Strategy", "Copywriting", "SEO Writing", "Branding"],
    verified: "full" as const,
    completedProjects: 112,
    responseTime: "< 1 hour",
  },
  {
    id: 5,
    name: "Vikram Singh",
    title: "Mobile App Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    reviews: 43,
    location: "Hyderabad, India",
    hourlyRate: 2200,
    skills: ["React Native", "Flutter", "iOS", "Android"],
    verified: "basic" as const,
    completedProjects: 31,
    responseTime: "< 4 hours",
  },
  {
    id: 6,
    name: "Ananya Gupta",
    title: "Legal Consultant",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    reviews: 28,
    location: "Chennai, India",
    hourlyRate: 3500,
    skills: ["Contract Law", "IP Rights", "Compliance", "Startup Legal"],
    verified: "full" as const,
    completedProjects: 24,
    responseTime: "< 2 hours",
  },
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-center">
              Find Verified Service Providers
            </h1>
            <p className="text-lg text-primary-foreground/80 text-center mb-8 max-w-2xl mx-auto">
              Browse thousands of KYC-verified professionals. Transact with
              confidence using our secure escrow system.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2 bg-card rounded-xl p-2 shadow-xl">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for services or skills..."
                    className="pl-10 border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
                <Button className="bg-gradient-accent text-accent-foreground gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-8">
          <div className="container">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {mockProviders.length}
                </span>{" "}
                providers found
              </p>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "list"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {mockProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProviderCard({
  provider,
  viewMode,
}: {
  provider: (typeof mockProviders)[0];
  viewMode: "grid" | "list";
}) {
  if (viewMode === "list") {
    return (
      <Link
        to={`/provider/${provider.id}`}
        className="flex gap-6 p-6 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg transition-all"
      >
        <img
          src={provider.avatar}
          alt={provider.name}
          className="w-20 h-20 rounded-xl object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{provider.name}</h3>
                <VerifiedBadge level={provider.verified} />
              </div>
              <p className="text-muted-foreground">{provider.title}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg flex items-center gap-1">
                <IndianRupee className="h-4 w-4" />
                {provider.hourlyRate.toLocaleString()}/hr
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                <span className="font-medium text-foreground">
                  {provider.rating}
                </span>
                <span>({provider.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {provider.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {provider.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {provider.responseTime}
            </span>
            <span>{provider.completedProjects} projects completed</span>
          </div>
        </div>

        <Button className="self-center bg-gradient-accent text-accent-foreground gap-2">
          View Profile
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    );
  }

  return (
    <Link
      to={`/provider/${provider.id}`}
      className="group p-6 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg transition-all"
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={provider.avatar}
          alt={provider.name}
          className="w-14 h-14 rounded-xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{provider.name}</h3>
            <VerifiedBadge level={provider.verified} />
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {provider.title}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {provider.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground"
          >
            {skill}
          </span>
        ))}
        {provider.skills.length > 3 && (
          <span className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground">
            +{provider.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm mb-4">
        <span className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {provider.location}
        </span>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="font-medium">{provider.rating}</span>
          <span className="text-muted-foreground">({provider.reviews})</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="font-semibold flex items-center gap-1">
          <IndianRupee className="h-4 w-4" />
          {provider.hourlyRate.toLocaleString()}/hr
        </p>
        <Button
          size="sm"
          variant="ghost"
          className="text-accent group-hover:bg-accent/10 gap-1"
        >
          View
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Link>
  );
}
