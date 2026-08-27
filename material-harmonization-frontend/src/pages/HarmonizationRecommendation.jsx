import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHarmonizationRecommendation } from "../services/materialService";

function HarmonizationRecommendation() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    sourceMaterial,
    matchedMaterial,
    similarity = 0,
    matchType = "Potential Match",
    matchId,
  } = location.state || {};

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================
  // LOAD AI HARMONIZATION RECOMMENDATION
  // ============================================

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
      } finally {
        setLoading(false);
      }
    };

    loadRecommendation();
  }, [matchId]);

  // ============================================
  // CONFIDENCE-BASED REVIEW POLICY
  // ============================================

  const getReviewPolicy = () => {
    if (similarity >= 95) {
      return {
        level: "Minimal",
        action: "Fast-Forward Processing",
        message:
          "This is a high-confidence AI recommendation. Material harmonization can be fast-forwarded, with final human approval required for the proposed National Material Code.",
        className: "low-risk",
      };
    }

    if (similarity >= 85) {
      return {
        level: "Partial",
        action: "Human Review Required",
        message:
          "This recommendation has moderate AI confidence. A human reviewer should verify the harmonization before proceeding.",
        className: "medium-risk",
      };
    }

    return {
      level: "Full",
      action: "Detailed Human Validation Required",
      message:
        "This recommendation has lower AI confidence. Detailed human validation of the material match, attributes, and classification is required.",
      className: "high-risk",
    };
  };

  const reviewPolicy = getReviewPolicy();

  // ============================================
  // CONTINUE BASED ON AI CONFIDENCE
  // ============================================

  const handleContinue = () => {
    if (!recommendation) {
      alert("Harmonization recommendation is not available.");
      return;
    }

    const navigationData = {
      sourceMaterial,
      matchedMaterial,
      similarity,
      matchType,
      matchId,
      recommendation,
    };

    // 95–100%
    // Fast-forward directly to National Code Approval

    if (similarity >= 95) {
      navigate("/national-code-approval", {
        state: navigationData,
      });

      return;
    }

    // 85–94%
    // Standard human review

    if (similarity >= 85) {
      navigate("/validation", {
        state: {
          ...navigationData,
          detailedReview: false,
        },
      });

      return;
    }

    // Below 85%
    // Detailed human validation

    navigate("/validation", {
      state: {
        ...navigationData,
        detailedReview: true,
      },
    });
  };

  // ============================================
  // MODIFY RECOMMENDATION
  // ============================================

  const handleModify = () => {
    alert(
      "Recommendation modification can be performed during the human validation stage."
    );
  };

  // ============================================
  // NO DATA
  // ============================================

  if (!sourceMaterial || !matchedMaterial || !matchId) {
    return (
      <div className="harmonization-page">
        <div className="validation-empty">
          <h2>No harmonization data available</h2>

          <p>
            Go to AI Matching and select a material to generate
            a harmonization recommendation.
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

  if (loading || !recommendation) {
    return (
      <div className="harmonization-page">
        <div className="validation-empty">
          <h2>Generating AI Recommendation...</h2>

          <p>
            Analyzing material attributes and generating
            the harmonized material identity.
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // PAGE
  // ============================================

  return (
    <div className="harmonization-page">

      {/* PAGE HEADER */}

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
              Generated based on semantic similarity and
              material attribute analysis.
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

        {/* RECOMMENDATION DETAILS */}

        <div className="recommendation-grid">

          {/* STANDARDIZED DESCRIPTION */}

          <div className="recommendation-box">
            <span>
              STANDARDIZED DESCRIPTION
            </span>

            <strong>
              {recommendation.standardizedDescription}
            </strong>
          </div>

          {/* ATTRIBUTES */}

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

          {/* CLASSIFICATION */}

          <div className="recommendation-box">
            <span>
              RECOMMENDED CLASSIFICATION
            </span>

            <strong>
              {recommendation.classification}
            </strong>
          </div>

          {/* NATIONAL CODE */}

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

      {/* CONFIDENCE-BASED POLICY */}

      <div
        className={`review-policy ${reviewPolicy.className}`}
      >
        <h3>
          Intervention Level: {reviewPolicy.level}
        </h3>

        <p>
          <strong>
            {reviewPolicy.action}
          </strong>
        </p>

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
            Human Intervention
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
            Technical attributes indicate an equivalent
            material configuration.
          </li>

          <li>
            Cross-CPSE material records were grouped into
            a harmonization cluster.
          </li>

          <li>
            A standardized description and classification
            were generated from the identified attributes.
          </li>
        </ul>

      </div>

      {/* ACTIONS */}

      <div className="harmonization-actions">

        <button
          className="approve-harmonization-btn"
          onClick={handleContinue}
        >
          {similarity >= 95
            ? "⚡ Fast-Forward to National Code Approval"
            : similarity >= 85
            ? "Proceed to Human Review"
            : "Proceed to Detailed Validation"}
        </button>

        {similarity < 95 && (
          <button
            className="modify-harmonization-btn"
            onClick={handleModify}
          >
            ✎ Modify During Review
          </button>
        )}

        <button
          className="reject-harmonization-btn"
          onClick={() => navigate("/ai-matching")}
        >
          ← Back to AI Matching
        </button>

      </div>

    </div>
  );
}

export default HarmonizationRecommendation;