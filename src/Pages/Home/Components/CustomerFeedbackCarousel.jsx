import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const feedbacks = [
  {
    name: "Rahim Uddin",
    role: "Factory Manager",
    message:
      "This system completely changed how we track orders. Production updates are clear and accurate.",
  },
  {
    name: "Ayesha Khan",
    role: "Buyer",
    message:
      "Booking products and tracking orders is super easy. I can see every step without calling anyone.",
  },
  {
    name: "Mahmud Hasan",
    role: "Operations Head",
    message:
      "The role-based dashboard and approval system saved us hours every day. Highly recommended.",
  },
];

function CustomerFeedbackCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + feedbacks.length) % feedbacks.length);
  const next = () => setIndex((index + 1) % feedbacks.length);

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What Our <span className="underline underline-offset-10  decoration-purple-600">Customers Say</span>
        </h2>
        <p className="max-w-xl mx-auto">
          Trusted by garment factories, managers, and buyers worldwide.
        </p>
      </div>

      <div className="relative">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          

          <h3 className="font-semibold text-lg text-black">{feedbacks[index].name}</h3>
          <p className="text-sm text-black">{feedbacks[index].role}</p>

          <div className="flex justify-center my-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          <p className="text-black mb-6 italic">
            “{feedbacks[index].message}”
          </p>

        </motion.div>

        <button onClick={prev} className="absolute top-1/2 -left-4 md:-left-0 -translate-y-1/2 bg-purple-600 shadow p-2 rounded-full hover:bg-purple-600 hover:text-white transition">
          <ChevronLeft />
        </button>
        <button onClick={next} className="absolute top-1/2 -right-4 md:-right-0 -translate-y-1/2 bg-purple-600 shadow p-2 rounded-full hover:bg-purple-600 hover:text-white transition">
          <ChevronRight />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {feedbacks.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === index ? "bg-purple-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}


export default CustomerFeedbackCarousel;