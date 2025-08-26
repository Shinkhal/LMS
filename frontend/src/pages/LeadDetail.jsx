import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Calendar, 
  Edit, 
  Trash2, 
  Clock,
  Activity,
  TrendingUp,
  Shield
} from "lucide-react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await api.get(`/leads/${id}`);
        setLead(res.data);
      } catch (err) {
        if (err.response?.status === 401) navigate("/login");
        console.error("Error fetching lead:", err);
      }
    };
    fetchLead();
  }, [id, navigate]);

  const deleteLead = async () => {
    if (!window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return;
    try {
      await api.delete(`/leads/${id}`);
      toast.success("Lead deleted successfully!");
      navigate("/leads");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting lead");
    }
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return "from-emerald-400 to-green-500";
    if (score >= 60) return "from-blue-400 to-indigo-500";
    if (score >= 40) return "from-amber-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "No recent activity";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!lead) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-12 shadow-xl">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-700 text-lg font-medium">Loading lead profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="max-w-7xl mx-auto p-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Contact Information */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="group hover:bg-white/30 p-4 rounded-2xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                        <User className="w-5 h-5 text-blue-600" />
                        </div>
                      <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Full Name</p>
                        <p className="text-slate-800 font-semibold text-lg">{lead.first_name} {lead.last_name}</p>
                        </div>
                        </div>

                  </div>
                  
                  <div className="group hover:bg-white/30 p-4 rounded-2xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Email Address</p>
                        <p className="text-slate-800 font-semibold text-lg">{lead.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-white/30 p-4 rounded-2xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center border border-emerald-400/30">
                        <Phone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Phone Number</p>
                        <p className="text-slate-800 font-semibold text-lg">{lead.phone || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-white/30 p-4 rounded-2xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                        <Building className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Company</p>
                        <p className="text-slate-800 font-semibold text-lg">{lead.company || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                  
                </div>

                <div className="space-y-6">
                  
                  <div className="group hover:bg-white/30 p-4 rounded-2xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-400/30">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Location</p>
                        <p className="text-slate-800 font-semibold text-lg">
                          {lead.city || lead.state ? `${lead.city || ""} ${lead.state || ""}`.trim() : "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-white/30 p-4 rounded-2xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30">
                        <Activity className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Lead Source</p>
                        <p className="text-slate-800 font-semibold text-lg">{lead.source}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-white/30 p-4 rounded-2xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center border border-amber-400/30">
                        <TrendingUp className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Estimated Value</p>
                        <p className="text-slate-800 font-semibold text-lg">₹{lead.lead_value}</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                Activity Timeline
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <p className="text-blue-700 font-semibold">Last Activity</p>
                  </div>
                  <p className="text-slate-700 font-medium">{formatDateTime(lead.last_activity_at)}</p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <p className="text-emerald-700 font-semibold">Created Date</p>
                  </div>
                  <p className="text-slate-700 font-medium">{formatDate(lead.createdAt)}</p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <p className="text-purple-700 font-semibold">Last Updated</p>
                  </div>
                  <p className="text-slate-700 font-medium">{formatDate(lead.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Lead Assessment */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Lead Assessment
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-600">Performance Score</span>
                    <span className={`font-bold text-xl ${getScoreColor(lead.score)}`}>
                      {lead.score}/100
                    </span>
                  </div>
                  <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreGradient(lead.score)} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                      style={{ width: `${lead.score}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl border border-slate-200/50">
                  <span className="text-slate-600">Qualification Status</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${lead.is_qualified ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
                    <span className={`font-semibold ${lead.is_qualified ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {lead.is_qualified ? "Qualified" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => navigate(`/leads/edit/${lead._id}`)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Lead</span>
                </button>
                
                <button
                  onClick={deleteLead}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete Lead</span>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}