import { getSupabaseAdmin } from "@/lib/supabase";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Contact } from "@/lib/constants";
import Pagination from "@/app/admin/components/Pagination";
import { formatDateMobile, formatDateDesktop } from "@/components/admin/DateDisplay";

const PAGE_SIZE = 10;

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = getSupabaseAdmin();

  const {
    data: contacts,
    count: totalCount,
    error,
  } = await supabase
    .from("contacts")
    .select("id, first_name, last_name, email, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((totalCount ?? 0) / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Contacts</h2>
        <p className="text-gray-500 mt-1 text-sm">
          {error ? "Failed to load contacts." : `${totalCount ?? 0} total`}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {error ? (
          <p className="px-6 py-10 text-center text-sm text-red-600">Error: {error.message}</p>
        ) : contacts && contacts.length > 0 ? (
          <>
            {/* Mobile: card rows */}
            <div className="md:hidden divide-y divide-gray-100">
              {(contacts as Contact[]).map((contact) => (
                <Link
                  key={contact.id}
                  href={`/admin/contacts/${contact.id}`}
                  className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#c44944] truncate">
                      {contact.first_name} {contact.last_name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{contact.email}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-3">
                    <span className="text-xs text-gray-400">
                      {formatDateMobile(contact.created_at)}
                    </span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                </Link>
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
                      Date Added
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(contacts as Contact[]).map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">
                        <Link
                          href={`/admin/contacts/${contact.id}`}
                          className="text-[#c44944] hover:underline"
                        >
                          {contact.first_name} {contact.last_name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDateDesktop(contact.created_at, true)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} basePath="/admin/contacts" />
          </>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-gray-500">No contacts yet.</p>
        )}
      </div>
    </div>
  );
}
