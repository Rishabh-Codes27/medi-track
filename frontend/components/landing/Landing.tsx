"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  CalendarCheck2,
  FilePlus,
  ShieldCheck,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <CalendarCheck2 className="w-6 h-6 text-blue-600" />,
    title: "Smart Medication Calendar",
    desc: "Visualize and manage your daily medication schedule effortlessly.",
  },
  {
    icon: <FilePlus className="w-6 h-6 text-blue-600" />,
    title: "Upload Prescriptions",
    desc: "Upload images or PDFs of your prescriptions and track medications with ease.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "Privacy First",
    desc: "All your data is secure and stored with full privacy control.",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-blue-600" />,
    title: "Mobile Optimized",
    desc: "Perfectly designed for use on the go — anytime, anywhere.",
  },
];

const Landing = () => {
  return (
    <div className="w-full min-h-screen bg-blue-50 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-blue-700 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to <span className="text-blue-500">MediTrack</span>
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-gray-700 max-w-xl mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Stay on top of your prescriptions, get daily medication reminders, and
          take control of your health — effortlessly.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link href="/medi-track">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-base rounded-full shadow-md">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-2xl font-bold text-blue-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why MediTrack?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-blue-100 rounded-xl p-5 flex gap-4 items-start shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {feature.icon}
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-700">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-blue-500 text-white">
        <motion.div
          className="flex flex-col items-center justify-center text-center max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Start tracking your meds today.
          </h2>
          <p className="text-base text-blue-100 mb-6">
            Take charge of your health with a clean, easy-to-use dashboard and
            mobile-friendly medication alerts.
          </p>

          <Link href="/medi-track">
            <Button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-full hover:bg-blue-100 flex items-center gap-2">
              Try it out
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      {/* <footer className="py-6 text-center text-xs text-gray-500">
        © 2025 MediTrack. All rights reserved.
      </footer> */}
    </div>
  );
};

export default Landing;
