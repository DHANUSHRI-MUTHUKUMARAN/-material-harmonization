import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getHarmonizationRecommendation,
  addAuditLog,
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
  const [editedRecommendation, setEditedRecommendation] =
    useState(null);

  const [isEditing, setIsEditing] = useState(false);

  // ============================================
  // LOAD AI RECOMMENDATION
  // ============================================

  useEffect(() => {
    const loadRecommendation = async () => {
      try {
        if (matchId) {
          const data =
            await getHarmonizationRecommendation(matchId);

          setRecommendation(data);

          setEditedRecommendation({
            ...data,
          });
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
  // CONFIDENCE-BASED REVIEW POLICY
  // ============================================

  const getReviewPolicy = () => {
    if (similarity >= 95) {
      return {
        level: "Low",
        action: "Fast-Track Review",
        message:
          "High-confidence recommendation. A human validator can perform a quick review before approval.",
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
        "Lower-confidence recommendation. Detailed human validation is required before approval.",
      className: "high-risk",
    };
  };

  const reviewPolicy = getReviewPolicy();

  // ============================================
  // START MODIFY MODE
  // ============================================

  const handleModify = () => {
    setIsEditing(true);
  };

  // ============================================
  // HANDLE FIELD CHANGES
  // ============================================

  const handleChange = (field, value) => {
    setEditedRecommendation((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ============================================
  // SAVE MODIFICATION
  // ============================================

  const handleSaveModification = async () => {
    try {
      setRecommendation({
        ...editedRecommendation,
      });

      await addAuditLog({
        action: "Harmonization Recommendation Modified",
        material:
          editedRecommendation.standardizedDescription,
        materialCode:
          editedRecommendation.nationalCode,
        user: "Material Validation Officer",
        status: "Updated",
      });

      setIsEditing(false);

      alert(
        "Recommendation updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update recommendation:",
        error
      );

      alert(
        "Something went wrong while updating the recommendation."
      );
    }
  };

  // ============================================
  // CANCEL MODIFICATION
  // ============================================

  const handleCancelModification = () => {
    setEditedRecommendation({
      ...recommendation,
    });

    setIsEditing(false);
  };

  // ============================================
  // SEND FOR HUMAN VALIDATION
  // ============================================

  const handleSendForValidation = async () => {
    if (
      !editedRecommendation ||
      !sourceMaterial ||
      !matchedMaterial
    ) {
      alert(
        "Harmonization data is not available."
      );

      return;
    }

    try {
      await addAuditLog({
        action: "Harmonization Sent for Validation",
        material:
          editedRecommendation.standardizedDescription,
        materialCode:
          editedRecommendation.nationalCode,
        user: "AI Matching Engine",
        status: "Generated",
      });

      navigate("/validation", {
        state: {
          sourceMaterial,
          matchedMaterial,
          similarity,
          matchType,
          matchId,
          recommendation: editedRecommendation,
        },
      });
    } catch (error) {
      console.error(
        "Failed to send recommendation for validation:",
        error
      );

      alert(
        "Something went wrong while sending the recommendation for validation."
      );
    }
  };

  // ============================================
  // NO DATA
  // ============================================

  if (!sourceMaterial || !matchedMaterial) {
    return (
      <div className="harmonization-page">
        <div className="validation-empty">
          <h2>
            No harmonization data available
          </h2>

          <p>
            Go to AI Matching and select a material
            to generate a harmonization recommendation.
          </p>

          <button
            className="go-ai-btn"
            onClick={() =>
              navigate("/ai-matching")
            }
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

  if (!recommendation || !editedRecommendation) {
    return (
      <div className="harmonization-page">
        <div className="validation-empty">
          <h2>
            Generating AI Recommendation...
          </h2>

          <p>
            Analyzing material attributes and
            generating the harmonized material identity.
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // UI
  // ============================================

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
            {sourceMaterial.code}
            {" • "}
            {sourceMaterial.cpse}
          </p>
        </div>
      </div>

      {/* RELATED MATERIAL */}

      <div className="related-material">
        <span>
          RELATED MATERIAL
        </span>

        <h3>
          {matchedMaterial.description}
        </h3>

        <p>
          {matchedMaterial.code}
          {" • "}
          {matchedMaterial.cpse}
        </p>
      </div>

      {/* AI RECOMMENDATION */}

      <div className="harmonization-card">

        <div className="harmonization-header">

          <div>
            <h2>
              {isEditing
                ? "Modify Harmonization Recommendation"
                : "AI Harmonization Recommendation"}
            </h2>

            <p>
              {isEditing
                ? "Review and modify the AI-generated recommendation before sending it for human validation."
                : "Generated based on semantic similarity and material attribute analysis."}
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

          {/* STANDARDIZED DESCRIPTION */}

          <div className="recommendation-box">

            <span>
              STANDARDIZED DESCRIPTION
            </span>

            {isEditing ? (
              <input
                type="text"
                value={
                  editedRecommendation.standardizedDescription
                }
                onChange={(e) =>
                  handleChange(
                    "standardizedDescription",
                    e.target.value
                  )
                }
              />
            ) : (
              <strong>
                {recommendation.standardizedDescription}
              </strong>
            )}

          </div>

          {/* EXTRACTED ATTRIBUTES */}

          <div className="recommendation-box">

            <span>
              EXTRACTED ATTRIBUTES
            </span>

            <ul>
              {editedRecommendation.attributes.map(
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

            {isEditing ? (
              <input
                type="text"
                value={
                  editedRecommendation.classification
                }
                onChange={(e) =>
                  handleChange(
                    "classification",
                    e.target.value
                  )
                }
              />
            ) : (
              <strong>
                {recommendation.classification}
              </strong>
            )}

          </div>

          {/* NATIONAL MATERIAL CODE */}

          <div className="recommendation-box national-code">

            <span>
              PROPOSED NATIONAL MATERIAL CODE
            </span>

            {isEditing ? (
              <input
                type="text"
                value={
                  editedRecommendation.nationalCode
                }
                onChange={(e) =>
                  handleChange(
                    "nationalCode",
                    e.target.value
                  )
                }
              />
            ) : (
              <strong>
                {recommendation.nationalCode}
              </strong>
            )}

            <p>
              Proposed for the harmonized material identity.
            </p>

          </div>

          {/* RISK LEVEL */}

          {isEditing && (
            <div className="recommendation-box">

              <span>
                RISK LEVEL
              </span>

              <select
                value={
                  editedRecommendation.riskLevel
                }
                onChange={(e) =>
                  handleChange(
                    "riskLevel",
                    e.target.value
                  )
                }
              >
                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>

            </div>
          )}

        </div>

      </div>

      {/* REVIEW POLICY */}

      <div
        className={`review-policy ${reviewPolicy.className}`}
      >
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
            Material descriptions show strong
            semantic similarity.
          </li>

          <li>
            Technical attributes indicate an
            equivalent material configuration.
          </li>

          <li>
            Cross-CPSE material records were grouped
            into a harmonization cluster.
          </li>

          <li>
            A standardized description and
            classification were generated from the
            identified attributes.
          </li>
        </ul>

      </div>

      {/* ACTIONS */}

      <div className="harmonization-actions">

        {isEditing ? (
          <>
            <button
              className="approve-harmonization-btn"
              onClick={handleSaveModification}
            >
              ✓ Save Changes
            </button>

            <button
              className="reject-harmonization-btn"
              onClick={handleCancelModification}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="approve-harmonization-btn"
              onClick={handleSendForValidation}
            >
              Send for Human Validation →
            </button>

            <button
              className="modify-harmonization-btn"
              onClick={handleModify}
            >
              ✎ Modify Recommendation
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default HarmonizationRecommendation;