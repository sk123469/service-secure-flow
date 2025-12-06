import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, Check, Lock, Users, Wallet, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Participants",
    description: "KYC/KYB verification ensures all users are legitimate and trustworthy.",
  },
  {
    icon: Lock,
    title: "Secure Escrow",
    description: "Funds are held safely until work is delivered and approved.",
  },
  {
    icon: Users,
    title: "Fair Disputes",
    description: "Professional mediation protects both parties in case of disagreements.",
  },
  {
    icon: Wallet,
    title: "Fast Payouts",
    description: "Instant releases to verified bank accounts upon approval.",
  },
];

const stats = [
  { value: "₹50Cr+", label: "Protected in Escrow" },
  { value: "10,000+", label: "Verified Providers" },
  { value: "99.5%", label: "Success Rate" },
  { value: "24/7", label: "Support" },
];

const categories = [
  { name: "Software Development", count: "2,340+" },
  { name: "Design & Creative", count: "1,890+" },
  { name: "Marketing & SEO", count: "1,250+" },
  { name: "Consulting", count: "980+" },
  { name: "Legal Services", count: "720+" },
  { name: "Financial Services", count: "650+" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-info rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6 animate-fade-in">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Trusted by 10,000+ businesses</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Secure Escrow for
            <span className="block text-gradient">Service Transactions</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            The trusted platform connecting verified service providers with clients.
            Funds are protected until work is delivered and approved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/auth?mode=signup&role=client">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 w-full sm:w-auto">
                Hire a Provider
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth?mode=signup&role=provider">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
                Join as Provider
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/60 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span>KYC Verified Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span>RBI Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="py-12 bg-card border-b border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose SecureEscrow?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform provides complete protection for service transactions,
            ensuring trust and safety for everyone involved.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoriesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Service Categories
          </h2>
          <p className="text-lg text-muted-foreground">
            Find verified professionals across various industries
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/marketplace?category=${encodeURIComponent(category.name)}`}
              className="group flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all"
            >
              <span className="font-medium group-hover:text-accent transition-colors">
                {category.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {category.count}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/marketplace">
            <Button variant="outline" className="gap-2">
              Browse All Categories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Find & Connect",
      description: "Browse verified service providers or post your requirements.",
    },
    {
      step: 2,
      title: "Create Escrow",
      description: "Define scope, milestones, and fund the escrow securely.",
    },
    {
      step: 3,
      title: "Work & Deliver",
      description: "Provider completes work while funds are safely held.",
    },
    {
      step: 4,
      title: "Release Payment",
      description: "Approve deliverables and release funds to provider.",
    },
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How SecureEscrow Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, secure process that protects both parties
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-accent via-accent to-accent/30" />

          {steps.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center text-xl font-bold text-accent-foreground mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Startup Founder",
      content: "SecureEscrow gave me confidence to hire remote developers. The milestone-based payments kept everyone accountable.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Freelance Designer",
      content: "Finally, a platform where I get paid on time, every time. The verification process adds so much credibility.",
      rating: 5,
    },
    {
      name: "Amit Joshi",
      role: "Agency Owner",
      content: "We've processed over ₹50 lakhs through SecureEscrow. Zero disputes, zero payment issues. Highly recommend.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our users have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-foreground mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of verified professionals and clients. Create your
              free account and start transacting with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
