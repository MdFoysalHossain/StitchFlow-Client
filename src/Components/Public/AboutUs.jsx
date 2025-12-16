import { FaIndustry, FaUsers, FaTruck, FaChartLine } from "react-icons/fa";
import Garments from "/Garments.jpg"

function AboutUs() {
  return (
    <div className="gray-bg mb-[-80px]">
      <section className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About Our Platform
          </h1>
          <p className="max-w-3xl mx-auto text-lg">
            A modern Garments Order & Production Tracker System built to simplify
            factory workflows, improve transparency, and ensure timely delivery.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="p-8 rounded-2xl bg-white  shadow h-full">
          <h2 className="text-3xl font-bold mb-4 text-black">Who We Are</h2>
          <p className="text-black leading-relaxed mb-4">
            We focus on empowering small and medium-sized garment factories with a
            centralized system to manage orders, production stages, inventory, and
            delivery tracking — all in one place.
          </p>
          <p className="text-black leading-relaxed">
            Our goal is to reduce manual effort, eliminate miscommunication, and
            provide real-time visibility for admins, managers, and buyers.
          </p>
        </div>
        <img
          src={Garments}
          alt="Garments Factory"
          className="rounded-2xl shadow-lg object-cover w-full h-80"
        />
      </section>

      <section className="py-16 -mt-15">
        <div className="max-w-7xl  mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-2xl bg-white  shadow">
            <h3 className="text-2xl font-semibold mb-3 text-black">Our Mission</h3>
            <p className="text-black">
              To digitize garment production management by providing a reliable,
              secure, and easy-to-use system that enhances productivity and
              decision-making.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white  shadow">
            <h3 className="text-2xl font-semibold mb-3 text-black">Our Vision</h3>
            <p className="text-black">
              To become a trusted solution for garment factories worldwide,
              enabling smarter production tracking and seamless collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 -mt-10">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-white  rounded-2xl shadow text-center">
            <FaIndustry className="text-4xl text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold mb-2 text-black">Production Tracking</h4>
            <p className="text-sm text-black">
              Monitor cutting, sewing, finishing, and delivery stages in real time.
            </p>
          </div>
          <div className="p-6 bg-white  rounded-2xl shadow text-center">
            <FaUsers className="text-4xl text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold mb-2 text-black">Role-Based Access</h4>
            <p className="text-sm text-black">
              Dedicated dashboards for Admins, Managers, and Buyers.
            </p>
          </div>
          <div className="p-6 bg-white  rounded-2xl shadow text-center">
            <FaTruck className="text-4xl text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold mb-2 text-black">Order Tracking</h4>
            <p className="text-sm text-black">
              Transparent order status and shipment tracking for buyers.
            </p>
          </div>
          <div className="p-6 bg-white  rounded-2xl shadow text-center">
            <FaChartLine className="text-4xl text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold mb-2 text-black">Analytics & Insights</h4>
            <p className="text-sm text-black">
              Data-driven insights to improve efficiency and planning.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Built for Modern Garment Businesses
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto">
            Whether you are an admin, manager, or buyer — our system ensures
            clarity, control, and confidence throughout the production lifecycle.
          </p>
        </div>
      </section>
    </div>
  );
}


export default AboutUs;