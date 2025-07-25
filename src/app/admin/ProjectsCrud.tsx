"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ProjectsCrud() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    featured: false,
    // Add other fields as needed
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (error) setError(error.message);
    setProjects(data || []);
    setLoading(false);
  }

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function startEdit(project: any) {
    setEditing(project);
    setForm({
      name: project.name || "",
      description: project.description || "",
      featured: project.featured || false,
      // Add other fields as needed
    });
  }

  function cancelEdit() {
    setEditing(null);
    setForm({ name: "", description: "", featured: false });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError(null);
    if (editing) {
      // Update
      const { error } = await supabase.from("projects").update(form).eq("id", editing.id);
      if (error) setError(error.message);
    } else {
      // Create
      const { error } = await supabase.from("projects").insert([form]);
      if (error) setError(error.message);
    }
    await fetchProjects();
    cancelEdit();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) setError(error.message);
    await fetchProjects();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Projects CRUD</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="border px-2 py-1 w-full"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border px-2 py-1 w-full"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured
        </label>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
            {editing ? "Update" : "Create"}
          </button>
          {editing && (
            <button type="button" onClick={cancelEdit} className="bg-gray-300 px-4 py-1 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Featured</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{p.description}</td>
                <td className="border px-2 py-1 text-center">{p.featured ? "✅" : ""}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button onClick={() => startEdit(p)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
