import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Materials",
      value: "12,480",
      description: "Across participating CPSEs",
    },
    {
      title: "Duplicate Candidates",
      value: "2,184",
      description: "Detected by AI",
    },
    {
      title: "Pending Validation",
      value: "314",
      description: "Require human review",
    },
    {
      title: "National Codes",
      value: "486",
      description: "Successfully harmonized",
    },
  ];

  const activities = [
    {
      title: "AI Match Generated",
      description:
        "SS Ball Valve 2 Inch matched with Stainless Steel Ball Valve 50mm",
      time: "10 minutes ago",
    },
    {
      title: "Material Mapping Approved",
      description:
        "CPCL-VAL-1023 approved for national material harmonization",
      time: "25 minutes ago",
    },
    {
      title: "National Code Generated",
      description:
        "NMC-VAL-0001 generated for Stainless Steel Ball Valve",
      time: "1 hour ago",
    },
    {
      title: "Duplicate Material Detected",
      description:
        "Potential duplicate detected across ONGC and BHEL material records",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Material Harmonization Dashboard</h1>

          <p>
            AI-powered platform for standardizing and harmonizing material
            master data across CPSEs.
          </p>
        </div>

        <button
          className="dashboard-primary-btn"
          onClick={() => navigate("/materials")}
        >
          Explore Materials
        </button>
      </div>

      {/* STATISTICS */}

      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div className="dashboard-stat-card" key={index}>
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
            <span>{stat.description}</span>
          </div>
        ))}
      </div>

      {/* MAIN WORKFLOW */}

      <div className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Material Harmonization Workflow</h2>
            <p>
              Follow the complete process from material discovery to national
              code generation.
            </p>
          </div>
        </div>

        <div className="workflow-grid">
          <div
            className="workflow-card"
            onClick={() => navigate("/materials")}
          >
            <div className="workflow-number">01</div>

            <h3>Material Explorer</h3>

            <p>
              Explore material records from participating CPSEs.
            </p>

            <span>Explore →</span>
          </div>

          <div
            className="workflow-card"
            onClick={() => navigate("/ai-matching")}
          >
            <div className="workflow-number">02</div>

            <h3>AI Matching</h3>

            <p>
              Identify duplicate and functionally equivalent materials.
            </p>

            <span>Match with AI →</span>
          </div>

          <div
            className="workflow-card"
            onClick={() => navigate("/validation")}
          >
            <div className="workflow-number">03</div>

            <h3>Human Validation</h3>

            <p>
              Review and approve AI-generated material mappings.
            </p>

            <span>Review →</span>
          </div>

          <div
            className="workflow-card"
            onClick={() => navigate("/national-codes")}
          >
            <div className="workflow-number">04</div>

            <h3>National Codes</h3>

            <p>
              Generate a common national material code.
            </p>

            <span>Generate →</span>
          </div>
        </div>
      </div>

      {/* BOTTOM GRID */}

      <div className="dashboard-bottom-grid">
        {/* RECENT ACTIVITY */}

        <div className="dashboard-activity-card">
          <div className="dashboard-card-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest actions across the platform.</p>
            </div>

            <button onClick={() => navigate("/audit-trail")}>
              View Audit Trail
            </button>
          </div>

          <div className="dashboard-activity-list">
            {activities.map((activity, index) => (
              <div className="dashboard-activity" key={index}>
                <div className="activity-dot"></div>

                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SYSTEM IMPACT */}

        <div className="dashboard-impact-card">
          <h2>Platform Impact</h2>

          <p>
            Building the foundation for
            <strong> One Nation – One Material Code.</strong>
          </p>

          <div className="dashboard-impact-items">
            <div>
              <h3>4</h3>
              <span>Participating CPSEs</span>
            </div>

            <div>
              <h3>1,542</h3>
              <span>Approved Mappings</span>
            </div>

            <div>
              <h3>486</h3>
              <span>National Codes</span>
            </div>
          </div>

          <button
            className="dashboard-impact-btn"
            onClick={() => navigate("/analytics")}
          >
            View Full Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;