"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, RefreshCw, ToggleLeft, ToggleRight } from "lucide-react";
import type { Course } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CourseFormData = {
  name: string;
  type: "long_term" | "short_term";
  description: string;
  rep_email: string;
  is_active: boolean;
};

const EMPTY_FORM: CourseFormData = {
  name: "",
  type: "long_term",
  description: "",
  rep_email: "",
  is_active: true,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseFormData>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // ---------------------------------------------------------------------------
  // Data fetching
  // ---------------------------------------------------------------------------

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/courses");
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? "Failed to load courses");
      setCourses(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load courses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // ---------------------------------------------------------------------------
  // Modal helpers
  // ---------------------------------------------------------------------------

  const openCreate = () => {
    setEditingCourse(null);
    setFormData(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      type: course.type,
      description: course.description ?? "",
      rep_email: course.rep_email,
      is_active: course.is_active,
    });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCourse(null);
    setFormData(EMPTY_FORM);
    setFormError("");
  };

  // ---------------------------------------------------------------------------
  // Save (create or update)
  // ---------------------------------------------------------------------------

  const handleSave = async () => {
    setFormError("");
    if (!formData.name.trim()) {
      setFormError("Name is required");
      return;
    }
    if (!formData.rep_email.trim()) {
      setFormError("Rep email is required");
      return;
    }

    setSaving(true);
    try {
      const isEdit = !!editingCourse;
      const url = "/api/admin/courses";
      const method = isEdit ? "PATCH" : "POST";
      const body = isEdit ? { id: editingCourse!.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? "Save failed");

      await fetchCourses();
      closeModal();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // Quick toggle active/inactive without opening the modal
  const handleToggleActive = async (course: Course) => {
    try {
      const res = await fetch("/api/admin/courses", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: course.id, is_active: !course.is_active }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? "Toggle failed");
      await fetchCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Toggle failed");
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const longTerm = courses.filter((c) => c.type === "long_term");
  const shortTerm = courses.filter((c) => c.type === "short_term");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Courses</h2>
          <p className="text-gray-500 mt-1">Manage courses available in the enquiry form</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchCourses}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#c44944] text-white rounded-lg hover:bg-[#a83b36] transition-colors"
          >
            <Plus size={18} />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {/* Global error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Course sections */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          Loading...
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          No courses yet. Click &quot;Add Course&quot; to create one.
        </div>
      ) : (
        <>
          {[
            { label: "Long Term Courses", items: longTerm },
            { label: "Short Term Courses", items: shortTerm },
          ].map(({ label, items }) =>
            items.length === 0 ? null : (
              <div key={label} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-700">{label}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Rep Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {items.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 font-medium text-gray-800 max-w-xs">
                            {course.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{course.rep_email}</td>
                          <td className="px-4 py-4 text-sm text-gray-500 max-w-sm truncate">
                            {course.description ?? <span className="italic text-gray-400">—</span>}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                course.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {course.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEdit(course)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleToggleActive(course)}
                                className={`p-2 rounded-lg transition-colors ${
                                  course.is_active
                                    ? "text-orange-500 hover:bg-orange-50"
                                    : "text-green-600 hover:bg-green-50"
                                }`}
                                title={course.is_active ? "Deactivate" : "Activate"}
                              >
                                {course.is_active ? (
                                  <ToggleRight size={18} />
                                ) : (
                                  <ToggleLeft size={18} />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          )}
        </>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              {editingCourse ? "Edit Course" : "Add Course"}
            </h3>

            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {formError}
              </div>
            )}

            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="course-name">Name *</Label>
              <Input
                id="course-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Teacher Training"
              />
            </div>

            {/* Type */}
            <div className="space-y-1">
              <Label htmlFor="course-type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value as "long_term" | "short_term" })
                }
              >
                <SelectTrigger id="course-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long_term">Long Term</SelectItem>
                  <SelectItem value="short_term">Short Term</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rep Email */}
            <div className="space-y-1">
              <Label htmlFor="course-rep-email">Rep Email *</Label>
              <Input
                id="course-rep-email"
                type="email"
                value={formData.rep_email}
                onChange={(e) => setFormData({ ...formData, rep_email: e.target.value })}
                placeholder="rep@pewec.com"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Brief description of the course..."
              />
            </div>

            {/* Active toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Active</Label>
                <p className="text-xs text-muted-foreground">
                  {formData.is_active ? "Visible in enquiry form" : "Hidden from enquiry form"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${
                  formData.is_active ? "bg-[#006457]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    formData.is_active ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#006457] hover:bg-[#005347] text-white"
              >
                {saving ? "Saving..." : editingCourse ? "Save Changes" : "Create Course"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
