import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "in progress":
      return "bg-orange-400/40 text-orange-300";
    case "waiting for review":
      return "bg-purple-400/40 text-purple-300";
    case "ready to start":
      return "bg-blue-400/40 text-blue-300";
    case "pending deploy":
      return "bg-cyan-400/40 text-cyan-300";
    case "stuck":
      return "bg-red-400/40 text-red-300";
    case "done":
      return "bg-green-400/40 text-green-300";
    default:
      return "bg-gray-400/40 text-gray-300";
  }
};

const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "critical":
      return "bg-red-500/40 text-red-300";
    case "high":
      return "bg-purple-500/40 text-purple-300";
    case "medium":
      return "bg-blue-500/40 text-blue-300";
    case "low":
      return "bg-gray-500/40 text-gray-300";
    case "best effort":
      return "bg-yellow-500/40 text-yellow-300";
    default:
      return "bg-gray-400/40 text-gray-300";
  }
};

const getTypeColor = (type) => {
  if (type.toLowerCase().includes("feature"))
    return "bg-pink-400/40 text-pink-300";
  if (type.toLowerCase().includes("bug")) return "bg-red-400/40 text-red-300";
  return "bg-violet-400/40 text-violet-300";
};

const Tabel = ({ tasks = [], onSort }) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  // Count Estimated and Actual SP
  const totalEstimated = tasks.reduce(
    (acc, t) => acc + (t["Estimated SP"] || 0),
    0
  );
  const totalActual = tasks.reduce((acc, t) => acc + (t["Actual SP"] || 0), 0);
  // Calculate Percentages
  const calculatePercentages = (tasks, key) => {
    const counts = {};
    tasks.forEach((task) => {
      const val = task[key];
      counts[val] = (counts[val] || 0) + 1;
    });
    const total = tasks.length;
    return Object.entries(counts).map(([val, count]) => ({
      label: val,
      percentage: ((count / total) * 100).toFixed(1),
    }));
  };
  // Loading State
  if (!tasks.length) {
    return (
      <p className="text-white flex items-center gap-2">
        <AiOutlineLoading className="animate-spin text-blue-500 text-3xl" />
        Loading...
      </p>
    );
  }
  // Function to handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    else if (sortConfig.key === key && sortConfig.direction === "desc")
      direction = "";
    setSortConfig({ key, direction });
    onSort && onSort(key, direction);
  };
  // Function to render sort option icon
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    if (sortConfig.direction === "asc")
      return <BiChevronUp className="inline-block ml-1 text-gray-300" />;
    if (sortConfig.direction === "desc")
      return <BiChevronDown className="inline-block ml-1 text-gray-300" />;
    return null;
  };

  return (
    <div className="bg-[#151a30] text-white rounded-xl p-4 shadow-md w-full overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2 min-w-[800px]">
        <thead>
          <tr className="text-gray-400 text-sm select-none">
            <th className="w-8"></th>
            <th
              className="cursor-pointer max-w-[150px] truncate"
              onClick={() => handleSort("title")}
            >
              Task {renderSortIcon("title")}
            </th>
            <th className="max-w-[120px] truncate">Developer</th>
            <th className="max-w-[120px]">Status</th>
            <th
              className="cursor-pointer max-w-[120px]"
              onClick={() => handleSort("priority")}
            >
              Priority {renderSortIcon("priority")}
            </th>
            <th className="max-w-[120px]">Type</th>
            <th className="max-w-[100px]">Date</th>
            <th
              className="cursor-pointer max-w-[100px]"
              onClick={() => handleSort("Estimated SP")}
            >
              Est SP {renderSortIcon("Estimated SP")}
            </th>
            <th
              className="cursor-pointer max-w-[100px]"
              onClick={() => handleSort("Actual SP")}
            >
              Act SP {renderSortIcon("Actual SP")}
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t, i) => (
            <tr
              key={i}
              className="bg-[#1e2440] hover:bg-[#2b3355] transition-all rounded-lg"
            >
              <td className="pl-2 py-2">
                <input type="checkbox" />
              </td>
              <td className="py-2 max-w-[150px] truncate">{t.title}</td>
              <td className="max-w-[120px] truncate">{t.developer}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                    t.status
                  )}`}
                >
                  {t.status}
                </span>
              </td>
              <td>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${getPriorityColor(
                    t.priority
                  )}`}
                >
                  {t.priority}
                </span>
              </td>
              <td>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${getTypeColor(
                    t.type
                  )}`}
                >
                  {t.type}
                </span>
              </td>
              <td>-</td>
              <td>{t["Estimated SP"]} SP</td>
              <td>{t["Actual SP"]} SP</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="text-gray-400 text-sm border-t border-gray-600">
            <td className="pl-2 py-2"></td>
            <td></td>
            <td></td>
            <td colSpan={1}>
              <div className="flex flex-col w-fit gap-1">
                {calculatePercentages(tasks, "status").map((s, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                      s.label
                    )}`}
                  >
                    {s.label} {s.percentage}%
                  </span>
                ))}
              </div>
            </td>
            <td colSpan={1}>
              <div className="flex flex-col w-fit gap-1">
                {calculatePercentages(tasks, "priority").map((p, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${getPriorityColor(
                      p.label
                    )}`}
                  >
                    {p.label} {p.percentage}%
                  </span>
                ))}
              </div>
            </td>
            <td colSpan={1}>
              <div className="flex flex-col w-fit gap-1">
                {calculatePercentages(tasks, "type").map((t, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${getTypeColor(
                      t.label
                    )}`}
                  >
                    {t.label} {t.percentage}%
                  </span>
                ))}
              </div>
            </td>
          </tr>

          <tr className="text-gray-400 text-sm border-t border-gray-600">
            <td className="pl-2 py-2" colSpan={7}>
              Total
            </td>
            <td>{totalEstimated} SP</td>
            <td>{totalActual} SP</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Tabel;
