import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getHarmonizationRecommendation,
  approveHarmonization,
} from "../services/materialService";

function Validation() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    sourceMaterial,
    matchedMaterial,
    similarity = 0,
    matchType = "Potential Match",
    matchId,
    recommendation: passedRecommendation,
  } = location.state || {};

  const [status, setStatus] = useState("Pending");
  const [recommendation, setRecommendation] =
    useState(passedRecommendation || null);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadRecommendation = async () => {
      if (recommendation) {
        return;
      }

      try {
        if (matchId) {
          const data =
            await getHarmonizationRecommendation(matchId);

          setRecommendation(data);
        }
      } catch (error) {
        console.error(
          "Failed to load recommendation:",
          error
        );
      }
    };

    loadRecommendation();
  }, [matchId, recommendation]);

  const handleApprove = async () => {
    if (
      !recommendation ||
      !sourceMaterial ||
      !matchedMaterial
    ) {
      alert("Recommendation data is not available.");
      return;
    }

    try {
      setIsProcessing(true);

      await approveHarmonization(
        sourceMaterial,
        matchedMaterial,
        recommendation
      );

      setStatus("Approved");

      setTimeout(() => {
        navigate("/national-codes");
      }, 700);

    } catch (error) {
      console.error(
        "Failed to approve harmonization:",
        error
      );

      alert(
        "Something went wrong while approving the harmonization."
      );

    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this harmonization recommendation?"
    );

    if (confirmed) {
      setStatus("Rejected");
    }
  };

  if (
    !sourceMaterial ||
    !matchedMaterial ||
    !matchId
  ) {
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

          <h2>
            No harmonization recommendation selected
          </h2>

          <p>
            Select a material and generate a harmonization
            recommendation first.
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

  if (!recommendation) {
    return (
      <div className="validation-page">

        <div className="validation-empty">

          <h2>
            Loading AI Recommendation...
          </h2>

          <p>
            Retrieving the harmonization recommendation.
          </p>

        </div>

      </div>
    );
  }

  const interventionText =
    similarity >= 85
      ? "Partial Human Review"
      : "Full Human Validation";

  return (
    <div className="validation-page">

      <div className="page-header">

        <div>

          <h1>
            AI Harmonization Review
          </h1>

          <p>
            {interventionText} is required before issuing the
            National Material Code.
          </p>

        </div>

        <span
          className={`validation-status ${status.toLowerCase()}`}
        >
          {status}
        </span>

      </div>

      <div className="harmonization-cluster">

        <div className="section-title">
          Harmonization Cluster
        </div>

        <div className="cluster-materials">

          <div className="cluster-material">

            <span className="cluster-tag">
              SOURCE
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
            CLUSTER
          </div>

          <div className="cluster-material">

            <span className="cluster-tag">
              RELATED MATERIAL
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
              AI Harmonization Recommendation
            </h2>

            <p>
              Review the AI-generated standardized material identity.
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
              EXTRACTED ATTRIBUTES
            </span>

            <ul>
              {recommendation.attributes.map(
                (attribute, index) => (
                  <li key={index}>
                    {attribute}
                  </li>
                )
              )}
            </ul>

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

          </div>

        </div>

      </div>

      <div className="confidence-section">

        <div>
          <span>AI Match Confidence</span>

          <strong>
            {similarity}%
          </strong>
        </div>

        <div>
          <span>Match Type</span>

          <strong>
            {matchType}
          </strong>
        </div>

        <div>
          <span>Required Intervention</span>

          <strong>
            {interventionText}
          </strong>
        </div>

      </div>

      {status === "Pending" ? (

        <div className="validation-actions">

          <button
            className="approve-btn"
            onClick={handleApprove}
            disabled={isProcessing}
          >
            {isProcessing
              ? "Approving..."
              : "✓ Approve Harmonization"}
          </button>

          <button
            className="reject-btn"
            onClick={handleReject}
            disabled={isProcessing}
          >
            ✕ Reject Recommendation
          </button>

        </div>

      ) : (

        <div className="validation-result">

          <h3>
            Harmonization {status}
          </h3>

          <button
            className="go-ai-btn"
            onClick={() => navigate("/ai-matching")}
          >
            Back to AI Matching
          </button>

        </div>

      )}

    </div>
  );
}

export default Validation;