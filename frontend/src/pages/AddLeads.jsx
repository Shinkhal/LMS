import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function LeadForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "website",
    status: "new",
    score: 0,
    lead_value: 0,
    is_qualified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/leads", form);
      toast.success("Lead added successfully!");
      navigate("/leads");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-4 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Add New Prospect
            </h1>
            <div className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">Create a new lead record in your pipeline</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Enter given name"
                    value={form.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Enter family name"
                    value={form.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">
                Contact Details
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter primary email address"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter contact number with area code"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">
                Business Information
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Enter organization or business name"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter metropolitan area"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter province or region"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Acquisition & Assessment */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">
                Acquisition & Assessment
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lead Source *
                  </label>
                  <select
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 appearance-none cursor-pointer text-sm sm:text-base"
                  >
                    <option value="website">Website Portal</option>
                    <option value="facebook_ads">Facebook Marketing</option>
                    <option value="google_ads">Google Advertising</option>
                    <option value="referral">Partner Referral</option>
                    <option value="events">Industry Events</option>
                    <option value="other">Alternative Channel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Status *
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 appearance-none cursor-pointer text-sm sm:text-base"
                  >
                    <option value="new">Fresh Inquiry</option>
                    <option value="contacted">Initial Contact</option>
                    <option value="qualified">Verified Prospect</option>
                    <option value="lost">Opportunity Lost</option>
                    <option value="won">Successfully Converted</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Scoring & Value */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">
                Scoring & Valuation
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lead Score
                  </label>
                  <input
                    type="number"
                    name="score"
                    placeholder="Rating between 0-100 points"
                    value={form.score}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estimated Value
                  </label>
                  <input
                    type="number"
                    name="lead_value"
                    placeholder="Estimated revenue potential"
                    value={form.lead_value}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Qualification Status */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="mb-2">
                <h3 className="text-sm font-medium text-slate-700">Qualification Status</h3>
              </div>
              <label className="flex items-center space-x-3 sm:space-x-4 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="is_qualified"
                    checked={form.is_qualified}
                    onChange={handleChange}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 border-2 border-slate-300 rounded-lg focus:ring-green-500 focus:ring-2 transition-all duration-200"
                  />
                </div>
                <span className="text-sm sm:text-lg font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                  Mark as Verified Qualified Prospect
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 sm:pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg text-sm sm:text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Creating Lead...</span>
                  </>
                ) : (
                  <span>Add New Prospect</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}