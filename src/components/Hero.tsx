// 📁 src/components/Hero.tsx
export default function Hero() {
    return (
      <section className="h-screen w-full relative flex flex-col justify-center items-center text-center px-6 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
        >
          <source src="https://res.cloudinary.com/dko5sommz/video/upload/v1744417105/assistant_IT_hwlbqq.mp4" type="video/mp4" />
        </video>
        <h1 className="text-white text-5xl md:text-6xl font-bold drop-shadow-md">
          Vision. Action. Révolution.
        </h1>
        <p className="mt-4 text-white/90 max-w-xl text-lg md:text-xl">
          NovaCore propulse votre croissance digitale grâce à l’IA autonome.
        </p>
        <a href="#modules" className="mt-8 bg-white text-black px-6 py-3 rounded shadow hover:bg-gray-200">
          Explorer les modules
        </a>
      </section>
    )
  }