"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/ui/Navbar";
import Kanban1 from "../components/ui/Kanban";
import { AiOutlineLoading } from "react-icons/ai";
import Button from "../components/ui/Button";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { BiSortAlt2 } from "react-icons/bi";
import Search from "../components/ui/Search";
import Dropdown from "../components/ui/Dropdown";
import ModalNewTask from "../components/ui/Modal";

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    { title: "Ready to start", color: "bg-blue-600" },
    { title: "In Progress", color: "bg-yellow-500" },
    { title: "Waiting for review", color: "bg-sky-400" },
    { title: "Pending Deploy", color: "bg-purple-500" },
    { title: "Stuck", color: "bg-red-600" },
    { title: "Done", color: "bg-green-500" },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL);
        const json = await res.json();
        if (json.response && Array.isArray(json.data)) {
          setTasks(json.data);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Filtering & Sorting logic
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter search
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter developer
    if (selectedRole !== "All") {
      filtered = filtered.filter((task) =>
        task.developer.toLowerCase().includes(selectedRole.toLowerCase())
      );
    }

    // Sorting
    if (sortOption === "Priority: High → Low") {
      const priorityOrder = [
        "Critical",
        "High",
        "Medium",
        "Low",
        "Best Effort",
      ];
      filtered.sort(
        (a, b) =>
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );
    } else if (sortOption === "Estimated SP: Low → High") {
      filtered.sort((a, b) => a["Estimated SP"] - b["Estimated SP"]);
    } else if (sortOption === "Estimated SP: High → Low") {
      filtered.sort((a, b) => b["Estimated SP"] - a["Estimated SP"]);
    }

    return filtered;
  }, [tasks, searchQuery, selectedRole, sortOption]);

  return (
    <div className="min-h-screen w-full bg-blue-900 p-10">
      <Navbar />
      {/* Control Bar */}
      <div className="flex flex-wrap items-center gap-5 mt-3">
        <Button
          label={"New Task"}
          rightIcon={<MdOutlineKeyboardArrowDown />}
          onClick={() => setIsOpen(true)}
        />

        <ModalNewTask isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Search */}
        <Search
          placeholder="Cari task..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filter Developer */}
        <Dropdown
          label={selectedRole === "All" ? "Person" : selectedRole}
          items={["All", "Alice", "Bob", "Charlie"]}
          leftIcon={<RxAvatar className="text-xl" />}
          onSelect={(item) => setSelectedRole(item)}
        />

        {/* Sort */}
        <Dropdown
          label={sortOption || "Sort"}
          items={[
            "Priority: High → Low",
            "Estimated SP: Low → High",
            "Estimated SP: High → Low",
          ]}
          leftIcon={<BiSortAlt2 className="text-xl" />}
          onSelect={(item) => setSortOption(item)}
        />
      </div>

      {/* Kanban Board */}
      {loading ? (
        <div className="flex items-start justify-start w-full pt-5">
          <AiOutlineLoading className="animate-spin text-blue-500 text-3xl" />
        </div>
      ) : (
        <div className="py-8">
          <div
            className="flex gap-6 overflow-x-auto pb-6"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {columns.map((col, i) => {
              const tasksInColumn = filteredTasks.filter(
                (t) => t.status.toLowerCase() === col.title.toLowerCase()
              );
              return (
                <Kanban1 key={i} col={col} filteredTasks={tasksInColumn} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;
