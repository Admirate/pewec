import { getSupabaseAdmin } from "@/lib/supabase";
import type { EnquiryWithContact } from "@/lib/constants";
import EnquiriesClient from "./EnquiriesClient";

const PAGE_SIZE = 10;

const VALID_TYPES = [
  "course",
  "general",
  "admission",
  "fees",
  "facilities",
  "other",
] as const;
type EnquiryType = (typeof VALID_TYPES)[number];

function isValidType(v: string | undefined): v is EnquiryType {
  return !!v && (VALID_TYPES as readonly string[]).includes(v);
}

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>;
}) {
  const { page: pageParam, type: typeParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1") || 1);
  const filterType = isValidType(typeParam) ? typeParam : "all";
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("enquiries")
    .select("*, contacts(first_name, last_name, email)", { count: "exact" });

  if (filterType !== "all") {
    query = query.eq("enquiry_type", filterType);
  }

  const {
    data,
    count: totalCount,
    error,
  } = await query.order("created_at", { ascending: false }).range(from, to);

  const enquiries: EnquiryWithContact[] = (data ?? []).map(
    ({
      contacts,
      ...row
    }: {
      contacts: { first_name: string; last_name: string; email: string } | null;
      [key: string]: unknown;
    }) => ({
      ...(row as Omit<
        EnquiryWithContact,
        "first_name" | "last_name" | "email"
      >),
      first_name: contacts?.first_name ?? "",
      last_name: contacts?.last_name ?? "",
      email: contacts?.email ?? "",
    }),
  );

  const totalPages = Math.ceil((totalCount ?? 0) / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Enquiries</h2>
        <p className="text-gray-500 mt-1 text-sm">
          {error ? "Failed to load enquiries." : `${totalCount ?? 0} total`}
        </p>
      </div>

      {error ? (
        <div className="bg-white rounded-xl shadow-sm px-6 py-10 text-center text-sm text-red-600">
          Error: {error.message}
        </div>
      ) : (
        <EnquiriesClient
          enquiries={enquiries}
          currentFilter={filterType}
          currentPage={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
