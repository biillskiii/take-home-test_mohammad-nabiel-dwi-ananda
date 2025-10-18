import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Tabel from "../components/ui/Tabel";
import Navbar from "../components/ui/Navbar";
import Button from "../components/ui/Button";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { BiSortAlt2 } from "react-icons/bi";
import ModalNewTask from "../components/ui/Modal";
import Search from "../components/ui/Search";
import Dropdown from "../components/ui/Dropdown";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(apiUrl);

        const fetchedTasks = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Ada error", err);
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
          onClick={() => setIsOpen(true)} // buka modal
        />

        <ModalNewTask
          isOpen={isOpen}
          onClose={() => setIsOpen(false)} // tutup modal
        />

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

      {/*  Table */}
      <div className="mt-5">
        <Tabel tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default App;
