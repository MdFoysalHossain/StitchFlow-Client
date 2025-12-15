import { motion } from "framer-motion";
import { Package, FileText, Users, UserCog, Truck } from "lucide-react";

// Demo stats (replace with API data later)
const stats = [
  {
    label: "Total Products",
    value: 120,
    icon: Package,
  },
  {
    label: "Total Orders",
    value: 845,
    icon: FileText,
  },
  {
    label: "Active Buyers",
    value: 312,
    icon: Users,
  },
  {
    label: "Active Managers",
    value: 28,
    icon: UserCog,
  },
  {
    label: "Delivered This Month",
    value: 96,
    icon: Truck,
  },
];

export default function SystemStatsPreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            System <span className="underline underline-offset-10 decoration-purple-600">at a Glance</span>
          </h2>
          <p className=" max-w-2xl mx-auto">
            Real-time insights that help factories, managers, and buyers stay informed
            and make smarter decisions.
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="w-10 h-10 text-purple-600" />
              </div>

              <motion.h3
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="text-3xl text-black font-bold mb-1"
              >
                {stat.value}+
              </motion.h3>

              <p className="text-sm text-black">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
