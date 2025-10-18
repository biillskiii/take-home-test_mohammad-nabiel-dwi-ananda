
const Kanban = ({ col, filteredTasks, i }) => {
  return (
    <div
      key={i}
      className="min-w-[200px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex-shrink-0 rounded-xl bg-[#1e293b] p-4 shadow-md border border-white/10 scroll-snap-align-start"
    >
      <div
        className={`flex items-center justify-between rounded-md ${col.color} px-3 py-2 text-white font-semibold`}
      >
        <span>
          {col.title}{" "}
          <span className="text-white/80 font-normal">
            {filteredTasks.length}
          </span>
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-[#0f172a] p-4 border border-white/10 hover:border-white/30 transition"
            >
              <h3 className="text-white font-medium mb-1">{task.title}</h3>

              <div className="flex flex-wrap gap-2 text-xs text-white/70 mb-2">
                <span className="bg-white/10 px-2 py-1 rounded-md">
                  {task.priority}
                </span>
                <span className="bg-white/10 px-2 py-1 rounded-md">
                  {task.type}
                </span>
                <span className="bg-white/10 px-2 py-1 rounded-md">
                  Est: {task["Estimated SP"]}
                </span>
                <span className="bg-white/10 px-2 py-1 rounded-md">
                  Act SP: {task["Actual SP"]}
                </span>
              </div>

              <p className="text-white/60 text-sm">{task.developer}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-white/40 text-sm italic">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default Kanban;
