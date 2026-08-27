import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getHarmonizationRecommendation,
  approveHarmonization,
  addAuditLog,
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
  } = location.state || {};

  const [status, setStatus] = useState("Pending");

  const [recommendation, setRecommendation] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [editedRecommendation, setEditedRecommendation] =
    useState(null);

  /* ============================================
     LOAD AI RECOMMENDATION
  ============================================ */

  useEffect(() => {
    const loadRecommendation = async () => {
      try {
        if (matchId) {
          const data =
            await getHarmonizationRecommendation(matchId);

          setRecommendation(data);

          setEditedRecommendation({
            ...data,
            attributes: [...data.attributes],
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


  /* ============================================
     APPROVE HARMONIZATION
  ============================================ */

  const handleApprove = async () => {
    if (
      !editedRecommendation ||
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
        editedRecommendation
      );

      setStatus("Approved");

      alert(
        "Harmonization approved successfully. National Material Code has been created or reused for this material."
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
      setIsProcessing(false);
    }
  };


  /* ============================================
     MODIFY RECOMMENDATION
  ============================================ */

  const handleModify = () => {
    setIsEditing(true);
  };


  /* ============================================
     SAVE MODIFIED RECOMMENDATION
  ============================================ */

  const handleSaveModification = () => {
    if (!editedRecommendation) {
      return;
    }

    setRecommendation({
      ...editedRecommendation,
    });

    setIsEditing(false);

    alert(
      "Modified harmonization recommendation saved successfully."
    );
  };


  /* ============================================
     CANCEL MODIFICATION
  ============================================ */

  const handleCancelModification = () => {
    setEditedRecommendation({
      ...recommendation,
      attributes: [...recommendation.attributes],
    });

    setIsEditing(false);
  };


  /* ============================================
     UPDATE ATTRIBUTE
  ============================================ */

  const handleAttributeChange = (index, value) => {
    const updatedAttributes = [
      ...editedRecommendation.attributes,
    ];

    updatedAttributes[index] = value;

    setEditedRecommendation({
      ...editedRecommendation,
      attributes: updatedAttributes,
    });
  };


  /* ============================================
     REJECT HARMONIZATION
  ============================================ */

  const handleReject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this harmonization recommendation?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsProcessing(true);

      await addAuditLog({
        action: "Harmonization Rejected",

        material:
          recommendation.standardizedDescription,

        materialCode:
          recommendation.nationalCode,

        user:
          "Material Validation Officer",

        status:
          "Rejected",
      });

      setStatus("Rejected");

      alert(
        "Harmonization recommendation rejected successfully."
      );

    } catch (error) {
      console.error(
        "Failed to reject harmonization:",
        error
      );

      alert(
        "Something went wrong while rejecting the harmonization."
      );

    } finally {
      setIsProcessing(false);
    }
  };


  /* ============================================
     NO DATA
  ============================================ */

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
              Review AI-generated material harmonization
              recommendations.
            </p>
          </div>
        </div>

        <div className="validation-empty">

          <h2>
            No harmonization recommendation selected
          </h2>

          <p>
            Select a material and generate an AI harmonization
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


  /* ============================================
     LOADING
  ============================================ */

  if (!recommendation || !editedRecommendation) {
    return (
      <div className="validation-page">

        <div className="validation-empty">

          <h2>
            Loading AI Recommendation...
          </h2>

          <p>
            Retrieving the harmonization recommendation and
            material attributes.
          </p>

        </div>

      </div>
    );
  }


  /* ============================================
     MAIN UI
  ============================================ */

  return (
    <div className="validation-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="page-header">

        <div>

          <h1>
            AI Harmonization Review
          </h1>

          <p>
            Review the complete AI-generated harmonization
            recommendation before approval.
          </p>

        </div>

        <span
          className={`validation-status ${status.toLowerCase()}`}
        >
          {status}
        </span>

      </div>


      {/* ========================================
          HARMONIZATION CLUSTER
      ======================================== */}

      <div className="harmonization-cluster">

        <div className="section-title">
          Harmonization Cluster
        </div>

        <div className="cluster-materials">

          {/* SOURCE MATERIAL */}

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


          {/* AI CLUSTER */}

          <div className="cluster-arrow">

            AI

            <br />

            CLUSTER

          </div>


          {/* RELATED MATERIAL */}

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


      {/* ========================================
          AI RECOMMENDATION
      ======================================== */}

      <div className="harmonization-recommendation">

        <div className="recommendation-header">

          <div>

            <h2>
              AI Harmonization Recommendation
            </h2>

            <p>
              Generated based on semantic similarity and
              material attribute analysis.
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


          {/* STANDARDIZED DESCRIPTION */}

          <div className="recommendation-card">

            <span>
              STANDARDIZED DESCRIPTION
            </span>

            {isEditing ? (

              <input
                type="text"
                value={
                  editedRecommendation.standardizedDescription
                }
                onChange={(event) =>
                  setEditedRecommendation({
                    ...editedRecommendation,
                    standardizedDescription:
                      event.target.value,
                  })
                }
              />

            ) : (

              <h3>
                {recommendation.standardizedDescription}
              </h3>

            )}

          </div>


          {/* EXTRACTED ATTRIBUTES */}

          <div className="recommendation-card">

            <span>
              EXTRACTED ATTRIBUTES
            </span>

            {isEditing ? (

              <div>

                {editedRecommendation.attributes.map(
                  (attribute, index) => (

                    <input
                      key={index}
                      type="text"
                      value={attribute}
                      onChange={(event) =>
                        handleAttributeChange(
                          index,
                          event.target.value
                        )
                      }
                    />

                  )
                )}

              </div>

            ) : (

              <ul>

                {recommendation.attributes.map(
                  (attribute, index) => (

                    <li key={index}>
                      {attribute}
                    </li>

                  )
                )}

              </ul>

            )}

          </div>


          {/* CLASSIFICATION */}

          <div className="recommendation-card">

            <span>
              RECOMMENDED CLASSIFICATION
            </span>

            {isEditing ? (

              <input
                type="text"
                value={
                  editedRecommendation.classification
                }
                onChange={(event) =>
                  setEditedRecommendation({
                    ...editedRecommendation,
                    classification:
                      event.target.value,
                  })
                }
              />

            ) : (

              <h3>
                {recommendation.classification}
              </h3>

            )}

          </div>


          {/* NATIONAL MATERIAL CODE */}

          <div className="recommendation-card national-code-card">

            <span>
              PROPOSED NATIONAL MATERIAL CODE
            </span>

            <h2>
              {editedRecommendation.nationalCode}
            </h2>

            <p>
              Generated for the harmonized material identity.
            </p>

          </div>

        </div>

      </div>


      {/* ========================================
          CONFIDENCE AND RISK
      ======================================== */}

      <div className="confidence-section">

        <div>

          <span>
            AI Match Confidence
          </span>

          <strong>
            {similarity}%
          </strong>

        </div>


        <div>

          <span>
            Match Type
          </span>

          <strong>
            {matchType}
          </strong>

        </div>


        <div>

          <span>
            Risk Level
          </span>

          <strong>
            {editedRecommendation.riskLevel}
          </strong>

        </div>

      </div>


      {/* ========================================
          AI EXPLANATION
      ======================================== */}

      <div className="validation-reasons">

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


      {/* ========================================
          HUMAN GOVERNANCE ACTIONS
      ======================================== */}

      {status === "Pending" && (

        <div className="validation-actions">

          {!isEditing ? (

            <>

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
                className="details-btn"
                onClick={handleModify}
                disabled={isProcessing}
              >
                ✎ Modify Recommendation
              </button>


              <button
                className="reject-btn"
                onClick={handleReject}
                disabled={isProcessing}
              >
                ✕ Reject Recommendation
              </button>

            </>

          ) : (

            <>

              <button
                className="approve-btn"
                onClick={handleSaveModification}
              >
                ✓ Save Changes
              </button>


              <button
                className="reject-btn"
                onClick={handleCancelModification}
              >
                Cancel
              </button>

            </>

          )}

        </div>

      )}


      {/* ========================================
          RESULT AFTER REJECTION
      ======================================== */}

      {status === "Rejected" && (

        <div className="validation-result">

          <h3>
            Harmonization Rejected
          </h3>

          <p>
            The governance decision has been recorded for
            this AI-generated harmonization recommendation.
          </p>

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