function Analytics() {
  const stats = [
    {
      title: "Total Materials",
      value: "12,480",
      description: "Across participating CPSEs",
    },
    {
      title: "Duplicate Candidates",
      value: "2,184",
      description: "Potential duplicate materials detected",
    },
    {
      title: "AI Matches",
      value: "1,856",
      description: "High-confidence recommendations",
    },
    {
      title: "Approved Mappings",
      value: "1,542",
      description: "Validated by authorized users",
    },
    {
      title: "National Codes",
      value: "486",
      description: "Common material codes generated",
    },
  ];

  const cpseData = [
    {
      name: "CPCL",
      materials: "3,240",
      duplicates: "482",
      mappings: "356",
    },
    {
      name: "ONGC",
      materials: "3,780",
      duplicates: "654",
      mappings: "472",
    },
    {
      name: "BHEL",
      materials: "2,910",
      duplicates: "528",
      mappings: "389",
    },
    {
      name: "SAIL",
      materials: "2,550",
      duplicates: "520",
      mappings: "325",
    },
  ];

  const categories = [
    {
      name: "Valves",
      percentage: 82,
      matches: "426 Matches",
    },
    {
      name: "Electrical",
      percentage: 76,
      matches: "382 Matches",
    },
    {
      name: "Fasteners",
      percentage: 68,
      matches: "295 Matches",
    },
    {
      name: "Pumps",
      percentage: 61,
      matches: "218 Matches",
    },
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1>Material Master Analytics</h1>

          <p>
            Monitor material duplication, AI recommendations, validation
            progress and national code harmonization.
          </p>
        </div>
      </div>

      {/* STATISTICS CARDS */}

      <div className="analytics-stats">
        {stats.map((stat, index) => (
          <div className="analytics-stat-card" key={index}>
            <p>{stat.title}</p>

            <h2>{stat.value}</h2>

            <span>{stat.description}</span>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        {/* CPSE OVERVIEW */}

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h2>CPSE Material Overview</h2>
              <p>Material harmonization progress by organization.</p>
            </div>
          </div>

          <div className="analytics-table">
            <div className="analytics-table-header">
              <span>CPSE</span>
              <span>Materials</span>
              <span>Duplicates</span>
              <span>Approved</span>
            </div>

            {cpseData.map((cpse, index) => (
              <div className="analytics-table-row" key={index}>
                <strong>{cpse.name}</strong>

                <span>{cpse.materials}</span>

                <span className="duplicate-number">
                  {cpse.duplicates}
                </span>

                <span className="approved-number">
                  {cpse.mappings}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI MATCH RATE */}

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h2>AI Matching by Category</h2>
              <p>High-confidence material matches.</p>
            </div>
          </div>

          <div className="category-analytics">
            {categories.map((category, index) => (
              <div className="category-row" key={index}>
                <div className="category-info">
                  <span>{category.name}</span>

                  <span>{category.matches}</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${category.percentage}%`,
                    }}
                  ></div>
                </div>

                <strong>{category.percentage}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMPACT SECTION */}

      <div className="impact-section">
        <h2>Potential Impact</h2>

        <div className="impact-grid">
          <div className="impact-item">
            <h3>↓ 17.5%</h3>
            <p>Potential reduction in duplicate material records</p>
          </div>

          <div className="impact-item">
            <h3>↑ 42%</h3>
            <p>Improvement in cross-CPSE material visibility</p>
          </div>

          <div className="impact-item">
            <h3>486</h3>
            <p>Common national material codes established</p>
          </div>

          <div className="impact-item">
            <h3>4 CPSEs</h3>
            <p>Currently participating in the unified framework</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;