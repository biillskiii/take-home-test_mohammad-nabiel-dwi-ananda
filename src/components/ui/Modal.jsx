"use client";
import { useState } from "react";
import Button from "./Button";

const ModalNewTask = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    task: "",
    developer: "",
    status: "Ready to start",
    priority: "Medium",
    type: "Feature Enhancements",
    date: "",
    estimatedSP: "",
    actualSP: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Handle Submit Dummy
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            {/* Task */}
            <div>
              <label className="block text-sm font-medium">Task</label>
              <input
                type="text"
                name="task"
                value={formData.task}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            {/* Developer */}
            <div>
              <label className="block text-sm font-medium">Developer</label>
              <input
                type="text"
                name="developer"
                placeholder="Pisahkan dengan koma (misal: Budi, Ani)"
                value={formData.developer}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              {[
                "Ready to start",
                "In Progress",
                "Waiting for review",
                "Pending Deploy",
                "Done",
                "Stuck",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              {["Critical", "High", "Medium", "Low", "Best Effort"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              {["Feature Enhancements", "Other", "Bug"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Estimated SP */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium">Estimated SP</label>
              <input
                type="number"
                name="estimatedSP"
                value={formData.estimatedSP}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            {/* Actual SP */}
            <div>
              <label className="block text-sm font-medium">Actual SP</label>
              <input
                type="number"
                name="actualSP"
                value={formData.actualSP}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-3">
            <Button outline label={"Cancel"} onClick={onClose} />
            <Button label={"Save"} onClick={() => {}} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalNewTask;
