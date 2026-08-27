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
    similarity,
    matchType,
    matchId,
  } = location.state || {};

  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const loadRecommendation = async () => {
      if (matchId) {
        const data =
          await getHarmonizationRecommendation(matchId);

        setRecommendation(data);
      }
    };

    loadRecommendation();
  }, [matchId]);

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

  if (!recommendation) {
    return (
      <div className="harmonization-page">
        <div className="validation-empty">
          <h2>Generating AI Recommendation...</h2>

          <p>
            Analyzing material attributes and generating the harmonized
            material identity.
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

          <h1>{sourceMaterial.description}</h1>

          <p>
            {sourceMaterial.code} • {sourceMaterial.cpse}
          </p>
        </div>
      </div>

      {/* RELATED MATERIAL */}

      <div className="related-material">
        <span>RELATED MATERIAL</span>

        <h3>{matchedMaterial.description}</h3>

        <p>
          {matchedMaterial.code} • {matchedMaterial.cpse}
        </p>
      </div>

      {/* AI RECOMMENDATION */}

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
            <strong>{similarity}%</strong>

            <span>AI Confidence</span>
          </div>
        </div>

        <div className="recommendation-grid">

          {/* STANDARDIZED DESCRIPTION */}

          <div className="recommendation-box">
            <span>STANDARDIZED DESCRIPTION</span>

            <strong>
              {recommendation.standardizedDescription}
            </strong>
          </div>

          {/* ATTRIBUTES */}

          <div className="recommendation-box">
            <span>EXTRACTED ATTRIBUTES</span>

            <ul>
              {recommendation.attributes.map(
                (attribute, index) => (
                  <li key={index}>{attribute}</li>
                )
              )}
            </ul>
          </div>

          {/* CLASSIFICATION */}

          <div className="recommendation-box">
            <span>RECOMMENDED CLASSIFICATION</span>

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

      {/* METRICS */}

      <div className="recommendation-metrics">

        <div className="metric-box">
          <span>AI Match Confidence</span>

          <strong>{similarity}%</strong>
        </div>

        <div className="metric-box">
          <span>Match Type</span>

          <strong>{matchType}</strong>
        </div>

        <div className="metric-box">
          <span>Risk Level</span>

          <strong>
            {recommendation.riskLevel}
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