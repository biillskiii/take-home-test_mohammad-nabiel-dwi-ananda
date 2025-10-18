import React from "react";
import { FaHome } from "react-icons/fa";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainTable = location.pathname === "/";
  const isKanban = location.pathname === "/kanban";

  return (
    <div>
      <div className="flex items-center gap-x-4">
        <Button
          label="Main Table"
          leftIcon={<FaHome />}
          active={isMainTable}
          transparent={true}
          onClick={() => navigate("/")}
        />
        <Button
          label="Kanban"
          active={isKanban}
          transparent={true}
          onClick={() => navigate("/kanban")}
        />
      </div>
      <hr className="w-full  border-gray-500" />
    </div>
  );
};

export default Navbar;
