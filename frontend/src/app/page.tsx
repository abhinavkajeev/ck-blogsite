"use client";
import React, { useState, useEffect, useRef } from "react";
import { Edit3, Users, BookOpen, ArrowRight, Star, Zap, Shield, Heart, TrendingUp, MessageCircle, Award, Clock } from "lucide-react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [scrollY, setScrollY] = useState(0);

  // Refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const advancedRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Loading sequence
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const contentTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1600);
    
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(entry.target.id));
        } else {
          // Remove from visible sections when out of view to allow re-animation
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            newSet.delete(entry.target.id);
            return newSet;
          });
        }
      });
    }, observerOptions);

    const sections = [heroRef, statsRef, featuresRef, advancedRef, testimonialsRef, ctaRef, quickLinksRef];
    sections.forEach((ref, index) => {
      if (ref.current) {
        ref.current.id = `section-${index}`;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  interface Testimonial {
    name: string;
    role: string;
    content: string;
  }

  interface Stat {
    number: string;
    label: string;
  }

  interface Feature {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
  }

  interface CoreFeature extends Feature {
    detail: string;
    detailIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  const isVisible = (sectionIndex: number): boolean => visibleSections.has(`section-${sectionIndex}`);

  const testimonials = [
    { name: "Sarah Chen", role: "Travel Writer", content: "CK Blogsite transformed how I share my adventures. The community here is incredible!" },
    { name: "Marcus Rodriguez", role: "Tech Blogger", content: "Clean interface, powerful features. Perfect platform for serious writers." },
    { name: "Emma Thompson", role: "Food Critic", content: "I've found my writing home. The engagement from readers is phenomenal." }
  ];

  const stats = [
    { number: "50K+", label: "Active Writers" },
    { number: "500K+", label: "Stories Published" },
    { number: "2M+", label: "Monthly Readers" },
    { number: "98%", label: "User Satisfaction" }
  ];

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Optimized for speed with instant publishing and real-time collaboration." },
    { icon: Shield, title: "Secure & Private", description: "Your content is protected with enterprise-grade security and privacy controls." },
    { icon: TrendingUp, title: "Analytics Insights", description: "Track your readership, engagement, and grow your audience with detailed analytics." },
    { icon: MessageCircle, title: "Community Driven", description: "Connect with readers through comments, discussions, and collaborative features." }
  ];

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center">
            {/* Logo Animation */}
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight animate-pulse">
                CK <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">Blogsite</span>
              </h1>
            </div>

            {/* Loading Animation */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '1.2s'
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Loading Text */}
              <p className="text-gray-500 font-light text-lg animate-pulse">
              Preparing your writing space...
            </p>

            {/* Progress Bar */}
            <div className="mt-8 w-64 mx-auto">
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gray-400 to-gray-900 rounded-full" 
                     style={{
                       width: '100%',
                       animation: 'loading-progress 1.5s ease-out forwards'
                     }}></div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-gray-700/30 rounded-full blur-xl animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-32 right-24 w-20 h-20 bg-gray-800/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-16 w-12 h-12 bg-gray-600/40 rounded-full blur-lg animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>

          <style jsx>{`
            @keyframes loading-progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}

      {/* Multi-layer Parallax Background */}
      <div className="fixed inset-0 z-0 w-full h-full">
        {/* Parallax Background Image that covers the entire website */}
        <div
          className="fixed inset-0"
          style={{
            height: '400vh',
            top: 0,
            left: 0,
            position: 'fixed',
            willChange: 'transform',
            transform: `translateY(${-scrollY * 0.2}px)`,
            backgroundImage: `url('/img1.jpg')`,
            backgroundSize: '100vw auto',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }}
        />
        {/* Second Parallax Background Image below the first */}
        
        {/* Fallback solid background for any gaps (optional, can be removed if not needed) */}
        <div
          className="fixed inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            zIndex: -1
          }}
        />
      </div>

  {/* Removed enhanced parallax overlay for better text readability */}

      {/* Dynamic overlay that changes intensity based on scroll */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `rgba(255, 255, 255, ${Math.min(0.03 + (scrollY / 2000), 0.12)})`,
          height: '400vh'
        }}
      />

      {/* Multi-layer Geometric Patterns */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top floating elements */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'linear-gradient(45deg, #e5e7eb, #f3f4f6)',
            top: '10%',
            left: '10%',
            transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.1}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-15 blur-2xl"
          style={{
            background: 'linear-gradient(135deg, #d1d5db, #e5e7eb)',
            top: '60%',
            right: '10%',
            transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.2}px)`
          }}
        />

        {/* Middle section elements */}
        <div 
          className="absolute w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'linear-gradient(90deg, #f9fafb, #f3f4f6)',
            top: '120%',
            left: '20%',
            transform: `translate(${scrollY * 0.1}px, ${-scrollY * 0.05}px)`
          }}
        />
        <div 
          className="absolute w-72 h-72 rounded-full opacity-12 blur-2xl"
          style={{
            background: 'linear-gradient(45deg, #f1f5f9, #e2e8f0)',
            top: '140%',
            right: '15%',
            transform: `translate(${-scrollY * 0.1}px, ${scrollY * 0.08}px)`
          }}
        />

        {/* Bottom section elements */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'linear-gradient(90deg, #e2e8f0, #cbd5e1)',
            top: '200%',
            left: '50%',
            transform: `translate(-50%, 0) translate(${scrollY * 0.05}px, ${-scrollY * 0.03}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10 blur-2xl"
          style={{
            background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
            top: '250%',
            right: '10%',
            transform: `translate(${scrollY * 0.08}px, ${scrollY * 0.12}px)`
          }}
        />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen overflow-x-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
          {/* Hero Section */}
          <div ref={heroRef} className="text-center mb-32 relative">
            <div className="absolute inset-0 -top-32 -bottom-16 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-3xl rounded-full"></div>
            
            <div className="relative backdrop-blur-sm bg-white/10 rounded-3xl p-8 border border-white/20">
              <div className={`inline-flex items-center bg-white/60 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-8 transition-all duration-1000 ${isLoaded && isVisible(0) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <Award className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm text-gray-600 font-medium">Trusted by 50,000+ writers worldwide</span>
              </div>

              <h1 className={`text-5xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight transition-all duration-1200 ${isLoaded && isVisible(0) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{color: '#18181b'}}>
                CK <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent" style={{color: '#18181b', WebkitTextFillColor: '#18181b'}}>Blogsite</span>
              </h1>
              
              <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-200 ${isLoaded && isVisible(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{color: '#23272f'}}>
                A simple, elegant platform for writers and readers to share stories, build communities, and inspire each other through the power of words.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-300 ${isLoaded && isVisible(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <a 
                  href="/auth/signup" 
                  className="group relative px-10 py-5 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  <span>Start Writing Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </a>
                
                <a 
                  href="/auth/login" 
                  className="group px-10 py-5 border-2 border-white/30 text-gray-700 rounded-2xl font-semibold hover:border-white/50 hover:bg-white/20 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1 backdrop-blur-sm text-lg"
                >
                  Sign In
                </a>
              </div>

              {/* Trust indicators */}
              <div className={`flex flex-wrap justify-center items-center gap-8 opacity-70 transition-all duration-1000 delay-500 ${isLoaded && isVisible(0) ? 'translate-y-0 opacity-70' : 'translate-y-4 opacity-0'}`}>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 text-yellow-400 fill-current transition-all duration-500`} style={{ 
                      transitionDelay: `${600 + i * 100}ms`, 
                      transform: isLoaded && isVisible(0) ? 'scale(1)' : 'scale(0)' 
                    }} />
                  ))}
                  <span className="text-sm text-gray-900 ml-2 font-medium">4.9/5 rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className={`w-4 h-4 text-red-400 transition-all duration-500 delay-700`} style={{ 
                    transform: isLoaded && isVisible(0) ? 'scale(1)' : 'scale(0)' 
                  }} />
                  <span className="text-sm text-gray-900 font-medium">Loved by creators</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className="mb-32">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center group transition-all duration-700 ${isVisible(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-gray-800 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Features */}
          <div ref={featuresRef} className="mb-32">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20">
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#111827'}}>Why Writers Choose Us</h2>
                <p className="text-xl max-w-3xl mx-auto font-light" style={{color: '#1f2937'}}>Everything you need to write, publish, and grow your audience in one beautiful platform.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Edit3, title: "Write", description: "Create and publish your stories with our intuitive, distraction-free editor designed specifically for writers who care about craft.", detail: "Autosave every 10 seconds", detailIcon: Clock },
                { icon: BookOpen, title: "Read", description: "Discover engaging, thought-provoking content from talented writers worldwide. Curated feeds ensure you never miss great stories.", detail: "Personalized recommendations", detailIcon: TrendingUp },
                { icon: Users, title: "Connect", description: "Join a vibrant community of passionate readers and writers. Build meaningful connections through shared stories and experiences.", detail: "Active community discussions", detailIcon: MessageCircle }
              ].map((feature, index) => (
                <div key={index} className={`group text-center p-10 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 hover:shadow-2xl hover:shadow-gray-200/30 transition-all duration-700 hover:-translate-y-3 ${isVisible(2) ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-3'}`} style={{ transitionDelay: `${200 + index * 200}ms` }}>
                  <div className="w-20 h-20 bg-gradient-to-br from-white/80 to-white/60 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm backdrop-blur-sm">
                    <feature.icon className="w-9 h-9 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">{feature.title}</h3>
                  <p className="text-gray-800 leading-relaxed font-light text-lg mb-6">{feature.description}</p>
                  <div className="flex items-center justify-center text-gray-500 text-sm">
                    <feature.detailIcon className="w-4 h-4 mr-2" />
                    <span>{feature.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div ref={advancedRef} className="mb-32">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20">
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#18181b'}}>Powerful Features for Modern Writers</h2>
                <p className="text-lg max-w-2xl mx-auto font-light" style={{color: '#23272f'}}>Professional tools that help you focus on what matters most - your writing.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className={`group flex items-start space-x-6 p-8 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/70 hover:shadow-lg transition-all duration-700 hover:-translate-y-1 ${isVisible(3) ? 'opacity-100 translate-x-0' : `opacity-0 ${index % 2 === 0 ? '-translate-x-8' : 'translate-x-8'}`}`} style={{ transitionDelay: `${200 + index * 200}ms` }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-white/80 to-white/60 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 backdrop-blur-sm">
                    <feature.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                    <p className="text-gray-800 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div ref={testimonialsRef} className="mb-32">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20">
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#111827'}}>What Writers Say</h2>
                <p className="text-lg max-w-2xl mx-auto font-light" style={{color: '#1f2937'}}>Join thousands of writers who've made CK Blogsite their creative home.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 hover:shadow-xl transition-all duration-700 hover:-translate-y-2 ${isVisible(4) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 text-yellow-400 fill-current transition-all duration-300`} style={{ 
                        transitionDelay: `${200 + index * 150 + i * 50}ms`, 
                        transform: isVisible(4) ? 'scale(1)' : 'scale(0)' 
                      }} />
                    ))}
                  </div>
                  <p className="text-gray-800 leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-700 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div ref={ctaRef} className="mb-20">
            <div className={`relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden transition-all duration-1000 border border-white/10 ${isVisible(5) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Start Your Writing Journey?</h2>
                <p className="text-xl mb-10 max-w-2xl mx-auto font-light text-gray-100">Join thousands of writers who trust CK Blogsite to share their stories with the world.</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="/blog" 
                    className="group px-10 py-5 border-2 border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg"
                  >
                    Explore Stories
                  </a>
                </div>

                <div className="mt-8 text-gray-200 text-sm">
                  No credit card required • Free to start • 30-day money-back guarantee
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div ref={quickLinksRef} className={`text-center relative transition-all duration-1000 ${isVisible(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <p className="text-white mb-8 text-lg font-light">Already have an account?</p>
              <div className="flex flex-wrap gap-8 justify-center">
                <a 
                  href="/dashboard" 
                  className="group text-white hover:text-gray-200 font-medium transition-all duration-300 relative px-6 py-3 rounded-lg hover:bg-white/50 flex items-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </a>
                <a 
                  href="/blog" 
                  className="group text-white hover:text-gray-200 font-medium transition-all duration-300 relative px-6 py-3 rounded-lg hover:bg-white/50 flex items-center space-x-2"
                >
                  <span>Browse Blogs</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

