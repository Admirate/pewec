"use client";

import { useState } from "react";
import { Search, Filter, Download, Eye, Trash2, RefreshCw } from "lucide-react";
import type { ContactEnquiry } from "@/lib/constants";
import { ENQUIRY_TYPES } from "@/lib/constants";

// TODO: Backend Engineer - Implement data fetching from Supabase
// 1. Create a function to fetch all contact_enquiries from Supabase
// 2. Use getSupabaseAdmin() from '@/lib/supabase' in an API route
// 3. Or create a server component to fetch directly
// 
// Example API route to create: /api/admin/contact-enquiries
// It should return: { data: ContactEnquiry[], error: string | null }

// Mock data for UI development - Replace with real data
const mockData: ContactEnquiry[] = [
  // Backend will populate this from Supabase
];

export default function ContactEnquiriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [data] = useState<ContactEnquiry[]>(mockData);
  const [loading] = useState(false);

  // TODO: Backend - Implement refresh function
  const handleRefresh = () => {
    console.log("TODO: Fetch fresh data from Supabase");
  };

  // TODO: Backend - Implement delete function
  const handleDelete = (id: string) => {
    console.log("TODO: Delete enquiry with id:", id);
  };

  // TODO: Backend - Implement mark as read function
  const handleMarkAsRead = (id: string) => {
    console.log("TODO: Mark enquiry as read:", id);
  };

  // TODO: Backend - Implement export function
  const handleExport = () => {
    console.log("TODO: Export data to CSV");
  };

  // Filter data based on search and filter
  const filteredData = data.filter((item) => {
    const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      (item.message?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesFilter =
      filterType === "all" || item.enquiry_type === filterType;

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEnquiryTypeName = (typeId: string) => {
    return ENQUIRY_TYPES.find((t) => t.id === typeId)?.name || typeId;
  };

  const getEnquiryTypeColor = (typeId: string) => {
    const colors: Record<string, string> = {
      general: "bg-blue-100 text-blue-800",
      admission: "bg-green-100 text-green-800",
      fees: "bg-purple-100 text-purple-800",
      facilities: "bg-orange-100 text-orange-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[typeId] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Contact Enquiries
          </h2>
          <p className="text-gray-500 mt-1">
            Manage all contact form submissions
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#006457] text-white rounded-lg hover:bg-[#005347] transition-colors"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, email, phone, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c44944] focus:border-transparent"
            />
          </div>

          {/* Filter by Enquiry Type */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c44944] focus:border-transparent"
            >
              <option value="all">All Types</option>
              {ENQUIRY_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Enquiry Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No enquiries found. Data will appear here once connected to Supabase.
                  </td>
                </tr>
              ) : (
                filteredData.map((enquiry) => (
                  <tr key={enquiry.id} className={`hover:bg-gray-50 ${!enquiry.is_read ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-800">
                        {enquiry.first_name} {enquiry.last_name}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600">{enquiry.email}</div>
                      <div className="text-sm text-gray-500">{enquiry.phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEnquiryTypeColor(
                          enquiry.enquiry_type
                        )}`}
                      >
                        {getEnquiryTypeName(enquiry.enquiry_type)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-600 max-w-xs truncate">
                        {enquiry.message || "-"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {formatDate(enquiry.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          enquiry.is_read
                            ? "bg-gray-100 text-gray-600"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {enquiry.is_read ? "Read" : "New"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMarkAsRead(enquiry.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Mark as Read"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        {filteredData.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredData.length} results
            </p>
            {/* TODO: Backend - Add pagination */}
          </div>
        )}
      </div>

      {/* Backend Integration Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-yellow-800 text-sm">
          <strong>Backend TODO:</strong> Connect this page to Supabase to fetch real data from the{" "}
          <code className="bg-yellow-100 px-1 rounded">contact_enquiries</code> table.
        </p>
      </div>
    </div>
  );
}
