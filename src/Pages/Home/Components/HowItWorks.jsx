import { motion } from "framer-motion";
import { ShoppingBag, ClipboardList, CheckCircle, Scissors, MapPin, Truck } from "lucide-react";

const steps = [
    {
        title: "Browse Products",
        desc: "Explore garment products with pricing, MOQ, and payment options.",
        icon: ShoppingBag,
    },
    {
        title: "Place an Order",
        desc: "Submit order quantity, delivery details, and special instructions.",
        icon: ClipboardList,
    },
    {
        title: "Manager Approval",
        desc: "Managers review and approve orders before production starts.",
        icon: CheckCircle,
    },
    {
        title: "Production Stages",
        desc: "Orders move through cutting, sewing, and finishing stages.",
        icon: Scissors,
    },
    {
        title: "Track Progress",
        desc: "Track real-time order status with timeline-based updates.",
        icon: MapPin,
    },
    {
        title: "Delivery",
        desc: "Finished garments are packed and delivered on time.",
        icon: Truck,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-16 mt-10">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 underline underline-offset-10 decoration-purple-600">How It Works</h2>
                    <p className="max-w-2xl mx-auto">A simple step-by-step process to manage garment orders and production efficiently.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="card bg-white shadow-md hover:shadow-lg transition"
                            >
                                <div className="card-body items-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-purple-600/10 flex items-center justify-center mb-4">
                                        <Icon className="w-7 h-7 text-purple-600" />
                                    </div>
                                    <h3 className="card-title text-lg font-semibold text-black">{step.title}</h3>
                                    <p className="text-sm text-base-content/70">{step.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
