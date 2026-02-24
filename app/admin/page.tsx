"use client";

import { GraduationCap, MessageSquare, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

// TODO: Backend Engineer - Replace with actual data from Supabase
// Use getSupabaseAdmin() from '@/lib/supabase' to fetch counts
const stats = {
  totalCourseEnquiries: 0,
  totalContactEnquiries: 0,
  unreadCourseEnquiries: 0,
  unreadContactEnquiries: 0,
};

const statCards = [
  {
    title: "Course Enquiries",
    value: stats.totalCourseEnquiries,
    icon: GraduationCap,
    color: "bg-blue-500",
    href: "/admin/course-enquiries",
  },
  {
    title: "Contact Enquiries",
    value: stats.totalContactEnquiries,
    icon: MessageSquare,
    color: "bg-green-500",
    href: "/admin/contact-enquiries",
  },
  {
    title: "Unread Course",
    value: stats.unreadCourseEnquiries,
    icon: TrendingUp,
    color: "bg-orange-500",
    href: "/admin/course-enquiries",
  },
  {
    title: "Unread Contact",
    value: stats.unreadContactEnquiries,
    icon: Users,
    color: "bg-purple-500",
    href: "/admin/contact-enquiries",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">
          Welcome to PEWEC Admin Panel. Monitor all enquiries here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/course-enquiries"
            className="px-4 py-2 bg-[#c44944] text-white rounded-lg hover:bg-[#a33b37] transition-colors"
          >
            View Course Enquiries
          </Link>
          <Link
            href="/admin/contact-enquiries"
            className="px-4 py-2 bg-[#006457] text-white rounded-lg hover:bg-[#005347] transition-colors"
          >
            View Contact Enquiries
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go to Website
          </Link>
        </div>
      </div>

      {/* Info Box for Backend Engineer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          🔧 Backend Integration Required
        </h3>
        <p className="text-yellow-700 text-sm">
          This dashboard needs to be connected to Supabase to display real data. See the TODO
          comments in the code for implementation details.
        </p>
      </div>
    </div>
  );
}
