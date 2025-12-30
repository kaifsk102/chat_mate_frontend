
import ChatMateLogo from "../ChatMateLogo/ChatMateLogo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0f14] to-[#1a1b22] text-white">
      
      {/* NAVBAR */}
      <header className="flex items-center justify-between px-10 py-2">
        <h1 className="text-xl font-bold">
          <ChatMateLogo/>
        </h1>

        <div className="flex gap-3 text-black ">
            <a href="/login"           
          className="bg-white hover:bg-gray-300  px-4 py-2  border-3 border-white/20 rounded-full  font-semibold"
          >Log in</a>

        <a
          href="/register"
          className="bg-white hover:bg-gray-300  px-4 py-2  border-3 border-white/20 rounded-full  font-semibold"
        >
          Register
        </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative justify-between flex flex-col md:flex-row items-center px-10 mx-20 md:px-20 py-20 ">
        
        {/* LEFT */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Have your best chat
          </h2>

          <p className="text-gray-400 mb-8 italic">
            Real-Time Chat, Simplified. Unlimited messaging.<br/> Zero lag. Start connecting in seconds.
          </p>

          <div className="flex font-bold text-black gap-4">
            <a
              href="/register"
              className="bg-white border-white/20 hover:bg-gray-300 px-6 py-3 border-2 rounded-full "
            >
              Register
            </a>

            <a
              href="/login"
              className=" bg-white hover:bg-gray-300 border-2 border-white/20 px-6 py-3 rounded-full"
            >
              Login
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative w-full max-w-md h-130">
          
          {/* Dotted decoration */}
          <div className="absolute top-6 left-6 grid grid-cols-6 gap-1">
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 bg-emerald-400 rounded-full opacity-70"
              />
            ))}
          </div>

          {/* IMAGE 1 */}
          <div className="absolute top-10 right-0 w-68 h-84 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* IMAGE 2 */}
          <div className="absolute bottom-0 left-10 w-72 h-84 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CHAT BUBBLE */}
          <div className="absolute top-24 left-0 bg-emerald-500 text-black px-6 py-3 rounded-full text-md shadow">
            Hey man! How is the report?
          </div>

          <div className="absolute bottom-24 right-6 bg-emerald-500 text-black px-6 py-3 rounded-full text-md shadow">
            Got it bro!
          </div>
        </div>
      </section>
    </div>
  );
}
