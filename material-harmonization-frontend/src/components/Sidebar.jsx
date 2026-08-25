function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>MaterialAI</h2>
        <p>National Material Master</p>
      </div>

      <nav className="sidebar-menu">
        <a href="#">Dashboard</a>
        <a href="#">Material Explorer</a>
        <a href="#">AI Matching</a>
        <a href="#">Validation</a>
        <a href="#">National Codes</a>
        <a href="#">Analytics</a>
        <a href="#">Audit Trail</a>
      </nav>

      <div className="sidebar-footer">
        <p>SIH 2026</p>
      </div>
    </div>
  );
}

export default Sidebar;