"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(true);
  return (
    <div className="bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-lg font-semibold text-gray-600 mb-2 ml-3">My Dental Status</h1>

        <div className="grid grid-cols-5 gap-8">
          {/* LEFT SIDE - Dental Status (2/5) */}
          <div className="col-span-2 space-y-6">
            {/* Score Cards */}
            <div className="flex gap-6">
              {/* Total Score */}
              <div className="bg-white rounded-lg p-6 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Total Score</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-light text-gray-800">--</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* High-Risk Teeth */}
              <div className="bg-white rounded-lg p-6 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">High-Risk Teeth</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-light text-orange-500">--</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dental Chart */}
            <div className="bg-white rounded-lg p-6">
              {/* Top Teeth */}
              <div className="mb-2">
                <div className="flex justify-center">
                  <div className="relative">
                    <Image 
                      src="/images/upperTeeth.png" 
                      alt="Upper Teeth" 
                      width={300} 
                      height={80} 
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-1">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg">
                    <p className="text-xs text-gray-600 font-medium">Top</p>
                  </div>
                </div>
              </div>

              {/* Bottom Teeth */}
              <div>
                <div className="flex justify-center mt-1">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg">
                    <p className="text-xs text-gray-600 font-medium">Bottom</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <Image 
                      src="/images/bottomTeeth.png" 
                      alt="Lower Teeth" 
                      width={300} 
                      height={80} 
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg p-6 space-y-2">
              {[
                "Fillings",
                "Bridges",
                "Cavity",
                "Crown",
                "Implants",
                "Orthodontics",
              ].map((label) => (
                <div className="flex justify-between" key={label}>
                  <span className="text-gray-600">{label}</span>
                  <span className="text-gray-800 font-medium">--</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - SmileCheck Assistant (3/5) */}
          <div className="col-span-3 flex flex-col justify-end">
            {/* No bg-white here — this stays default gray */}
            <div className="rounded-lg p-8 text-center">
              {/* SmileCheck Icon */}
              <div className="w-16 h-16 bg-teal-500 rounded-full relative overflow-hidden mx-auto mb-6">
                <Image src="/icons/logo.png" alt="SmileCheck" fill className="object-cover" />
              </div>

              {/* Text */}
              <h1 className="text-3xl font-bold leading-tight bg-gradient-to-b from-[#CACACA] to-[#0B869F] bg-clip-text text-transparent">
                Hi, I'm SmileCheck
              </h1>
              <p className="mt-6 text-sm font-medium text-gray-600">
                Ready to check your teeth? Snap a photo or ask me a dental question!
              </p>

              {/* Info Box */}
              <div className="mt-8 bg-gradient-to-b from-[#0B869F] via-[#62A0AD] to-[#BBBBBB] rounded-lg p-4 text-white">
                <p className="text-sm">
                  Click the "Add Images" button in the bottom left corner to upload your new smiling teeth photo, or simply type any question you have about your dental health.
                </p>

                <div className="mt-10 flex items-center justify-between">
                  <button className="bg-[#6A6A6A] rounded-4xl text-white px-4 py-2 text-sm flex items-center gap-2">
                    <Image src="/icons/photo.png" alt="Add" width={20} height={20} />
                    Add Images
                  </button>
                  <button className="bg-[#0B869F] hover:bg-[#0a7186] text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <Image src="/icons/arrow-forward.png" alt="Forward" width={16} height={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div> 
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
    
  );
}