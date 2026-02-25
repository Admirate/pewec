"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Eye, X, Mail, Phone, Calendar, BookOpen, FileText } from "lucide-react";
import type { EnquiryWithContact } from "@/lib/constants";
import Pagination from "@/app/admin/components/Pagination";
import { formatDateMobile, formatDateDesktop } from "@/components/admin/DateDisplay";

const TYPE_LABELS: Record<string, string> = {
  course: "Course",
  general: "General",
  admission: "Admission",
  fees: "Fees & Payment",
  facilities: "Facilities",
  other: "Other",
};

const TYPE_STYLES: Record<string, string> = {
  course: "bg-red-100 text-red-700",
  general: "bg-blue-100 text-blue-700",
  admission: "bg-green-100 text-green-700",
  fees: "bg-purple-100 text-purple-700",
  facilities: "bg-orange-100 text-orange-700",
  other: "bg-gray-100 text-gray-600",
};

const FILTER_OPTIONS = [
  { id: "all", label: "All Types" },
  { id: "course", label: "Course" },
  { id: "general", label: "General" },
  { id: "admission", label: "Admission" },
  { id: "fees", label: "Fees & Payment" },
  { id: "facilities", label: "Facilities" },
  { id: "other", label: "Other" },
];

function EnquiryModal({ enquiry, onClose }: { enquiry: EnquiryWithContact; onClose: () => void }) {
  const initials = `${enquiry.first_name[0] ?? ""}${enquiry.last_name[0] ?? ""}`.toUpperCase();

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <h2 className="text-base font-semibold text-gray-800 shrink-0">Enquiry Details</h2>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                TYPE_STYLES[enquiry.enquiry_type] ?? TYPE_STYLES.other
              }`}
            >
              {TYPE_LABELS[enquiry.enquiry_type] ?? enquiry.enquiry_type}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 shrink-0 ml-2"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Contact mini-card */}
          <div className="px-4 sm:px-6 py-5 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Contact
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#c44944] flex items-center justify-center text-white font-bold text-sm shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <Link
                  href={`/admin/contacts/${enquiry.contact_id}`}
                  className="text-sm font-semibold text-[#c44944] hover:underline"
                  onClick={onClose}
                >
                  {enquiry.first_name} {enquiry.last_name}
                </Link>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                  <Mail size={12} className="text-gray-400 shrink-0" />
                  <span className="truncate">{enquiry.email}</span>
                </div>
                {enquiry.phone && (
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-500">
                    <Phone size={12} className="text-gray-400 shrink-0" />
                    {enquiry.phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enquiry body */}
          <div className="px-4 sm:px-6 py-5 border-b border-gray-100 space-y-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Enquiry</p>

            {enquiry.enquiry_type === "course" && enquiry.course_name && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Course</p>
                <div className="flex items-start gap-2.5">
                  <BookOpen size={15} className="text-gray-400 mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-gray-800">{enquiry.course_name}</span>
                </div>
              </div>
            )}

            {enquiry.enquiry_details ? (
              <div>
                <p className="text-xs text-gray-400 mb-1">Message</p>
                <div className="flex items-start gap-2.5">
                  <FileText size={15} className="text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">{enquiry.enquiry_details}</p>
                </div>
              </div>
            ) : !enquiry.course_name ? (
              <p className="text-sm text-gray-400 italic">No additional details provided.</p>
            ) : null}
          </div>

          {/* Metadata */}
          <div className="px-4 sm:px-6 py-5 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Details</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Status</p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    enquiry.is_read ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"
                  }`}
                >
                  {enquiry.is_read ? "Read" : "New"}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Submitted</p>
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Calendar size={13} className="text-gray-400 shrink-0" />
                  <span className="hidden sm:block">{formatDateDesktop(enquiry.created_at)}</span>
                  <span className="sm:hidden">{formatDateMobile(enquiry.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 pb-safe border-t border-gray-100 shrink-0">
          <Link
            href={`/admin/contacts/${enquiry.contact_id}`}
            onClick={onClose}
            className="block w-full text-center px-4 py-3 bg-[#c44944] text-white text-sm font-medium rounded-lg hover:bg-[#a33b37] transition-colors"
          >
            View Contact Profile
          </Link>
        </div>
      </div>
    </>
  );
}

export default function EnquiriesClient({
  enquiries,
  currentFilter,
  currentPage,
  totalPages,
}: {
  enquiries: EnquiryWithContact[];
  currentFilter: string;
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<EnquiryWithContact | null>(null);

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams();
    if (value !== "all") params.set("type", value);
    // omitting page resets to 1 on the server
    const qs = params.toString();
    router.push(qs ? `/admin/enquiries?${qs}` : "/admin/enquiries");
  };

  // Extra params to preserve the type filter in pagination links
  const paginationExtra: Record<string, string> =
    currentFilter !== "all" ? { type: currentFilter } : {};

  return (
    <>
      <div className="space-y-4">
        {/* Filter bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-gray-500">Filter:</span>
          <select
            value={currentFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c44944]/30"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {enquiries.length > 0 ? (
            <>
              {/* Mobile: card rows */}
              <div className="md:hidden divide-y divide-gray-100">
                {enquiries.map((enquiry) => (
                  <div key={enquiry.id} className="px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            href={`/admin/contacts/${enquiry.contact_id}`}
                            className="text-sm font-semibold text-[#c44944]"
                          >
                            {enquiry.first_name} {enquiry.last_name}
                          </Link>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              TYPE_STYLES[enquiry.enquiry_type] ?? TYPE_STYLES.other
                            }`}
                          >
                            {TYPE_LABELS[enquiry.enquiry_type] ?? enquiry.enquiry_type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 truncate">{enquiry.email}</p>
                        {(enquiry.course_name || enquiry.enquiry_details) && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {enquiry.enquiry_type === "course"
                              ? enquiry.course_name
                              : enquiry.enquiry_details}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs text-gray-400">
                          {formatDateMobile(enquiry.created_at)}
                        </span>
                        <button
                          onClick={() => setSelected(enquiry)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#c44944] hover:bg-red-50 active:bg-red-100 transition-colors"
                          aria-label="View enquiry details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Name
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Email
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Type
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Details
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Date
                      </th>
                      <th className="px-6 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <Link
                            href={`/admin/contacts/${enquiry.contact_id}`}
                            className="text-[#c44944] hover:underline"
                          >
                            {enquiry.first_name} {enquiry.last_name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{enquiry.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              TYPE_STYLES[enquiry.enquiry_type] ?? TYPE_STYLES.other
                            }`}
                          >
                            {TYPE_LABELS[enquiry.enquiry_type] ?? enquiry.enquiry_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                          {enquiry.enquiry_type === "course"
                            ? (enquiry.course_name ?? "—")
                            : enquiry.enquiry_details
                              ? enquiry.enquiry_details.length > 80
                                ? enquiry.enquiry_details.slice(0, 80) + "…"
                                : enquiry.enquiry_details
                              : "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {formatDateDesktop(enquiry.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelected(enquiry)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#c44944] hover:bg-red-50 transition-colors"
                            aria-label="View enquiry details"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/admin/enquiries"
                extraParams={paginationExtra}
              />
            </>
          ) : (
            <p className="px-6 py-10 text-center text-sm text-gray-500">No enquiries found.</p>
          )}
        </div>
      </div>

      {selected && <EnquiryModal enquiry={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
