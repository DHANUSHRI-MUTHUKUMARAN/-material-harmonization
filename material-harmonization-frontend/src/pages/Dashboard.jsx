function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of the National Unified Material Master</p>
        </div>

        <div className="user-info">
          <span>Admin</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-title">Total Materials</p>
          <h2>12,486</h2>
          <span className="stat-subtitle">Across participating CPSEs</span>
        </div>

        <div className="stat-card">
          <p className="stat-title">Duplicates Detected</p>
          <h2>1,248</h2>
          <span className="stat-subtitle">Potential duplicate materials</span>
        </div>

        <div className="stat-card">
          <p className="stat-title">Pending Validation</p>
          <h2>326</h2>
          <span className="stat-subtitle">Awaiting expert review</span>
        </div>

        <div className="stat-card">
          <p className="stat-title">National Codes</p>
          <h2>8,942</h2>
          <span className="stat-subtitle">Common material identities</span>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Recent AI Match Recommendations</h2>
            <p>Latest materials identified as potential matches</p>
          </div>

          <button>View All</button>
        </div>

        <div className="match-table">
          <div className="table-row table-header">
            <span>Material</span>
            <span>Matched With</span>
            <span>CPSE</span>
            <span>Confidence</span>
            <span>Status</span>
          </div>

          <div className="table-row">
            <span>SS Ball Valve 2 Inch</span>
            <span>Stainless Steel Ball Valve 50mm</span>
            <span>ONGC</span>
            <span className="confidence high">94%</span>
            <span className="status pending">Pending</span>
          </div>

          <div className="table-row">
            <span>Copper Cable 10 Sqmm</span>
            <span>Cu Electrical Cable 10mm²</span>
            <span>BHEL</span>
            <span className="confidence high">91%</span>
            <span className="status approved">Approved</span>
          </div>

          <div className="table-row">
            <span>SS Hex Bolt M10</span>
            <span>Stainless Steel Hexagonal Bolt M10</span>
            <span>CPCL</span>
            <span className="confidence high">96%</span>
            <span className="status pending">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;