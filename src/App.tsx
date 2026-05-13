/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Instagram, 
  Twitter, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  ShieldCheck, 
  Clock, 
  Trophy,
  Menu,
  X,
  ArrowUp,
  CheckCircle2
} from 'lucide-react';

// --- Types ---
interface Destination {
  id: number;
  name: string;
  description: string;
  gradient: string;
}

interface Testimonial {
  id: number;
  name: string;
  content: string;
  location: string;
  rating: number;
  color: string;
}

// --- Data ---
const DESTINATIONS: Destination[] = [
  { id: 1, name: "المملكة العربية السعودية", description: "رحلات العمرة والحج بإشراف كامل", gradient: "grad-saudi" },
  { id: 2, name: "تركيا", description: "سحر إسطنبول وجمال طرابزون", gradient: "grad-turkey" },
  { id: 3, name: "الإمارات", description: "فخامة دبي وحداثة أبوظبي", gradient: "grad-uae" },
  { id: 4, name: "المغرب", description: "عبق التاريخ في مراكش وفاس", gradient: "grad-morocco" },
  { id: 5, name: "ماليزيا", description: "طبيعة كوالالمبور وشواطئ لنكاوي", gradient: "grad-malaysia" },
  { id: 6, name: "جورجيا", description: "جبال تبليسي وسحر باتومي", gradient: "grad-georgia" },
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "محمد العتيبي", content: "تجربة رائعة، الفريق محترف جداً، رحلتنا لتركيا كانت مثالية", location: "الرياض", rating: 5, color: "from-blue-400 to-indigo-500" },
  { id: 2, name: "فاطمة الشمري", content: "أنصح الجميع بأسفار طيبة، الخدمة راقية والأسعار معقولة جداً", location: "جدة", rating: 5, color: "from-orange-400 to-red-500" },
  { id: 3, name: "أحمد القحطاني", content: "حجزت رحلة العمرة معهم، التنظيم ممتاز من أول يوم لآخر يوم", location: "الدمام", rating: 5, color: "from-green-400 to-teal-500" },
  { id: 4, name: "نورة السالم", content: "خدمة 5 نجوم بكل المقاييس، شكراً لفريق أسفار طيبة", location: "المدينة المنورة", rating: 5, color: "from-purple-400 to-pink-500" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 23, minutes: 59, seconds: 59 });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // --- Effects ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="relative">
      {/* 1. NOTIFICATION BAR */}
      <div className="bg-secondary text-white py-2 px-4 text-center text-sm font-medium animate-pulse">
        🔥 10 حجوزات تمت اليوم — لا تفوت الفرصة! انضم لأكثر من 5000 مسافر سعيد
      </div>

      {/* 2. HEADER / NAVBAR */}
      <nav id="navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg py-3 mt-0' : 'bg-transparent py-5 mt-8'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white">
            <div className="bg-secondary p-1.5 rounded-lg shadow-lg">
              <Plane className="w-6 h-6 rotate-45" />
            </div>
            <span className="text-2xl font-black tracking-tight">أسفار طيبة</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">
            <a href="#home" className="hover:text-secondary transition-colors">الرئيسية</a>
            <a href="#destinations" className="hover:text-secondary transition-colors">وجهاتنا</a>
            <a href="#packages" className="hover:text-secondary transition-colors">باقاتنا</a>
            <a href="#about" className="hover:text-secondary transition-colors">عن الشركة</a>
            <a href="#contact" className="hover:text-secondary transition-colors">تواصل معنا</a>
            <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-secondary/30">
              احجز الآن
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-0 z-[60] bg-dark text-white p-8 md:hidden flex flex-col gap-8 justify-center"
          >
            <button className="absolute top-8 left-8" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-6 text-2xl font-bold">
              <a href="#home" onClick={() => setIsMenuOpen(false)}>الرئيسية</a>
              <a href="#destinations" onClick={() => setIsMenuOpen(false)}>وجهاتنا</a>
              <a href="#packages" onClick={() => setIsMenuOpen(false)}>باقاتنا</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>عن الشركة</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>تواصل معنا</a>
            </div>
            <button className="bg-secondary text-white py-4 rounded-xl font-bold text-xl">
              احجز الآن
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 3. HERO SECTION */}
        <section id="home" ref={heroRef} className="relative h-screen flex items-center overflow-hidden bg-dark">
          <motion.div style={{ y }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-l from-dark/80 via-dark/40 to-transparent z-10" />
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 to-dark" />
            {/* Animated Geometry */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </motion.div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="bg-secondary/20 text-secondary border border-secondary/30 px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  أفضل وكالة سفر لعام 2024 🏆
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                  اكتشف العالم مع <br />
                  <span className="text-secondary italic">أسفار طيبة</span>
                </h1>
                <p className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
                  نحن نرسم لك ذكريات لا تُنسى في أجمل وجهات العالم. خدمات متكاملة، رحلات دينية مريحة، وباقات ترفيهية تناسب ذوقك.
                </p>

                {/* Search Bar Container */}
                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1.5 border-l border-white/10 md:pl-4">
                      <label className="text-white/60 text-xs flex items-center gap-1"><MapPin size={12} /> الوجهة</label>
                      <input type="text" placeholder="إلى أين تريد الذهاب؟" className="bg-transparent text-white placeholder:text-white/30 outline-none text-sm" />
                    </div>
                    <div className="flex flex-col gap-1.5 border-l border-white/10 md:pl-4">
                      <label className="text-white/60 text-xs flex items-center gap-1"><Calendar size={12} /> تاريخ السفر</label>
                      <input type="date" className="bg-transparent text-white placeholder:text-white/30 outline-none text-sm [color-scheme:dark]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/60 text-xs flex items-center gap-1"><Users size={12} /> المسافرين</label>
                      <select className="bg-transparent text-white outline-none text-sm appearance-none">
                        <option value="1">1 مسافر</option>
                        <option value="2">2 مسافرين</option>
                        <option value="3">عائلة (4+)</option>
                      </select>
                    </div>
                    <button className="bg-secondary hover:bg-secondary/90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                      <Search size={20} /> ابحث الآن
                    </button>
                  </div>
                </div>

                {/* Stats Counter */}
                <div className="mt-12 flex flex-wrap gap-8">
                  {[
                    { label: "عميل راضٍ", val: "5000+" },
                    { label: "وجهة سياحية", val: "150+" },
                    { label: "سنوات خبرة", val: "10" },
                    { label: "نسبة رضا", val: "98%" },
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-3xl font-black text-white">{stat.val}</span>
                      <span className="text-white/50 text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. DESTINATIONS */}
        <section id="destinations" className="py-24 bg-light overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">استكشف</span>
                <h2 className="text-4xl font-black text-primary mt-2">وجهاتنا المميزة</h2>
              </div>
              <button className="text-primary font-bold flex items-center gap-1 border-b-2 border-primary group">
                شاهد كل الوجهات <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DESTINATIONS.map((dest) => (
                <motion.div
                  key={dest.id}
                  whileHover={{ y: -10 }}
                  className={`${dest.gradient} h-[400px] rounded-3xl p-8 relative overflow-hidden group shadow-xl`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="relative z-10 h-full flex flex-col justify-end text-white">
                    <h3 className="text-2xl font-black mb-2">{dest.name}</h3>
                    <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      {dest.description}
                    </p>
                    <button className="w-fit bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-primary transition-all">
                      استكشف الآن
                    </button>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PACKAGES */}
        <section id="packages" className="py-24 bg-white relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[conic-gradient(from_0deg_at_50%_50%,#FF6B35,#1A3A5C)] blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">أفضل العروض</span>
              <h2 className="text-4xl font-black text-primary mt-2">باقاتنا الحصرية</h2>
              <p className="text-text/60 mt-4 underline underline-offset-8 decoration-secondary/30">اختر الباقة التي تناسب تطلعاتك وميزانيتك</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Economy */}
              <motion.div whileHover={{ scale: 1.02 }} className="bg-light rounded-[2.5rem] p-10 border border-gray-100 flex flex-col h-full shadow-lg">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-primary mb-2">الباقة الاقتصادية</h3>
                  <p className="text-secondary font-black text-3xl">4,999 ريال <span className="text-sm font-normal text-slate-500">بداية من</span></p>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="text-green-500" size={20} /><span>5 أيام حافلة بالإثارة</span></div>
                  <div className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="text-green-500" size={20} /><span>فندق 3 نجوم مركزي</span></div>
                  <div className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="text-green-500" size={20} /><span>تذاكر الطيران ذهاب وإياب</span></div>
                  <div className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="text-green-500" size={20} /><span>إفطار يومي مجاني</span></div>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold transition-all transform hover:translate-y-[-4px]">
                  احجز الباقة
                </button>
              </motion.div>

              {/* Premium */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-primary rounded-[2.5rem] p-10 relative overflow-hidden text-white flex flex-col h-full shadow-2xl shadow-primary/40 ring-4 ring-secondary/20"
              >
                <div className="absolute top-6 left-6 bg-secondary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">الأكثر مبيعاً ⭐</div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">الباقة المميزة</h3>
                  <p className="text-secondary font-black text-3xl">8,999 ريال <span className="text-sm font-normal text-white/50">بداية من</span></p>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-secondary" size={20} /><span>7 أيام من الفخامة التامة</span></div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-secondary" size={20} /><span>فنادق 5 نجوم (إطلالات)</span></div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-secondary" size={20} /><span>شامل جميع الوجبات</span></div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-secondary" size={20} /><span>جولات سياحية خاصة بسيارة</span></div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-secondary" size={20} /><span>خدمة استقبال في المطار VIP</span></div>
                </div>
                <button className="w-full bg-secondary hover:bg-secondary/90 text-white py-4 rounded-2xl font-bold transition-all transform hover:translate-y-[-4px]">
                  احجز الباقة الآن
                </button>
              </motion.div>

              {/* VIP */}
              <motion.div whileHover={{ scale: 1.02 }} className="bg-light rounded-[2.5rem] p-10 border border-gray-100 flex flex-col h-full shadow-lg">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-primary mb-2">الباقة الذهبية (الملكية)</h3>
                  <p className="text-gold font-black text-3xl">14,999 ريال <span className="text-sm font-normal text-slate-500">بداية من</span></p>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="text-gold" size={20} /><span>10 أيام في عالم آخر</span></div>
                  <div className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="text-gold" size={20} /><span>أجنحة ملكية في منتجعات عالمية</span></div>
                  <div className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="text-gold" size={20} /><span>طيرا مقاعد الدرجة الأولى</span></div>
                  <div className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="text-gold" size={20} /><span>مرشد سياحي شخصي 24/7</span></div>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold transition-all transform hover:translate-y-[-4px]">
                  احجز الباقة
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. WHY US */}
        <section className="py-24 bg-dark text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-right">
              {[
                { icon: Plane, color: "text-secondary", title: "أسعار تنافسية", desc: "نضمن لك الحصول على أفضل قيمة مقابل سعر في السوق الخليجي." },
                { icon: ShieldCheck, color: "text-gold", title: "ضمان الحجز", desc: "أعلى معايير الأمان وحماية بياناتك المالية وحقوقك كمسافر." },
                { icon: Clock, color: "text-blue-400", title: "دعم 24/7", desc: "فريقنا معك في كل خطوة، من لحظة الحجز حتى عودتك بسلام." },
                { icon: Trophy, color: "text-emerald-400", title: "10 سنوات خبرة", desc: "خبرة طويلة جعلتنا رواداً في تنظيم الرحلات السياحية والدينية." },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center md:items-start group">
                  <div className={`${item.color} mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform bg-white/5 p-4 rounded-2xl`}>
                    <item.icon size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. TESTIMONIALS */}
        <section className="py-24 bg-light overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-primary">شركاء النجاح</h2>
              <p className="text-text/60 mt-2">ماذا يقول عملاؤنا عن تجربتهم مع أسفار طيبة</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl relative"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${TESTIMONIALS[activeTestimonial].color} shrink-0 shadow-lg`} />
                    <div className="flex-grow">
                      <div className="flex gap-1 mb-4">
                        {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="fill-gold text-gold" size={20} />
                        ))}
                      </div>
                      <p className="text-2xl font-medium text-primary italic mb-6 leading-relaxed">
                        "{TESTIMONIALS[activeTestimonial].content}"
                      </p>
                      <div>
                        <h4 className="text-xl font-bold text-text">{TESTIMONIALS[activeTestimonial].name}</h4>
                        <span className="text-secondary text-sm">{TESTIMONIALS[activeTestimonial].location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex justify-center gap-4 mt-10">
                <button onClick={prevTestimonial} className="bg-white p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all">
                  <ChevronRight size={24} />
                </button>
                <button onClick={nextTestimonial} className="bg-white p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all">
                  <ChevronLeft size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SPECIAL OFFER BANNERS */}
        <section className="bg-secondary py-16 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-8 animate-bounce">⚡ عرض محدود للغاية!</h2>
            <p className="text-xl mb-12 text-white/90">احجز رحلتك القادمة قبل نهاية الشهر واحصل على خصم فوري بنسبة <span className="text-primary font-black text-3xl">20%</span></p>
            
            {/* Countdown */}
            <div className="flex justify-center gap-4 md:gap-8 mb-12">
              {[
                { label: "يوم", val: timeLeft.days },
                { label: "ساعة", val: timeLeft.hours },
                { label: "دقيقة", val: timeLeft.minutes },
                { label: "ثانية", val: timeLeft.seconds },
              ].map((t, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl w-20 md:w-32 py-4 flex flex-col items-center border border-white/20">
                  <span className="text-3xl md:text-5xl font-black">{String(t.val).padStart(2, '0')}</span>
                  <span className="text-xs uppercase font-bold text-white/60">{t.label}</span>
                </div>
              ))}
            </div>
            
            <button className="bg-white text-secondary px-10 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl">
              استفد من العرض الآن
            </button>
          </div>
        </section>

        {/* 9. CONTACT US */}
        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Form */}
              <div className="bg-light rounded-[3rem] p-10 shadow-sm border border-gray-100">
                <h2 className="text-3xl font-black text-primary mb-8 underline decoration-secondary decoration-4 underline-offset-8">أرسل لنا استفسارك</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-bold text-primary">الاسم الكامل</label>
                       <input type="text" className="bg-white border text-primary border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="أحمد محمد" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-bold text-primary">رقم الجوال</label>
                       <input type="tel" className="bg-white border text-primary border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-left" dir="ltr" placeholder="+966 5x xxxxxxx" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-sm font-bold text-primary">الوجهة المفضلة</label>
                     <select className="bg-white border text-primary border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 transition-all">
                        {DESTINATIONS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                     </select>
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-sm font-bold text-primary">رسالتك</label>
                     <textarea rows={4} className="bg-white border text-primary border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/20 transition-all" placeholder="اكتب تفاصيل رحلتك هنا..."></textarea>
                  </div>
                  <button className="w-full bg-secondary text-white py-5 rounded-2xl font-black text-xl hover:bg-secondary/90 shadow-xl shadow-secondary/20 transition-all">
                    أرسل الطلب الآن
                  </button>
                </form>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl font-black text-primary mb-10 leading-tight">نحن هنا لمساعدتك في التخطيط لرحلة العمر</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-light p-4 rounded-2xl text-secondary"><Phone size={32} /></div>
                    <div>
                      <h4 className="text-lg font-bold text-primary mb-1">اتصل بنا</h4>
                      <p className="text-text/60 font-medium" dir="ltr">+966 50 000 0000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="bg-light p-4 rounded-2xl text-blue-500"><Mail size={32} /></div>
                    <div>
                      <h4 className="text-lg font-bold text-primary mb-1">البريد الإلكتروني</h4>
                      <p className="text-text/60 font-medium whitespace-nowrap">info@asfartiba.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="bg-light p-4 rounded-2xl text-emerald-500"><MapPin size={32} /></div>
                    <div>
                      <h4 className="text-lg font-bold text-primary mb-1">الموقع الرئيسي</h4>
                      <p className="text-text/60 font-medium">الرياض، حي العليا، برج القمة - المملكة العربية السعودية</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="text-xl font-bold mb-6">تابعنا على المنصات</h4>
                  <div className="flex gap-4">
                    <button className="bg-dark text-white p-4 rounded-2xl hover:bg-secondary transition-all"><Instagram size={24}/></button>
                    <button className="bg-dark text-white p-4 rounded-2xl hover:bg-secondary transition-all"><Twitter size={24}/></button>
                    <button className="bg-dark text-white p-4 rounded-2xl hover:bg-secondary transition-all"><MessageCircle size={24}/></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. FOOTER */}
      <footer className="bg-dark text-white py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-6">
               <div className="flex items-center gap-2">
                <div className="bg-secondary p-1.5 rounded-lg">
                  <Plane className="w-5 h-5 rotate-45" />
                </div>
                <span className="text-2xl font-black">أسفار طيبة</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">بوابتك الرائدة لعالم السفر والجمال. نضع خبرة سنواتنا بين يديك لنضمن لك رحلة آمنة وممتعة في أي مكان حول العالم.</p>
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-3 rtl:space-x-reverse">
                    {[1,2,3,4].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-dark bg-secondary flex items-center justify-center text-[10px] font-bold`}>{i}</div>)}
                 </div>
                 <span className="text-xs text-white/40">انضم لأكثر من 5000 مسافر</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">روابط سريعة</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="#home" className="hover:text-secondary">الرئيسية</a></li>
                <li><a href="#destinations" className="hover:text-secondary">أبرز الوجهات</a></li>
                <li><a href="#packages" className="hover:text-secondary">الباقات السياحية</a></li>
                <li><a href="#about" className="hover:text-secondary">عن الشركة</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">الدعم والمساعدة</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="#" className="hover:text-secondary">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-secondary">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-secondary">الشروط والأحكام</a></li>
                <li><a href="#" className="hover:text-secondary">سياسة الاسترجاع</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">النشرة البريدية</h4>
              <p className="text-white/50 text-xs mb-6">اشترك للحصول على أحدث العروض والخصومات الحصرية.</p>
              <div className="flex gap-2 p-1.5 bg-white/5 rounded-xl border border-white/10">
                <input type="email" placeholder="بريدك الإلكتروني" className="bg-transparent outline-none flex-grow text-sm px-2 text-white" />
                <button className="bg-secondary px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap">اشترك</button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-white/30 text-xs">
            <p>© 2025 أسفار طيبة — جميع الحقوق محفوظة للهوية والاسم.</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 left-8 z-[100] flex flex-col gap-4">
        {showScrollTop && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/40 hover:scale-110 transition-transform"
          >
            <ArrowUp size={24} />
          </button>
        )}
        <button className="bg-emerald-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform flex items-center justify-center">
          <MessageCircle size={32} />
        </button>
      </div>

      {/* STICKY CTA BAR (Mobile) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:hidden z-[90] flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
          >
            <div className="flex flex-col">
              <span className="text-xs text-text/50 font-bold">خصم الصيف</span>
              <span className="text-secondary font-black text-xl">20% أقل</span>
            </div>
            <button className="bg-secondary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
               احجز الآن 🎯
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
