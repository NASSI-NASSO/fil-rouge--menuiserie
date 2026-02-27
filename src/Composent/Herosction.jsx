import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
    {
        image: "/hero_alu.png",
        title: "Innovations en Aluminium",
        subtitle: "L'excellence du sur-mesure pour vos fenêtres et façades modernes.",
        link: "/produits",
        btnText: "Voir nos fenêtres"
    },
    {
        image: "/hero_door.png",
        title: "Design & Sécurité",
        subtitle: "Des portes d'exception alliant robustesse et esthétisme épuré.",
        link: "/produits",
        btnText: "Découvrir la gamme"
    },
    {
        image: "/hero_gate.png",
        title: "L'Art de la Ferronnerie",
        subtitle: "L'élégance intemporelle du fer forgé pour vos projets les plus ambitieux.",
        link: "/produits",
        btnText: "Explorer le sur-mesure"
    }
];

export function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-slate-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
                <motion.div
                    key={`content-${current}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-brand-teal font-bold tracking-[0.3em] uppercase mb-4 block"
                    >
                        Flach Metal
                    </motion.span>

                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight">
                        {slides[current].title}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
                        {slides[current].subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to={slides[current].link}
                            className="bg-brand-teal hover:bg-brand-teal-dark text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-brand-teal/20"
                        >
                            {slides[current].btnText}
                        </Link>
                        <Link
                            to="/devis"
                            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold transition-all"
                        >
                            Demander un devis
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-10 right-10 z-20 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="p-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Progress indicators */}
            <div className="absolute bottom-12 left-6 z-20 flex gap-2">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? "w-12 bg-brand-teal" : "w-4 bg-white/30"}`}
                    />
                ))}
            </div>
        </section>
    );
}

export function HeroSimple({ title, subtitle }) {
    return (
        <section className="relative py-32 px-6 bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 opacity-40">
                <img
                    src="/hero_alu_window_1769728710942.png"
                    alt="background"
                    className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                )}

                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <Link to="/" className="hover:text-brand-teal">Accueil</Link>
                    <span>/</span>
                    <span className="text-brand-teal">{title}</span>
                </div>
            </div>
        </section>
    );
}
