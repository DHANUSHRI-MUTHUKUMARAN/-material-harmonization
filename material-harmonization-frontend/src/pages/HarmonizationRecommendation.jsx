import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getHarmonizationRecommendation,
} from "../services/materialService";

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

  useEffect(() => {
    const loadRecommendation = async () => {
      try {
        if (!matchId) {
          setLoading(false);
          return;
        }

        const data =
          await getHarmonizationRecommendation(matchId);

        setRecommendation(data);
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

  const getReviewPolicy = () => {
    if (similarity >= 95) {
      return {
        level: "Low",
        action: "Fast-Track Harmonization",
        message:
          "AI confidence is very high. Material equivalence is automatically accepted. Only the proposed National Material Code requires final approval.",
        className: "low-risk",
      };
    }

    if (similarity >= 85) {
      return {
        level: "Medium",
        action: "Human Review Required",
        message:
          "AI confidence is high, but a human reviewer must verify the harmonization recommendation before approval.",
        className: "medium-risk",
      };
    }

    return {
      level: "High",
      action: "Full Human Validation Required",
      message:
        "AI confidence is below the automatic harmonization threshold. The material attributes, classification, and recommendation require detailed human validation.",
      className: "high-risk",
    };
  };

  const reviewPolicy = getReviewPolicy();

  const handleContinue = () => {
    if (
      !sourceMaterial ||
      !matchedMaterial ||
      !recommendation
    ) {
      alert("Harmonization data is not available.");
      return;
    }

    if (similarity >= 95) {
      navigate("/national-code-approval", {
        state: {
          sourceMaterial,
          matchedMaterial,
          recommendation,
          similarity,
          matchType,
          matchId,
        },
      });

      return;
    }

    navigate("/validation", {
      state: {
        sourceMaterial,
        matchedMaterial,
        recommendation,
        similarity,
        matchType,
        matchId,
      },
    });
  };

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

  if (loading) {
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

  if (!recommendation) {
    return (
      <div className="harmonization-page">
        <div className="validation-empty">
          <h2>Recommendation unavailable</h2>

          <p>
            The AI harmonization recommendation could not be loaded.
          </p>

          <button
            className="go-ai-btn"
            onClick={() => navigate("/ai-matching")}
          >
            Back to AI Matching
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="harmonization-page">

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

      <div className="related-material">
        <span>RELATED MATERIAL</span>

        <h3>
          {matchedMaterial.description}
        </h3>

        <p>
          {matchedMaterial.code} • {matchedMaterial.cpse}
        </p>
      </div>

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

      <div className={`review-policy ${reviewPolicy.className}`}>
        <h3>
          AI Review Policy: {reviewPolicy.action}
        </h3>

        <p>
          {reviewPolicy.message}
        </p>
      </div>

      <div className="recommendation-metrics">

        <div className="metric-box">
          <span>AI Match Confidence</span>

          <strong>
            {similarity}%
          </strong>
        </div>

        <div className="metric-box">
          <span>Match Type</span>

          <strong>
            {matchType}
          </strong>
        </div>

        <div className="metric-box">
          <span>Intervention Level</span>

          <strong>
            {reviewPolicy.level}
          </strong>
        </div>

      </div>

      <div className="ai-explanation">
        <h3>
          Why did AI generate this recommendation?
        </h3>

        <ul>
          <li>
            Material descriptions show strong semantic similarity.
          </li>

          <li>
            Technical attributes indicate an equivalent material configuration.
          </li>

          <li>
            Cross-CPSE material records were grouped into a harmonization cluster.
          </li>

          <li>
            A standardized description and classification were generated
            from the identified attributes.
          </li>
        </ul>
      </div>

      <div className="harmonization-actions">

        <button
          className="approve-harmonization-btn"
          onClick={handleContinue}
        >
          {similarity >= 95
            ? "⚡ Continue to National Code Approval"
            : "Continue to Human Review"}
        </button>

        <button
          className="reject-harmonization-btn"
          onClick={() => navigate("/ai-matching")}
        >
          ✕ Cancel
        </button>

      </div>

    </div>
  );
}

export default HarmonizationRecommendation;