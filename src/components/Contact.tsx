"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Check, Send, Calendar, Clock, Sparkles } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import Magnetic from "./ui/Magnetic";

interface ContactData {
  name: string;
  socialLinks: Array<{ platform: string; url: string; username: string }>;
}

export default function Contact({ data }: { data: ContactData }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calendar Booking States
  const [bookingDate, setBookingDate] = useState<number | null>(null);
  const [bookingTime, setBookingTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const availableDays = [18, 19, 20, 21, 22]; // Mock available days
  const timeSlots = ["10:00 AM", "02:00 PM", "04:30 PM"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!formData.subject.trim()) nextErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      nextErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1600);
  };

  const handleBooking = () => {
    if (!bookingDate || !bookingTime) return;
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setBookingDate(null);
      setBookingTime(null);
    }, 5000);
  };

  const getSocialUrl = (platform: string) => {
    const link = data.socialLinks.find((s) => s.platform === platform);
    return link ? link.url : "#";
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-6xl mx-auto relative z-10">
      {/* Title */}
      <div className="flex flex-col items-start mb-16">
        <span className="text-[10px] tracking-[0.3em] font-display text-gradient-cyan-blue uppercase mb-3">
          Connection
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Get In Touch
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Booking & Socials */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="font-display font-bold text-xl text-white mb-3">
              Let's craft something remarkable.
            </h3>
            <p className="font-sans font-light text-mutedText text-xs sm:text-sm leading-relaxed mb-6">
              Whether you want to build a SaaS startup, automate processes using AI models, or just say hello, my inbox is open.
            </p>
          </div>

          {/* Dynamic Calendar Booking Placeholder Widget */}
          <div className="p-6 rounded-3xl glass-card border border-white/5 space-y-4 shadow-premium relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-electricBlue" />
                <h4 className="font-display font-bold text-xs tracking-wider text-white uppercase">Virtual Scheduler</h4>
              </div>
              <span className="text-[9px] font-mono text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-0.5 rounded-full uppercase">Online</span>
            </div>

            <AnimatePresence mode="wait">
              {!isBooked ? (
                <motion.div key="scheduler" className="space-y-4 relative z-10">
                  <p className="text-[10px] text-mutedText leading-relaxed">
                    Select a slot from available July calendar blocks below to lock an introductory meeting call:
                  </p>
                  
                  {/* July Dates Row */}
                  <div className="flex items-center justify-between gap-1.5 pt-2">
                    {[17, 18, 19, 20, 21, 22, 23].map((day) => {
                      const isAvailable = availableDays.includes(day);
                      const isSelected = bookingDate === day;
                      return (
                        <button
                          key={day}
                          disabled={!isAvailable}
                          onClick={() => setBookingDate(day)}
                          className={`w-9 h-9 rounded-xl text-xs font-display flex flex-col items-center justify-center border transition-all ${
                            !isAvailable
                              ? "opacity-35 cursor-not-allowed border-transparent text-mutedText"
                              : isSelected
                              ? "bg-white text-[#09090B] border-white font-semibold shadow-glowBlue"
                              : "bg-white/5 border-white/5 hover:border-white/10 text-white"
                          }`}
                        >
                          <span className="text-[8px] uppercase text-mutedText block">Jul</span>
                          <span>{day}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Time slots (if date selected) */}
                  {bookingDate && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 pt-2">
                      <div className="flex items-center gap-1.5 text-[9px] text-mutedText font-mono uppercase">
                        <Clock className="w-3 h-3" />
                        <span>Select Call Time:</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => {
                          const isSelected = bookingTime === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setBookingTime(slot)}
                              className={`py-2 rounded-xl text-[10px] font-display border tracking-wider text-center transition-all ${
                                isSelected
                                  ? "bg-white text-[#09090B] border-white font-semibold"
                                  : "bg-white/5 border-white/5 hover:border-white/10 text-white"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Lock button */}
                  <button
                    onClick={handleBooking}
                    disabled={!bookingDate || !bookingTime}
                    className="w-full py-3 mt-2 rounded-xl bg-electricBlue hover:bg-electricBlue/95 disabled:opacity-50 text-white text-xs font-display font-semibold uppercase tracking-wider transition-all shadow-glowBlue flex items-center justify-center gap-2"
                  >
                    <span>Request Booking</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="booked"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center flex flex-col items-center justify-center relative z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-success/10 border border-success/20 flex items-center justify-center text-success mb-4 shadow-glowPurple">
                    <Check className="w-5 h-5" />
                  </div>
                  <h5 className="font-display font-bold text-sm text-white mb-1">Appointment Locked</h5>
                  <p className="text-[10px] text-mutedText max-w-[240px] leading-relaxed">
                    Meeting registered for July {bookingDate} at {bookingTime}. A Calendar invite has been queued.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Email / Location Contact Details */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-electricBlue/10 flex items-center justify-center text-electricBlue border border-electricBlue/5 shadow-glowBlue">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-sans text-mutedText block uppercase tracking-wider">Email</span>
                <a href="mailto:harshit@dev.com" className="text-xs sm:text-sm font-display text-white hover:underline">
                  harshit@dev.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-royalPurple/10 flex items-center justify-center text-royalPurple border border-royalPurple/5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-sans text-mutedText block uppercase tracking-wider">Location</span>
                <span className="text-xs sm:text-sm font-display text-white">India // Remote</span>
              </div>
            </div>
          </div>

          {/* Socials horizontal row */}
          <div className="flex items-center gap-3 mt-4">
            <Magnetic range={30} strength={0.3}>
              <a
                href={getSocialUrl("GitHub")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 flex items-center justify-center text-mutedText hover:text-white transition-colors shadow-sm"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
            </Magnetic>
            <Magnetic range={30} strength={0.3}>
              <a
                href={getSocialUrl("LinkedIn")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 flex items-center justify-center text-mutedText hover:text-white transition-colors shadow-sm"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7 relative min-h-[460px] rounded-3xl glass-card border border-white/5 p-8 flex flex-col justify-between shadow-premium">
          <div className="absolute inset-0 bg-gradient-to-br from-royalPurple/5 to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/5 focus:border-electricBlue rounded-2xl text-xs sm:text-sm text-white placeholder-transparent focus:outline-none transition-colors duration-300"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-4 pointer-events-none transition-all duration-300 font-display uppercase tracking-widest text-[9px] ${
                        focusedField === "name" || formData.name
                          ? "-top-2.5 bg-[#111827] px-2 text-electricBlue"
                          : "top-4 text-mutedText"
                      }`}
                    >
                      Your Name
                    </label>
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-2 font-sans">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/5 focus:border-electricBlue rounded-2xl text-xs sm:text-sm text-white placeholder-transparent focus:outline-none transition-colors duration-300"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-4 pointer-events-none transition-all duration-300 font-display uppercase tracking-widest text-[9px] ${
                        focusedField === "email" || formData.email
                          ? "-top-2.5 bg-[#111827] px-2 text-electricBlue"
                          : "top-4 text-mutedText"
                      }`}
                    >
                      Email Address
                    </label>
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-2 font-sans">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/5 focus:border-electricBlue rounded-2xl text-xs sm:text-sm text-white placeholder-transparent focus:outline-none transition-colors duration-300"
                    placeholder="Subject"
                  />
                  <label
                    htmlFor="subject"
                    className={`absolute left-4 pointer-events-none transition-all duration-300 font-display uppercase tracking-widest text-[9px] ${
                      focusedField === "subject" || formData.subject
                        ? "-top-2.5 bg-[#111827] px-2 text-electricBlue"
                        : "top-4 text-mutedText"
                    }`}
                  >
                    Subject
                  </label>
                  {errors.subject && <p className="text-red-500 text-[10px] mt-1 ml-2 font-sans">{errors.subject}</p>}
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/5 focus:border-electricBlue rounded-2xl text-xs sm:text-sm text-white placeholder-transparent focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Message"
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-4 pointer-events-none transition-all duration-300 font-display uppercase tracking-widest text-[9px] ${
                      focusedField === "message" || formData.message
                        ? "-top-2.5 bg-[#111827] px-2 text-electricBlue"
                        : "top-4 text-mutedText"
                    }`}
                  >
                    Message
                  </label>
                  {errors.message && <p className="text-red-500 text-[10px] mt-1 ml-2 font-sans">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-white text-[#09090B] font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-glowBlue transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10"
              >
                <div className="w-16 h-16 rounded-full bg-electricBlue/10 flex items-center justify-center text-electricBlue mb-6 shadow-glowBlue border border-electricBlue/20">
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M20 6L9 17L4 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </motion.svg>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Transmission Received</h3>
                <p className="font-sans font-light text-mutedText text-xs sm:text-sm leading-relaxed max-w-sm">
                  Thank you for reaching out. Your packet has been stored, and I will establish communication shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
