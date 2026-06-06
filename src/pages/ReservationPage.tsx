import React, { useState } from "react";
import { Calendar, Users, Home, Clock, Heart, Award, CheckCircle2, PhoneCall, Printer } from "lucide-react";
import { Reservation } from "../types";
import { motion } from "motion/react";
import DatePicker from "../components/DatePicker";
import CinematicWordReveal from "../components/CinematicWordReveal";

interface ReservationPageProps {
  onAddReservation: (res: Omit<Reservation, "id" | "status" | "createdAt">) => void;
}

export default function ReservationPage({ onAddReservation }: ReservationPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "19:30",
    guests: 2,
    roomType: "standard" as "standard" | "imperial_private" | "garden_zen",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Suggested traditional high-heat or custom times
  const timeOptions = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert("Please fulfill all the required fields of the clan registry.");
      return;
    }

    onAddReservation(formData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "19:30",
      guests: 2,
      roomType: "standard",
      notes: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div id="reservationpage-container" className="pt-24 min-h-screen px-6 md:px-12 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 mt-8">
          <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase block mb-2">
            IMPERIAL REGISTRY
          </span>
          <h2 className="font-display text-3xl font-bold tracking-widest text-white md:text-4xl">
            Book Private Chambers
          </h2>
          <div className="mx-auto mt-3 max-w-md font-sans text-xs text-gray-400">
            <CinematicWordReveal
              text="Ensure secure seating arrangements in our authentic Japanese layout spaces."
              delay={0.1}
              wordDuration={0.8}
            />
          </div>
        </div>

        <div className="mx-auto max-w-4xl rounded-lg border border-white/5 bg-charcoal/30 overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-5">
            
            {/* Left Aesthetic Intro Column */}
            <div className="p-8 md:p-10 md:col-span-2 bg-gradient-to-br from-crimson/35 via-charcoal to-black border-r border-white/5 flex flex-col justify-between">
              <div className="space-y-6 text-left">
                <span className="font-display text-sm font-bold tracking-widest text-gold text-white block uppercase">
                  Chamber Themes
                </span>

                <div className="space-y-4">
                  <div
                    onClick={() => setFormData({ ...formData, roomType: "standard" })}
                    className={`p-3 rounded-md cursor-pointer transition-all ${
                      formData.roomType === "standard"
                        ? "bg-gold/15 border border-gold"
                        : "border border-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="block font-display text-xs font-bold text-white">STANDARD DINING</span>
                    <span className="block text-[10px] text-gray-400 mt-1">
                      Elegant tatami seating booths with low lighting and deep privacy filters.
                    </span>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, roomType: "imperial_private" })}
                    className={`p-3 rounded-md cursor-pointer transition-all ${
                      formData.roomType === "imperial_private"
                        ? "bg-gold/15 border border-gold"
                        : "border border-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="block font-display text-xs font-bold text-gold">IMPERIAL PRIVATE (Shoji)</span>
                    <span className="block text-[10px] text-gray-400 mt-1">
                      A premium sliding doors room with customized private service, calligraphy scrolls, and dedicated hosts.
                    </span>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, roomType: "garden_zen" })}
                    className={`p-3 rounded-md cursor-pointer transition-all ${
                      formData.roomType === "garden_zen"
                        ? "bg-gold/15 border border-gold"
                        : "border border-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="block font-display text-xs font-bold text-crimson-light">GARDEN ZEN PAVILION</span>
                    <span className="block text-[10px] text-gray-400 mt-1">
                      A glorious pavilion built alongside indoor water streams, weeping bonsai trees, and real koi fish.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 text-left space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gold">
                  <Award className="h-4 w-4" />
                  <span className="font-display tracking-widest font-bold">100% SECURE</span>
                </div>
                <p className="font-sans text-[10px] text-gray-500 leading-relaxed">
                  No credit card holds. We preserve reserved seating for up to 20 minutes from booking target time.
                </p>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="p-8 md:p-10 md:col-span-3 text-left">
              {!isSubmitted ? (
                <form id="reservation-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block font-display text-xs tracking-wider text-gray-300">
                        CUSTOMER NAME *
                      </label>
                      <input
                        id="reservation-name"
                        type="text"
                        required
                        placeholder="Miyamoto Musashi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-sm border border-white/10 bg-black/40 p-3 font-sans text-xs text-white placeholder-gray-500 transition-all focus:border-gold/40 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-display text-xs tracking-wider text-gray-300">
                        PHONE NUMBER *
                      </label>
                      <input
                        id="reservation-phone"
                        type="tel"
                        required
                        placeholder="+212 600-000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-sm border border-white/10 bg-black/40 p-3 font-sans text-xs text-white placeholder-gray-500 transition-all focus:border-gold/40 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-display text-xs tracking-wider text-gray-300">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="reservation-email"
                      type="email"
                      required
                      placeholder="musashi@samurai.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-black/40 p-3 font-sans text-xs text-white placeholder-gray-500 transition-all focus:border-gold/40 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="space-y-2">
                      <label className="block font-display text-xs tracking-wider text-gray-300">
                        TARGET DATE *
                      </label>
                      <DatePicker
                        value={formData.date}
                        minDate={new Date().toISOString().split("T")[0]}
                        onChange={(selectedDate) => setFormData({ ...formData, date: selectedDate })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-display text-xs tracking-wider text-gray-300">
                        TIME BLOCK *
                      </label>
                      <select
                        id="reservation-time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full rounded-sm border border-white/10 bg-black p-3 font-sans text-xs text-white placeholder-gray-500 transition-all focus:border-gold/40 focus:outline-hidden"
                      >
                        {timeOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-charcoal text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-display text-xs tracking-wider text-gray-300">
                        GUESTS SIZE *
                      </label>
                      <select
                        id="reservation-guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full rounded-sm border border-white/10 bg-black p-3 font-sans text-xs text-white placeholder-gray-500 transition-all focus:border-gold/40 focus:outline-hidden"
                      >
                        {[...Array(20)].map((_, idx) => (
                          <option key={idx + 1} value={idx + 1} className="bg-charcoal text-white">
                            {idx + 1} {idx === 0 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-display text-xs tracking-wider text-gray-300">
                      HONORABLE COOKING NOTES / SPECIAL CLAIMS
                    </label>
                    <textarea
                      id="reservation-notes"
                      rows={3}
                      placeholder="Nut allergy, celebrations (birthday / milestone anniversary), sake selection preferences..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-black/40 p-3 font-sans text-xs text-white placeholder-gray-500 transition-all focus:border-gold/40 focus:outline-hidden"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      id="reservation-submit-btn"
                      type="submit"
                      className="w-full cursor-pointer justify-center rounded-sm bg-crimson hover:bg-crimson-light py-4 text-center font-display text-xs tracking-widest text-white font-bold transition-all shadow-lg"
                    >
                      ENGRAVE RESERVATION RECORD
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col justify-center items-center py-6 text-center space-y-6 print-ticket-outer"
                >
                  <div className="flex flex-col items-center space-y-2 no-print">
                    <CheckCircle2 className="h-12 w-12 text-green-500 animate-pulse animate-duration-1000" />
                    <h3 className="font-display text-2xl font-bold tracking-wider text-white">
                      Seal of Seating Complete
                    </h3>
                    <p className="font-sans text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Your high-seat is secured. We have engraved your reservation directly inside the clan registers.
                    </p>
                  </div>

                  {/* SAMURAI IMPERIAL CHAMBER PASS TICKET */}
                  <div className="samurai-printable-ticket relative w-full max-w-sm rounded-lg border-2 border-dashed border-gold/40 bg-black/60 p-6 md:p-8 text-left shadow-2xl overflow-hidden">
                    {/* Atmospheric Watermark Logo */}
                    <div className="absolute right-4 top-4 opacity-15 select-none pointer-events-none text-right font-display text-[70px] leading-none font-bold text-gold">
                      侍
                    </div>

                    <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                      <div>
                        <span className="font-mono text-[9px] text-gold tracking-[0.2em] font-bold block uppercase">
                          OFFICIAL CHAMBER PASS
                        </span>
                        <h4 className="font-display text-sm font-bold text-white tracking-widest mt-0.5">
                          SAMURAI CUISINE
                        </h4>
                      </div>
                      <div className="samurai-badge-red border border-crimson py-0.5 px-2 rounded-sm text-center">
                        <span className="font-display text-[9px] text-crimson-light font-bold block uppercase leading-none tracking-wider">
                          RESERVED
                        </span>
                        <span className="font-mono text-[8px] text-gray-400 block uppercase leading-none mt-1">
                          侍 の 席
                        </span>
                      </div>
                    </div>

                    {/* Ticket fields grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs border-b border-white/5 pb-4 mb-4">
                      <div>
                        <span className="font-mono text-[8px] text-gray-500 uppercase block tracking-wider">
                          HONORABLE HOLDER
                        </span>
                        <strong className="text-white font-sans text-xs line-clamp-1 block mt-0.5">
                          {formData.name.toUpperCase()}
                        </strong>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-gray-500 uppercase block tracking-wider">
                          CHAMBER STATION
                        </span>
                        <strong className="text-gold font-display text-xs tracking-wider block mt-0.5">
                          {formData.roomType === "standard" && "STANDARD BOOTH"}
                          {formData.roomType === "imperial_private" && "IMPERIAL SHOJI"}
                          {formData.roomType === "garden_zen" && "GARDEN ZEN PAVILION"}
                        </strong>
                      </div>

                      <div>
                        <span className="font-mono text-[8px] text-gray-500 uppercase block tracking-wider">
                          SEATED FOR/DATE
                        </span>
                        <strong className="text-white font-sans text-xs block mt-0.5">
                          {formData.date}
                        </strong>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-gray-500 uppercase block tracking-wider">
                          TIME WINDOW
                        </span>
                        <strong className="text-white font-sans text-xs block mt-0.5">
                          {formData.time} BLOCK
                        </strong>
                      </div>

                      <div>
                        <span className="font-mono text-[8px] text-gray-500 uppercase block tracking-wider">
                          PARTY SIZE
                        </span>
                        <strong className="text-white font-sans text-xs block mt-0.5">
                          {formData.guests} GUESTS
                        </strong>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-gray-500 uppercase block tracking-wider">
                          PASSPORT ID
                        </span>
                        <strong className="text-gold font-mono text-[10px] block mt-0.5">
                          #SMR-{Math.abs(formData.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0))}-{formData.time.replace(":", "")}
                        </strong>
                      </div>
                    </div>

                    {/* Claims notes */}
                    {formData.notes && (
                      <div className="text-[10px] border-b border-white/5 pb-4 mb-4">
                        <span className="font-mono text-[8px] text-gray-400 uppercase block tracking-wider">
                          SPECIAL CLAIMS
                        </span>
                        <p className="text-gray-300 italic font-sans leading-relaxed mt-1">
                          "{formData.notes}"
                        </p>
                      </div>
                    )}

                    {/* Bottom Barcode Decorative Element */}
                    <div className="flex flex-col justify-center items-center pt-1 text-center space-y-1">
                      <div className="font-mono text-[15px] leading-none tracking-[0.25em] text-gray-400 select-none pb-1">
                        ||||||||||||||||||||||||||||||||
                      </div>
                      <span className="font-mono text-[8px] text-gray-500 tracking-[0.2em] uppercase">
                        * ENSURE TICKET PRESENTED AT RECEPTION *
                      </span>
                    </div>
                  </div>

                  {/* Print and secondary actionable triggers */}
                  <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full justify-center items-center no-print">
                    <button
                      id="print-ticket-trigger"
                      onClick={() => window.print()}
                      className="cursor-pointer inline-flex items-center justify-center space-x-2 rounded-sm bg-gold text-black font-display text-xs font-bold tracking-widest px-8 py-3 w-full sm:w-auto hover:bg-gold-dark transition-all shadow-lg text-center"
                    >
                      <Printer className="h-4 w-4" />
                      <span>PRINT CHAMBER PASS</span>
                    </button>
                    
                    <button
                      id="reset-reservation-btn"
                      onClick={handleReset}
                      className="cursor-pointer rounded-sm border border-white/20 px-6 py-3 font-display text-[10px] tracking-widest text-gray-300 hover:text-white hover:bg-white/5 w-full sm:w-auto transition-all text-center"
                    >
                      BOOK ANOTHER
                    </button>
                  </div>

                  <p className="font-mono text-[8px] text-gray-500 uppercase max-w-xs mx-auto no-print">
                    💡 PRO TIP: SELECT "SAVE AS PDF" OR PRINT TO DEDICATED HARDPAPER. TURN ON "BACKGROUND GRAPHICS" FOR SPECTACULAR EMBELLISHMENTS.
                  </p>
                </motion.div>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
