import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>MaterialAI</h2>
        <p>National Material Master</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/materials">
          Material Explorer
        </NavLink>

        <NavLink to="/ai-matching">
          AI Matching
        </NavLink>

        <NavLink to="/validation">
          Validation
        </NavLink>

        <NavLink to="/national-codes">
          National Codes
        </NavLink>

        <NavLink to="/analytics">
          Analytics
        </NavLink>

        <NavLink to="/audit-trail">
          Audit Trail
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p>SIH 2026</p>
      </div>
    </div>
  );
}

export default Sidebar;