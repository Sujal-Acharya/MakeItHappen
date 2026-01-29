import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Zap, CheckCircle2, BarChart3, Award } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Grids */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-40"></div>
                <div className="absolute inset-0 bg-grid-mask"></div>
            </div>

            {/* Navigation */}
            <nav className="border-b border-primary/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center shadow-lg shadow-primary/20">
                            <Target className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">MakeItHappen</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="hover:bg-primary/5">Login</Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 py-24 md:py-32 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in relative">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary mb-8 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Trusted by 10,000+ Achievers
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                            Build <span className="gradient-text">Habits</span>, <br />
                            Track <span className="gradient-text-alt">Goals</span>, and <br />
                            Achieve <span className="gradient-text">Success</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                            Enterprise-grade goal tracking that scales with your ambitions.
                            From daily habits to life-changing milestones, we power your future.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/signup" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 shadow-premium transition-all duration-300">
                                    Start Free Today
                                </Button>
                            </Link>
                            <Link href="/login" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8 border-primary/20 hover:bg-primary/5 bg-background/50 backdrop-blur-sm">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Constructed for <span className="gradient-text">Performance</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Powerful features designed to help you stay focused and achieve your goals faster.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        <Card className="card-hover border-primary/10 glass bg-gradient-to-b from-white/5 to-transparent dark:from-white/5 dark:to-transparent">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle className="text-xl">Goal Tracking</CardTitle>
                                <CardDescription className="text-base">
                                    Set, track, and achieve your goals with our intuitive progress tracking system
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-hover border-secondary/10 glass bg-gradient-to-b from-white/5 to-transparent dark:from-white/5 dark:to-transparent">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mb-4 shadow-lg shadow-secondary/20">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle className="text-xl">Analytics</CardTitle>
                                <CardDescription className="text-base">
                                    Visualize your progress with beautiful charts and insightful analytics
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-hover border-green-500/10 glass bg-gradient-to-b from-white/5 to-transparent dark:from-white/5 dark:to-transparent">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/20">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle className="text-xl">Community</CardTitle>
                                <CardDescription className="text-base">
                                    Connect with friends, join groups, and stay motivated together
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-hover border-orange-500/10 glass bg-gradient-to-b from-white/5 to-transparent dark:from-white/5 dark:to-transparent">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                                    <Zap className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle className="text-xl">Streaks</CardTitle>
                                <CardDescription className="text-base">
                                    Build consistency with daily streaks and habit formation tools
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 relative z-10">
                <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            How It <span className="gradient-text-alt">Works</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Get started in minutes and start achieving your goals today
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            { step: "1", title: "Create Account", desc: "Sign up in seconds with email or Google", color: "from-primary-600 to-primary-700" },
                            { step: "2", title: "Set Goals", desc: "Define clear, measurable goals with deadlines", color: "from-secondary-600 to-secondary-700" },
                            { step: "3", title: "Track Progress", desc: "Log daily progress and build momentum", color: "from-green-600 to-green-700" },
                            { step: "4", title: "Achieve Success", desc: "Celebrate wins and set new challenges", color: "from-orange-600 to-orange-700" }
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                                    {item.step}
                                </div>
                                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto relative group">
                        {/* Glow Effect behind the card */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                        <Card className="relative bg-[#020617] border-white/10 overflow-hidden rounded-[2rem] shadow-2xl">
                            {/* Inner Background Elements */}
                            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
                            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]"></div>
                            <div className="absolute inset-0 bg-grid opacity-[0.05]"></div>

                            <CardContent className="p-16 md:p-24 text-center relative z-10">
                                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                                    Ready to <span className="gradient-text">Make It Happen?</span>
                                </h2>
                                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                                    Join thousands of achievers building their future with our enterprise-grade goal tracking platform.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                    <Link href="/signup">
                                        <Button size="lg" className="h-16 px-12 text-lg bg-white text-black hover:bg-gray-200 font-semibold shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]">
                                            Get Started Free
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button size="lg" variant="ghost" className="h-16 px-8 text-lg text-muted-foreground hover:text-white hover:bg-white/5">
                                            Schedule Demo
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-primary/10 py-12 bg-background/50 backdrop-blur-lg relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center shadow-lg">
                                <Target className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-lg">MakeItHappen</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 MakeItHappen. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-sm text-muted-foreground">
                            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
