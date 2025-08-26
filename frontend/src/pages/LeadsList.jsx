import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Plus, Eye, Mail, Building2 } from "lucide-react";

export default function LeadsList() {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;
  const [filters, setFilters] = useState({
    status: "",
    city: "",
    email: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
  status: "",
  city: "",
  email: "",
  });

  const navigate = useNavigate();

 useEffect(() => {
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...(appliedFilters.status && { status: appliedFilters.status }),
        ...(appliedFilters.city && { city: appliedFilters.city }),
        ...(appliedFilters.email && { email: appliedFilters.email }),
      }).toString();

      const res = await api.get(`/leads?${queryParams}`);
      setRowData(res.data.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchLeads();
}, [page, appliedFilters, navigate]);

// handler for Apply Filters button
const handleApplyFilters = () => {
  setAppliedFilters(filters);
  setPage(1); // reset to first page
};

  const handleAdd = () => navigate("new");
  const handleDetails = (id) => navigate(`/leads/${id}`);

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: "bg-blue-100 text-blue-700 border-blue-200",
      contacted: "bg-amber-100 text-amber-700 border-amber-200",
      qualified: "bg-emerald-100 text-emerald-700 border-emerald-200",
      lost: "bg-red-100 text-red-700 border-red-200",
      won: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return (
      statusConfig[status?.toLowerCase()] ||
      "bg-slate-100 text-slate-600 border-slate-200"
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600 font-semibold";
    if (score >= 60) return "text-amber-600 font-semibold";
    return "text-slate-500 font-medium";
  };

  const columns = [
    {
      header: "Contact",
      accessorKey: "first_name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
            {`${row.original.first_name?.[0] || ""}${
              row.original.last_name?.[0] || ""
            }`.toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-slate-900">
              {row.original.first_name} {row.original.last_name}
            </div>
            <div className="text-sm text-slate-500 flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {row.original.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Company",
      accessorKey: "company",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span className="font-medium text-slate-700">
            {row.original.company || "—"}
          </span>
        </div>
      ),
    },
    {
      header: "Location",
      accessorKey: "city",
      cell: ({ row }) => (
        <span className="text-slate-600">{row.original.city || "—"}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
            row.original.status
          )}`}
        >
          {row.original.status || "Unknown"}
        </span>
      ),
    },
    {
      header: "Score",
      accessorKey: "score",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <span className={getScoreColor(row.original.score)}>
            {row.original.score || 0}
          </span>
          <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                row.original.score >= 80
                  ? "bg-emerald-500"
                  : row.original.score >= 60
                  ? "bg-amber-500"
                  : "bg-slate-400"
              }`}
              style={{ width: `${Math.min(row.original.score || 0, 100)}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => handleDetails(row.original._id)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 group"
        >
          <Eye className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
          View
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: rowData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Leads</h1>
            <p className="text-slate-600">
              Manage and track your sales prospects
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleAdd}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by Email"
              value={filters.email}
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
              className="px-3 py-2 border rounded-lg text-sm"
            />

            <input
              type="text"
              placeholder="City"
              value={filters.city}
              onChange={(e) =>
                setFilters({ ...filters, city: e.target.value })
              }
              className="px-3 py-2 border rounded-lg text-sm"
            />

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
              <option value="won">Won</option>
            </select>

            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              Loading...
            </div>
          ) : rowData.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-16 text-slate-500">
    <p className="text-lg font-medium">No Data Available</p>
    <button
      onClick={handleAdd}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      + Add Lead
    </button>
  </div>
) : (
            <>
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b border-slate-200 bg-slate-50/50"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center px-6 py-4 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-slate-600 text-sm">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
