import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Activity, 
  Target, 
  IndianRupeeIcon,
  Save, 
  CheckCircle2,
  Globe,
  Search,
  Calendar,
  TrendingUp
} from "lucide-react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await api.get(`/leads/${id}`);
        setForm(res.data);
      } catch (err) {
        if (err.response?.status === 401) navigate("/login");
        console.error("Error fetching lead:", err);
      }
    };
    fetchLead();
  }, [id, navigate]);

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
      await api.put(`/leads/${id}`, form);
      toast.success("Lead updated successfully!");
      navigate(`/leads/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl max-w-sm w-full text-center">
          <div className="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading prospect information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 py-4 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Modify Prospect Details
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center">
                <User className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="Enter given name"
                      value={form.first_name}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Enter family name"
                      value={form.last_name}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-green-600" />
                Contact Details
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter primary email address"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter contact number with area code"
                      value={form.phone || ""}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-purple-600" />
                Business Information
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Building className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="company"
                      placeholder="Enter organization or business name"
                      value={form.company || ""}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        name="city"
                        placeholder="Enter metropolitan area"
                        value={form.city || ""}
                        onChange={handleChange}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State/Province
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        name="state"
                        placeholder="Enter province or region"
                        value={form.state || ""}
                        onChange={handleChange}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-indigo-600" />
                Acquisition & Assessment
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lead Source *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </div>
                    <select
                      name="source"
                      value={form.source}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 appearance-none cursor-pointer text-sm sm:text-base"
                    >
                      <option value="website">Website Portal</option>
                      <option value="facebook_ads">Facebook Marketing</option>
                      <option value="google_ads">Google Advertising</option>
                      <option value="referral">Partner Referral</option>
                      <option value="events">Industry Events</option>
                      <option value="other">Alternative Channel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Status *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </div>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-800 appearance-none cursor-pointer text-sm sm:text-base"
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
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-teal-600" />
                Scoring & Valuation
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lead Score
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      name="score"
                      placeholder="Rating between 0-100 points"
                      value={form.score}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estimated Value
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <IndianRupeeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      name="lead_value"
                      placeholder="Estimated revenue potential"
                      value={form.lead_value}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-50/50 border border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

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
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    form.is_qualified 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-slate-300 group-hover:border-green-400'
                  }`}>
                    {form.is_qualified && <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                  </div>
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
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Update Prospect Information</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}