import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  } = location.state || {};

  const [status, setStatus] = useState("Pending");
  const [recommendation, setRecommendation] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  /* LOAD AI RECOMMENDATION */

  useEffect(() => {
    const loadRecommendation = async () => {
      try {
        if (matchId) {
          const data = await getHarmonizationRecommendation(matchId);

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

  /* APPROVE */

  const handleApprove = async () => {
    if (!recommendation) {
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

  /* MODIFY */

  const handleModify = () => {
    alert(
      "Modify recommendation feature will be implemented here."
    );
  };

  /* REJECT */

  const handleReject = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this harmonization recommendation?"
    );

    if (confirmed) {
      setStatus("Rejected");
    }
  };

  /* NO DATA */

  if (!sourceMaterial || !matchedMaterial || !matchId) {
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

  /* LOADING */

  if (!recommendation) {
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

  return (
    <div className="validation-page">

      {/* HEADER */}

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


      {/* HARMONIZATION CLUSTER */}

      <div className="harmonization-cluster">

        <div className="section-title">
          Harmonization Cluster
        </div>

        <div className="cluster-materials">

          {/* SOURCE */}

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


      {/* AI RECOMMENDATION */}

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

            <h3>
              {recommendation.standardizedDescription}
            </h3>

          </div>


          {/* EXTRACTED ATTRIBUTES */}

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


          {/* CLASSIFICATION */}

          <div className="recommendation-card">

            <span>
              RECOMMENDED CLASSIFICATION
            </span>

            <h3>
              {recommendation.classification}
            </h3>

          </div>


          {/* NATIONAL CODE */}

          <div className="recommendation-card national-code-card">

            <span>
              PROPOSED NATIONAL MATERIAL CODE
            </span>

            <h2>
              {recommendation.nationalCode}
            </h2>

            <p>
              Generated for the harmonized material identity.
            </p>

          </div>

        </div>

      </div>


      {/* CONFIDENCE AND RISK */}

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
            {recommendation.riskLevel}
          </strong>

        </div>

      </div>


      {/* AI EXPLANATION */}

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


      {/* HUMAN GOVERNANCE ACTIONS */}

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

        </div>

      ) : (

        <div className="validation-result">

          <h3>
            Harmonization {status}
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