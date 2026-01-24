import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Zap, CheckCircle2, BarChart3, Award } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                            <Target className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl gradient-text">MakeItHappen</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="gradient-bg py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Turn Your Goals Into{" "}
                            <span className="gradient-text">Reality</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Track progress, build habits, and achieve your dreams with our powerful goal tracking platform. Join thousands of successful achievers.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/signup">
                                <Button size="lg" className="text-base bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-premium">
                                    Start Free Today
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="text-base">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Everything You Need to <span className="gradient-text">Succeed</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Powerful features designed to help you stay focused and achieve your goals faster
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <Card className="card-hover border-primary/20 glass">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle>Goal Tracking</CardTitle>
                                <CardDescription>
                                    Set, track, and achieve your goals with our intuitive progress tracking system
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-hover border-secondary/20 glass">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mb-4">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle>Progress Analytics</CardTitle>
                                <CardDescription>
                                    Visualize your progress with beautiful charts and insightful analytics
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-hover border-success/20 glass">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle>Community Support</CardTitle>
                                <CardDescription>
                                    Connect with friends, join groups, and stay motivated together
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="card-hover border-warning/20 glass">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle>Streak Tracking</CardTitle>
                                <CardDescription>
                                    Build consistency with daily streaks and habit formation tools
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 gradient-bg">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            How It <span className="gradient-text">Works</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Get started in minutes and start achieving your goals today
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                1
                            </div>
                            <h3 className="font-semibold mb-2">Create Your Account</h3>
                            <p className="text-sm text-muted-foreground">
                                Sign up in seconds with email or Google
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-secondary-600 to-secondary-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                2
                            </div>
                            <h3 className="font-semibold mb-2">Set Your Goals</h3>
                            <p className="text-sm text-muted-foreground">
                                Define clear, measurable goals with deadlines
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-600 to-green-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                3
                            </div>
                            <h3 className="font-semibold mb-2">Track Progress</h3>
                            <p className="text-sm text-muted-foreground">
                                Log daily progress and build momentum
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                4
                            </div>
                            <h3 className="font-semibold mb-2">Achieve Success</h3>
                            <p className="text-sm text-muted-foreground">
                                Celebrate wins and set new challenges
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary-600 to-secondary-600 border-0 text-white shadow-premium">
                        <CardContent className="p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Make It Happen?
                            </h2>
                            <p className="text-lg mb-8 opacity-90">
                                Join thousands of achievers and start your journey today
                            </p>
                            <Link href="/signup">
                                <Button size="lg" variant="secondary" className="text-base bg-white text-primary-600 hover:bg-gray-100">
                                    Get Started Free
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-12 bg-card">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                                <Target className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-semibold">MakeItHappen</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 MakeItHappen. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
                            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
