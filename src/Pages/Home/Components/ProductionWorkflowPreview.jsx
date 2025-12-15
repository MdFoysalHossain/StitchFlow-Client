import { motion } from "framer-motion";
import { CheckCircle, Package, Scissors, Truck, ClipboardList, Shirt } from "lucide-react";

const steps = [
  {
    title: "Order Placed",
    desc: "Buyer selects product & quantity",
    icon: ClipboardList,
    status: "Pending",
  },
  {
    title: "Cutting Completed",
    desc: "Manager updates production stage",
    icon: Scissors,
    status: "Approved",
  },
  {
    title: "Sewing in Progress",
    desc: "Garments are being stitched",
    icon: Shirt,
    status: "In Progress",
  },
  {
    title: "Quality Check Passed",
    desc: "Final inspection completed",
    icon: CheckCircle,
    status: "QC Passed",
  },
  {
    title: "Packed & Shipped",
    desc: "Order packed and dispatched",
    icon: Package,
    status: "Shipped",
  },
  {
    title: "Out for Delivery",
    desc: "On the way to destination",
    icon: Truck,
    status: "Delivered",
  },
];

function ProductionWorkflowPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="underline underline-offset-10 decoration-purple-600">From Order to Delivery </span> - All in One System
        </h2>
        <p className="max-w-2xl mx-auto">
          Track every production stage clearly with real-time updates designed for garment factories.
        </p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-purple-600 rounded-full border-4 border-white" />

              <div className="flex justify-center mb-4">
                <step.icon className="w-10 h-10 text-purple-600" />
              </div>

              <h3 className="font-semibold text-lg text-black mb-1">{step.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{step.desc}</p>

              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-600/10 text-purple-600">
                {step.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default ProductionWorkflowPreview;