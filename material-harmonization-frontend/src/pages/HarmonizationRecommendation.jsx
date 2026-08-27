import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getHarmonizationRecommendation,
  approveHarmonization,
} from "../services/materialService";

function HarmonizationRecommendation() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    sourceMaterial,
    matchedMaterial,
    similarity,
    matchType,
    matchId,
  } = location.state || {};

  const [recommendation, setRecommendation] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    const loadRecommendation = async () => {
      try {
        if (matchId) {
          const data =
            await getHarmonizationRecommendation(matchId);

          setRecommendation(data);
        }
      } catch (error) {
        console.error(
          "Failed to load harmonization recommendation:",
          error
        );
      }
    };

    loadRecommendation();
  }, [matchId]);

  // ============================================
  // CONFIDENCE-BASED INTERVENTION LOGIC
  // ============================================

  const getReviewPolicy = () => {
    if (similarity >= 95) {
      return {
        level: "Low",
        action: "Fast-Track Approval",
        message:
          "High-confidence, low-risk recommendation. Eligible for fast-track approval.",
        className: "low-risk",
      };
    }

    if (similarity >= 85) {
      return {
        level: "Medium",
        action: "Human Review Recommended",
        message:
          "Moderate-confidence recommendation. Human review is recommended before approval.",
        className: "medium-risk",
      };
    }

    return {
      level: "High",
      action: "Human Validation Required",
      message:
        "Low-confidence or higher-risk recommendation. Detailed human validation is required.",
      className: "high-risk",
    };
  };

  const reviewPolicy = getReviewPolicy();

  // ============================================
  // APPROVE HARMONIZATION
  // ============================================

  const handleApprove = async () => {
    if (!recommendation || !sourceMaterial || !matchedMaterial) {
      alert("Harmonization data is not available.");
      return;
    }

    try {
      setIsApproving(true);

      await approveHarmonization(
        sourceMaterial,
        matchedMaterial,
        recommendation
      );

      alert(
        "Harmonization approved and National Material Code created successfully!"
      );

      navigate("/national-codes");

    } catch (error) {
      console.error(
        "Failed to approve harmonization:",
        error
      );

      alert(
        "Something went wrong while approving the harmonization."
      );

    } finally {
      setIsApproving(false);
    }
  };

  // ============================================
  // MODIFY
  // ============================================

  const handleModify = () => {
    alert(
      "Modify recommendation feature will be implemented here."
    );
  };

  // ============================================
  // REJECT
  // ============================================

  const handleReject = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this harmonization recommendation?"
    );

    if (confirmed) {
      alert("Harmonization recommendation rejected.");

      navigate("/ai-matching");
    }
  };

  // ============================================
  // NO DATA
  // ============================================

  if (!sourceMaterial || !matchedMaterial) {
    return (
      <div className="harmonization-page">
        <div className="validation-empty">

          <h2>No harmonization data available</h2>

          <p>
            Go to AI Matching and select a material to generate a
            harmonization recommendation.
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

  // ============================================
  // LOADING
  // ============================================

  if (!recommendation) {
    return (
      <div className="harmonization-page">
        <div className="validation-empty">

          <h2>Generating AI Recommendation...</h2>

          <p>
            Analyzing material attributes and generating the
            harmonized material identity.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="harmonization-page">

      {/* MATERIAL CLUSTER */}

      <div className="page-header">
        <div>

          <p className="cluster-label">
            Harmonization Cluster
          </p>

          <h1>
            {sourceMaterial.description}
          </h1>

          <p>
            {sourceMaterial.code} • {sourceMaterial.cpse}
          </p>

        </div>
      </div>


      {/* RELATED MATERIAL */}

      <div className="related-material">

        <span>RELATED MATERIAL</span>

        <h3>
          {matchedMaterial.description}
        </h3>

        <p>
          {matchedMaterial.code} • {matchedMaterial.cpse}
        </p>

      </div>


      {/* AI RECOMMENDATION */}

      <div className="harmonization-card">

        <div className="harmonization-header">

          <div>

            <h2>
              AI Harmonization Recommendation
            </h2>

            <p>
              Generated based on semantic similarity and material
              attribute analysis.
            </p>

          </div>

          <div className="ai-confidence">

            <strong>
              {similarity}%
            </strong>

            <span>
              AI Confidence
            </span>

          </div>

        </div>


        <div className="recommendation-grid">

          <div className="recommendation-box">

            <span>
              STANDARDIZED DESCRIPTION
            </span>

            <strong>
              {recommendation.standardizedDescription}
            </strong>

          </div>


          <div className="recommendation-box">

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


          <div className="recommendation-box">

            <span>
              RECOMMENDED CLASSIFICATION
            </span>

            <strong>
              {recommendation.classification}
            </strong>

          </div>


          <div className="recommendation-box national-code">

            <span>
              PROPOSED NATIONAL MATERIAL CODE
            </span>

            <strong>
              {recommendation.nationalCode}
            </strong>

            <p>
              Generated for the harmonized material identity.
            </p>

          </div>

        </div>

      </div>


      {/* CONFIDENCE / REVIEW POLICY */}

      <div className={`review-policy ${reviewPolicy.className}`}>

        <h3>
          AI Review Policy: {reviewPolicy.action}
        </h3>

        <p>
          {reviewPolicy.message}
        </p>

      </div>


      {/* METRICS */}

      <div className="recommendation-metrics">

        <div className="metric-box">

          <span>
            AI Match Confidence
          </span>

          <strong>
            {similarity}%
          </strong>

        </div>


        <div className="metric-box">

          <span>
            Match Type
          </span>

          <strong>
            {matchType}
          </strong>

        </div>


        <div className="metric-box">

          <span>
            Intervention Level
          </span>

          <strong>
            {reviewPolicy.level}
          </strong>

        </div>

      </div>


      {/* AI EXPLANATION */}

      <div className="ai-explanation">

        <h3>
          Why did AI generate this recommendation?
        </h3>

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
            A standardized description and classification were generated
            from the identified attributes.
          </li>

        </ul>

      </div>


      {/* ACTIONS */}

      <div className="harmonization-actions">

        <button
          className="approve-harmonization-btn"
          onClick={handleApprove}
          disabled={isApproving}
        >
          {isApproving
            ? "Processing..."
            : similarity >= 95
            ? "⚡ Fast-Track Approve"
            : "✓ Approve Harmonization"}
        </button>


        <button
          className="modify-harmonization-btn"
          onClick={handleModify}
          disabled={isApproving}
        >
          ✎ Modify Recommendation
        </button>


        <button
          className="reject-harmonization-btn"
          onClick={handleReject}
          disabled={isApproving}
        >
          ✕ Reject Recommendation
        </button>

      </div>

    </div>
  );
}

export default HarmonizationRecommendation;