import { getSupabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  FileText,
  MessageSquare,
  User,
} from "lucide-react";
import type { Enquiry } from "@/lib/constants";
import { formatDateDesktop } from "@/components/admin/DateDisplay";

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

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-gray-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const [{ data: contact, error: contactError }, { data: enquiries }] = await Promise.all([
    supabase.from("contacts").select("*").eq("id", id).single(),
    supabase
      .from("enquiries")
      .select("*")
      .eq("contact_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (contactError || !contact) notFound();

  const allEnquiries = (enquiries ?? []) as Enquiry[];
  const phone = allEnquiries.find((e) => e.phone)?.phone ?? null;
  const totalEnquiries = allEnquiries.length;
  const firstEnquiry = allEnquiries.at(-1);
  const latestEnquiry = allEnquiries.at(0);
  const initials = `${contact.first_name[0] ?? ""}${contact.last_name[0] ?? ""}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/contacts"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} />
        Back to Contacts
      </Link>

      {/* Profile card */}
      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
        {/* Avatar + name — stacked on mobile, side-by-side on sm+ */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-5">
          <div className="w-16 h-16 rounded-full bg-[#c44944] flex items-center justify-center text-white text-xl font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {contact.first_name} {contact.last_name}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Contact</p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <Field icon={User} label="First Name" value={contact.first_name} />
              <Field icon={User} label="Last Name" value={contact.last_name} />
              <Field icon={Mail} label="Email" value={contact.email} />
              <Field icon={Phone} label="Phone" value={phone ?? "Not provided"} />
              <Field
                icon={Calendar}
                label="Member Since"
                value={formatDateDesktop(contact.created_at)}
              />
            </div>
          </div>
        </div>

        {/* Stats strip — always 3-col so it doesn't stack on mobile */}
        {totalEnquiries > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{totalEnquiries}</p>
              <p className="text-xs text-gray-500 mt-0.5">Enquiries</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800">
                {formatDateDesktop(firstEnquiry!.created_at)}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">First</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800">
                {formatDateDesktop(latestEnquiry!.created_at)}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Latest</p>
            </div>
          </div>
        )}
      </div>

      {/* Enquiry history */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Enquiry History
          <span className="ml-2 text-sm font-normal text-gray-400">{totalEnquiries}</span>
        </h3>

        {allEnquiries.length > 0 ? (
          <div className="space-y-3">
            {allEnquiries.map((enquiry) => (
              <div key={enquiry.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                {/* Type badge + date */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      TYPE_STYLES[enquiry.enquiry_type] ?? TYPE_STYLES.other
                    }`}
                  >
                    {TYPE_LABELS[enquiry.enquiry_type] ?? enquiry.enquiry_type}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDateDesktop(enquiry.created_at)}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  {enquiry.enquiry_type === "course" && enquiry.course_name && (
                    <div className="flex items-start gap-2.5 text-sm text-gray-700">
                      <BookOpen size={15} className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="font-medium">{enquiry.course_name}</span>
                    </div>
                  )}
                  {enquiry.enquiry_details && (
                    <div className="flex items-start gap-2.5 text-sm text-gray-600">
                      <FileText size={15} className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{enquiry.enquiry_details}</span>
                    </div>
                  )}
                  {!enquiry.course_name && !enquiry.enquiry_details && (
                    <div className="flex items-start gap-2.5 text-sm text-gray-400 italic">
                      <MessageSquare size={15} className="mt-0.5 shrink-0" />
                      <span>No additional details provided.</span>
                    </div>
                  )}
                  {enquiry.phone && (
                    <div className="flex items-start gap-2.5 text-sm text-gray-500">
                      <Phone size={15} className="text-gray-400 mt-0.5 shrink-0" />
                      <span>{enquiry.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm px-6 py-10 text-center text-sm text-gray-500">
            No enquiries from this contact yet.
          </div>
        )}
      </div>
    </div>
  );
}
