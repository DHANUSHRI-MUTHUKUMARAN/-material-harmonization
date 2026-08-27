import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Validation() {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Pending");

  // Data coming from AI Harmonization page
  const sourceMaterial = location.state?.sourceMaterial;
  const matchedMaterial = location.state?.matchedMaterial;

  const similarity = location.state?.similarity ?? 0;
  const matchType = location.state?.matchType ?? "Potential Match";

  // No material selected
  if (!sourceMaterial || !matchedMaterial) {
    return (
      <div className="validation-page">
        <div className="page-header">
          <div>
            <h1>AI Harmonization Review</h1>
            <p>
              Review AI-generated material harmonization recommendations.
            </p>
          </div>
        </div>

        <div className="validation-empty">
          <h2>No harmonization recommendation selected</h2>

          <p>
            Select a material and generate an AI harmonization
            recommendation first.
          </p>

          <button
            className="go-ai-btn"
            onClick={() => navigate("/ai-matching")}
          >
            Go to AI Harmonization
          </button>
        </div>
      </div>
    );
  }

  // AI-generated recommendation
  const standardizedDescription =
    "Stainless Steel Ball Valve, DN50 / 2 Inch";

  const classification =
    "Valves → Ball Valves → Stainless Steel";

  const proposedNationalCode =
    "NMC-VAL-SS-BALL-0001";

  const riskLevel =
    similarity >= 95
      ? "Low"
      : similarity >= 75
      ? "Medium"
      : "High";

  const handleApprove = () => {
    setStatus("Approved");

    setTimeout(() => {
      navigate("/national-codes", {
        state: {
          sourceMaterial,
          matchedMaterial,
          standardizedDescription,
          classification,
          proposedNationalCode,
        },
      });
    }, 800);
  };

  const handleReject = () => {
    setStatus("Rejected");
  };

  return (
    <div className="validation-page">

      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>AI Harmonization Review</h1>

          <p>
            Review the complete AI-generated harmonization recommendation.
          </p>
        </div>

        <span
          className={`validation-status ${status.toLowerCase()}`}
        >
          {status}
        </span>
      </div>


      {/* HARMONIZATION CLUSTER */}

      <div className="harmonization-cluster">

        <div className="section-title">
          Harmonization Cluster
        </div>

        <div className="cluster-materials">

          <div className="cluster-material">
            <span className="cluster-tag">SOURCE</span>

            <h3>{sourceMaterial.description}</h3>

            <p>
              {sourceMaterial.code} • {sourceMaterial.cpse}
            </p>
          </div>

          <div className="cluster-arrow">
            AI
            <br />
            CLUSTER
          </div>

          <div className="cluster-material">
            <span className="cluster-tag">
              RELATED MATERIAL
            </span>

            <h3>{matchedMaterial.description}</h3>

            <p>
              {matchedMaterial.code} • {matchedMaterial.cpse}
            </p>
          </div>

        </div>

      </div>


      {/* AI RECOMMENDATION */}

      <div className="harmonization-recommendation">

        <div className="recommendation-header">
          <div>
            <h2>AI Harmonization Recommendation</h2>

            <p>
              Generated based on semantic similarity and material
              attribute analysis.
            </p>
          </div>

          <div className="recommendation-confidence">
            {similarity}%
            <span>AI Confidence</span>
          </div>
        </div>


        <div className="recommendation-grid">

          {/* STANDARD DESCRIPTION */}

          <div className="recommendation-card">
            <span>STANDARDIZED DESCRIPTION</span>

            <h3>
              {standardizedDescription}
            </h3>
          </div>


          {/* TECHNICAL ATTRIBUTES */}

          <div className="recommendation-card">
            <span>EXTRACTED ATTRIBUTES</span>

            <ul>
              <li>Material: Stainless Steel</li>
              <li>Type: Ball Valve</li>
              <li>Size: DN50 / 2 Inch</li>
            </ul>
          </div>


          {/* CLASSIFICATION */}

          <div className="recommendation-card">
            <span>RECOMMENDED CLASSIFICATION</span>

            <h3>
              {classification}
            </h3>
          </div>


          {/* NATIONAL CODE */}

          <div className="recommendation-card national-code-card">
            <span>PROPOSED NATIONAL MATERIAL CODE</span>

            <h2>
              {proposedNationalCode}
            </h2>

            <p>
              Generated for the harmonized material identity.
            </p>
          </div>

        </div>

      </div>


      {/* CONFIDENCE & RISK */}

      <div className="confidence-section">

        <div>
          <span>AI Match Confidence</span>

          <strong>{similarity}%</strong>
        </div>

        <div>
          <span>Match Type</span>

          <strong>{matchType}</strong>
        </div>

        <div>
          <span>Risk Level</span>

          <strong>{riskLevel}</strong>
        </div>

      </div>


      {/* AI EXPLANATION */}

      <div className="validation-reasons">

        <h3>Why did AI generate this recommendation?</h3>

        <ul>
          <li>
            Material descriptions show strong semantic similarity.
          </li>

          <li>
            Technical attributes indicate an equivalent material
            configuration.
          </li>

          <li>
            Cross-CPSE material records were grouped into a
            harmonization cluster.
          </li>

          <li>
            A standardized description and classification were
            generated from the identified attributes.
          </li>
        </ul>

      </div>


      {/* HUMAN GOVERNANCE */}

      {status === "Pending" ? (

        <div className="validation-actions">

          <button
            className="approve-btn"
            onClick={handleApprove}
          >
            ✓ Approve Harmonization
          </button>

          <button
            className="details-btn"
          >
            ✎ Modify Recommendation
          </button>

          <button
            className="reject-btn"
            onClick={handleReject}
          >
            ✕ Reject Recommendation
          </button>

        </div>

      ) : (

        <div className="validation-result">

          <h3>
            Harmonization {status}
          </h3>

          <p>
            The governance decision has been recorded for this
            AI-generated harmonization recommendation.
          </p>

          <button
            className="go-ai-btn"
            onClick={() => navigate("/ai-matching")}
          >
            Back to AI Harmonization
          </button>

        </div>

      )}

    </div>
  );
}

export default Validation;