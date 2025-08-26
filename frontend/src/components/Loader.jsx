
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
        <span className="text-xl font-semibold text-slate-700">
          Managing Leads...
        </span>
      </div>
      <p className="text-slate-500 text-sm mt-3">
        Please wait while we load your dashboard
      </p>
    </div>
  );
}
