"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Camille",
    age: 33,
    quote:
      "The dashboard helped me understand which teeth needed attention. Now I actually feel in control of my dental health — like managing a portfolio.",
  },
  {
    name: "Chloé",
    age: 34,
    quote:
      "I was surprised how accurate the AI diagnosis was. The clear aligners fit perfectly, and tracking progress on the app is super easy.",
  },
  {
    name: "Mathieu",
    age: 41,
    quote:
      "Whenever I have a concern, I just ask the AI dentist. It’s fast, reassuring, and incredibly convenient — no more guessing or waiting for appointments.",
  },
  {
    name: "Élise",
    age: 29,
    quote:
      "I used to be self-conscious about my teeth. Now I smile without hesitation, knowing I have a personalized aligner plan and visible progress right on my phone.",
  },
];

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/background.png"
          alt="Background"
          fill
          quality={100}
          priority
          className="object-cover -z-10"
        />

        {/* Stars and Lines */}
        <div className="absolute inset-0 bottom-0">
          <Image
            src="/images/stars.png"
            alt="Stars"
            fill
            className="object-contain object-bottom opacity-70"
          />
        </div>
        <div className="absolute inset-0 bottom-0">
          <Image
            src="/images/lines.png"
            alt="Lines"
            fill
            className="object-contain object-bottom opacity-70"
          />
        </div>

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 gap-12 z-10 py-40 lg:py-0">
          {/* Text */}
          <div className="max-w-xl text-white text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-[#393939] via-[#235F6B] to-[#0B869F] bg-clip-text text-transparent">
              Your Smile,
              <br />
              Your Investment.
            </h1>
            <p className="mt-6 text-sm sm:text-base md:text-base lg:text-lg text-gray-600">
              AI-driven dental assessment, 3D simulation, and aligner planning —
              all in one seamless experience.
            </p>

            {/* Info Box */}
            <div className="mt-8 bg-gradient-to-b from-[#0B869F] via-[#62A0AD] to-[#BBBBBB] backdrop-blur-sm rounded-lg p-4 text-white">
              <p className="text-sm">
                Click the "Add Images" button in the bottom left corner to
                upload your new smiling teeth photo, or simply type any question
                you have about your dental health.
              </p>
              <div className="mt-10 flex items-center justify-between">
                <button className="bg-[#6A6A6A] rounded-4xl text-white px-4 py-2 text-sm flex items-center gap-2">
                  <span>
                    <Image
                      src="/icons/photo.png"
                      alt="image"
                      width={20}
                      height={20}
                    />
                  </span>{" "}
                  Add Images
                </button>
                <button className="bg-[#0B869F] hover:bg-[#0a7186] text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-300">
                  <span>
                    <Image
                      src="/icons/arrow-forward.png"
                      alt="image"
                      width={16}
                      height={16}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-[300px] sm:w-[400px] md:w-[480px] lg:w-[580px] h-[300px] sm:h-[400px] md:h-[480px] lg:h-[580px] pt-[60px] md:pt-[80px] lg:pt-[100px]">
            <Image
              src="/images/tooth.png"
              alt="Tooth with Magnifier"
              fill
              className="object-contain"
            />
          </div>
        </section>
      </main>

      {/* What Is SmileCheck Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden bg-white text-black">
        <div className="w-full max-w-[1440px] mx-auto box-border px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text Column */}
          <div className="max-w-xl text-center lg:text-left">
            <p className="uppercase text-sm sm:text-base font-semibold text-[#0B869F] mb-2 flex items-center justify-center lg:justify-start gap-2 tracking-widest">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 8v4l3 2" />
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
              </svg>
              24 Hours Available
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-4 leading-tight">
              What Is SmileCheck?
            </h2>

            <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-6">
              SmileCheck helps you manage your 28 teeth like in assets. Track,
              diagnose, and treat — all in one place.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-black font-medium mb-6">
              {[
                "AI Dental Scoring",
                "Personalized Diagnostics",
                "Aligner Tracking",
                "Smile Investment Dashboard",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 justify-center lg:justify-start"
                >
                  <Image
                    src="/icons/tick.png"
                    alt="Tick"
                    width={24}
                    height={24}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex justify-center lg:justify-start">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 text-sm">
                Learn More <span>➔</span>
              </button>
            </div>
          </div>

          {/* Right Image with Floating Labels */}
          <div className="relative w-[300px] sm:w-[400px] md:w-[480px] lg:w-[580px] h-auto">
            <Image
              src="/images/girl.png"
              alt="SmileCheck Overview"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />

            {/* Floating Labels */}
            {/* Floating Labels */}
            <div className="absolute top-12 left-4 sm:left-8 md:left-10 bg-[#0B869F] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm md:text-sm lg:text-base font-medium shadow-md">
              AI Dentist Chat 💬
            </div>

            <div className="absolute top-36 left-4 sm:left-8 md:left-10 bg-[#0B869F] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm md:text-sm lg:text-base font-medium shadow-md">
              Health Alerts 🔔
            </div>

            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-[#0B869F] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm md:text-sm lg:text-base font-medium shadow-md">
              Treatment Records 📄
            </div>

            <div className="absolute bottom-20 left-8 sm:left-12 md:left-16 bg-[#0B869F] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm md:text-sm lg:text-base font-medium shadow-md">
              Analysis and Tracking 🛠️
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="relative text-white bg-white py-20">
        <Image
          src="/images/background.png"
          alt="Gradient Background"
          fill
          className="object-coverobject-center z-0"
        />
        <div className="absolute inset-0 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-widest text-sm text-[#0B869F] font-semibold mb-2">
            Core Features
          </p>
          <h2 className="text-4xl font-bold mb-4">Smart. Simple. SmileCare.</h2>
          <p className="text-lg text-gray-100 mb-10 max-w-2xl mx-auto">
            Discover how SmileCheck transforms your dental journey into a
            digital experience.
          </p>

          <div className="bg-gray-900/90 rounded-lg p-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div>
              <Image
                src="/icons/icon.png"
                width={32}
                height={32}
                alt="icon"
                className="block mx-auto pb-6"
              />
              <h3 className="font-semibold mb-2">Upload Your Smile</h3>
              <p className="text-sm text-gray-300">
                Easily snap or upload a front-facing photo of your teeth using
                your phone. Our AI-powered dental engine analyzes your smile
                within seconds, detecting potential issues such as cavities,
                crowding, gum concerns, and more — all without leaving your
                home.
              </p>
            </div>
            <div>
              <Image
                src="/icons/icon (1).png"
                width={32}
                height={32}
                alt="icon"
                className="block mx-auto pb-6"
              />
              <h3 className="font-semibold mb-2">Dashboard Insights</h3>
              <p className="text-sm text-gray-300">
                Access a smart, intuitive dashboard that lets you view all 28
                teeth like managing assets in a health bank. Get detailed scores
                for each tooth, view your treatment history, past procedures,
                and monitor real-time dental health trends and risk assessments.
              </p>
            </div>
            <div>
              <Image
                src="/icons/icon (2).png"
                width={32}
                height={32}
                alt="icon"
                className="block mx-auto pb-6"
              />
              <h3 className="font-semibold mb-2">3D Simulation & Maintain</h3>
              <p className="text-sm text-gray-300">
                Unlock a personalized orthodontic journey with our 3D teeth
                alignment simulation. Receive a fully customized clear aligner
                treatment plan, place orders directly in-app, and track your
                alignment progress step by step.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <button className="text-white px-5 py-2 rounded-full border font-medium">
              Contact Us
            </button>
            <button className="text-white hover:underline flex items-center gap-1">
              View All <span className="px-2">›</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20 text-center">
        <h2 className="text-4xl font-bold text-black mb-2">
          What Our Users Are Smiling About
        </h2>
        <p className="text-gray-600 mb-10">
          See how SmileCheck is transforming dental care for people just like
          you.
        </p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Floating Light Blue Background */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-[50%] bg-[#D8F3FB] border border-[#9FD9E8] rounded-2xl z-0" />

              {/* Testimonial Card */}
              <div className="relative z-10 bg-[#15141D] text-left text-white p-5 rounded-2xl shadow-md flex flex-col justify-between">
                {/* Top Info */}
                <div className="flex items-center gap-3 mb-4">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-full "
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-xl font-bold">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-300">{item.age}</p>
                  </div>
                  <div className="ml-auto">
                    <Image
                      src="/icons/quote.png"
                      alt="Quote"
                      width={36}
                      height={36}
                      className="opacity-40"
                    />
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-gray-300">{item.quote}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <button className="w-8 h-8 bg-black text-white rounded">‹</button>
          <button className="w-8 h-8 bg-black text-white rounded">›</button>
        </div>
      </section>
    </>
  );
}
