import { useNavigate } from "react-router-dom";

function HarmonizationRecommendation() {
  const navigate = useNavigate();

  const handleApprove = () => {
    alert("Harmonization recommendation approved!");

    setTimeout(() => {
      navigate("/national-codes");
    }, 500);
  };

  const handleModify = () => {
    alert("Modify recommendation feature will open here.");
  };

  const handleReject = () => {
    alert("Harmonization recommendation rejected.");
  };

  return (
    <div className="harmonization-page">
      <div className="page-header">
        <div>
          <p className="cluster-label">Harmonization Cluster</p>

          <h1>SS Ball Valve 2 Inch</h1>

          <p>CPCL-VAL-1023 • CPCL</p>
        </div>
      </div>

      <div className="related-material">
        <span>RELATED MATERIAL</span>

        <h3>Stainless Steel Ball Valve 50mm</h3>

        <p>ONGC-V-4567 • ONGC</p>
      </div>

      <div className="harmonization-card">
        <div className="harmonization-header">
          <div>
            <h2>AI Harmonization Recommendation</h2>

            <p>
              Generated based on semantic similarity and material attribute
              analysis.
            </p>
          </div>

          <div className="ai-confidence">
            <strong>96%</strong>
            <span>AI Confidence</span>
          </div>
        </div>

        <div className="recommendation-grid">
          <div className="recommendation-box">
            <span>STANDARDIZED DESCRIPTION</span>

            <strong>
              Stainless Steel Ball Valve, DN50 / 2 Inch
            </strong>
          </div>

          <div className="recommendation-box">
            <span>EXTRACTED ATTRIBUTES</span>

            <ul>
              <li>Material: Stainless Steel</li>
              <li>Type: Ball Valve</li>
              <li>Size: DN50 / 2 Inch</li>
            </ul>
          </div>

          <div className="recommendation-box">
            <span>RECOMMENDED CLASSIFICATION</span>

            <strong>
              Valves → Ball Valves → Stainless Steel
            </strong>
          </div>

          <div className="recommendation-box national-code">
            <span>PROPOSED NATIONAL MATERIAL CODE</span>

            <strong>NMC-VAL-SS-BALL-0001</strong>

            <p>Generated for the harmonized material identity.</p>
          </div>
        </div>
      </div>

      <div className="recommendation-metrics">
        <div className="metric-box">
          <span>AI Match Confidence</span>
          <strong>96%</strong>
        </div>

        <div className="metric-box">
          <span>Match Type</span>
          <strong>Near Duplicate</strong>
        </div>

        <div className="metric-box">
          <span>Risk Level</span>
          <strong>Low</strong>
        </div>
      </div>

      <div className="ai-explanation">
        <h3>Why did AI generate this recommendation?</h3>

        <ul>
          <li>Material descriptions show strong semantic similarity.</li>
          <li>Technical attributes indicate an equivalent material configuration.</li>
          <li>Cross-CPSE material records were grouped into a harmonization cluster.</li>
          <li>
            A standardized description and classification were generated from
            the identified attributes.
          </li>
        </ul>
      </div>

      <div className="harmonization-actions">
        <button
          className="approve-harmonization-btn"
          onClick={handleApprove}
        >
          ✓ Approve Harmonization
        </button>

        <button
          className="modify-harmonization-btn"
          onClick={handleModify}
        >
          ✎ Modify Recommendation
        </button>

        <button
          className="reject-harmonization-btn"
          onClick={handleReject}
        >
          ✕ Reject Recommendation
        </button>
      </div>
    </div>
  );
}

export default HarmonizationRecommendation;