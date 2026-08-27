import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { approveHarmonization } from "../services/materialService";

function NationalCodeApproval() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    sourceMaterial,
    matchedMaterial,
    recommendation,
    similarity = 0,
    matchType = "Near Duplicate",
    matchId,
  } = location.state || {};

  const [isApproving, setIsApproving] = useState(false);

  if (
    !sourceMaterial ||
    !matchedMaterial ||
    !recommendation
  ) {
    return (
      <div className="validation-page">

        <div className="validation-empty">

          <h2>
            No National Code approval data available
          </h2>

          <p>
            Generate a harmonization recommendation first.
          </p>

          <button
            className="go-ai-btn"
            onClick={() => navigate("/ai-matching")}
          >
            Go to AI Matching
          </button>

        </div>

      </div>
    );
  }

  const handleApproveNationalCode = async () => {
    try {
      setIsApproving(true);

      await approveHarmonization(
        sourceMaterial,
        matchedMaterial,
        recommendation
      );

      alert(
        `National Material Code ${recommendation.nationalCode} approved successfully!`
      );

      navigate("/national-codes");

    } catch (error) {
      console.error(
        "National Material Code approval failed:",
        error
      );

      alert(
        "Failed to approve the National Material Code."
      );

    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="validation-page">

      <div className="page-header">

        <div>
          <h1>
            Fast-Track National Code Approval
          </h1>

          <p>
            High-confidence harmonization has been automatically processed.
            Final approval is required only for the National Material Code.
          </p>
        </div>

        <span className="validation-status approved">
          {similarity}% Confidence
        </span>

      </div>

      <div className="review-policy low-risk">

        <h3>
          ⚡ Fast-Track Processing
        </h3>

        <p>
          The AI confidence is {similarity}%, which meets the 95%
          fast-track threshold. The material harmonization is accepted,
          and only the National Material Code requires final approval.
        </p>

      </div>

      <div className="harmonization-cluster">

        <div className="section-title">
          Harmonized Material Cluster
        </div>

        <div className="cluster-materials">

          <div className="cluster-material">

            <span className="cluster-tag">
              SOURCE MATERIAL
            </span>

            <h3>
              {sourceMaterial.description}
            </h3>

            <p>
              {sourceMaterial.code} • {sourceMaterial.cpse}
            </p>

          </div>

          <div className="cluster-arrow">
            AI
            <br />
            MATCH
          </div>

          <div className="cluster-material">

            <span className="cluster-tag">
              MATCHED MATERIAL
            </span>

            <h3>
              {matchedMaterial.description}
            </h3>

            <p>
              {matchedMaterial.code} • {matchedMaterial.cpse}
            </p>

          </div>

        </div>

      </div>

      <div className="harmonization-recommendation">

        <div className="recommendation-header">

          <div>
            <h2>
              Proposed National Material Identity
            </h2>

            <p>
              Automatically generated from the AI harmonization result.
            </p>
          </div>

          <div className="recommendation-confidence">
            {similarity}%

            <span>
              AI Confidence
            </span>
          </div>

        </div>

        <div className="recommendation-grid">

          <div className="recommendation-card">

            <span>
              STANDARDIZED DESCRIPTION
            </span>

            <h3>
              {recommendation.standardizedDescription}
            </h3>

          </div>

          <div className="recommendation-card">

            <span>
              RECOMMENDED CLASSIFICATION
            </span>

            <h3>
              {recommendation.classification}
            </h3>

          </div>

          <div className="recommendation-card national-code-card">

            <span>
              PROPOSED NATIONAL MATERIAL CODE
            </span>

            <h2>
              {recommendation.nationalCode}
            </h2>

            <p>
              This common National Material Code will map all
              equivalent CPSE material records.
            </p>

          </div>

          <div className="recommendation-card">

            <span>
              MATCH TYPE
            </span>

            <h3>
              {matchType}
            </h3>

          </div>

        </div>

      </div>

      <div className="validation-actions">

        <button
          className="approve-btn"
          onClick={handleApproveNationalCode}
          disabled={isApproving}
        >
          {isApproving
            ? "Approving National Code..."
            : "✓ Approve National Material Code"}
        </button>

        <button
          className="reject-btn"
          onClick={() => navigate("/ai-matching")}
          disabled={isApproving}
        >
          ← Back to AI Matching
        </button>

      </div>

    </div>
  );
}

export default NationalCodeApproval;