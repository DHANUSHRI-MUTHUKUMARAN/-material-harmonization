import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getValidationMappings,
  updateValidationStatus,
} from "../services/materialService";

function Validation() {
  const location = useLocation();
  const navigate = useNavigate();

  const [validationMappings, setValidationMappings] = useState([]);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const loadValidationMappings = async () => {
      const data = await getValidationMappings();
      setValidationMappings(data);
    };

    loadValidationMappings();
  }, []);

  // Data coming from AI Matching page
  const sourceMaterial = location.state?.sourceMaterial;
  const matchedMaterial = location.state?.matchedMaterial;

  // Get the first validation mapping for service integration
  const currentMapping = validationMappings[0];

  const handleApprove = async () => {
    if (currentMapping) {
      await updateValidationStatus(
        currentMapping.id,
        "Approved"
      );
    }

    setStatus("Approved");

    setTimeout(() => {
      navigate("/national-codes");
    }, 800);
  };

  const handleReject = async () => {
    if (currentMapping) {
      await updateValidationStatus(
        currentMapping.id,
        "Rejected"
      );
    }

    setStatus("Rejected");
  };

  if (!sourceMaterial || !matchedMaterial) {
    return (
      <div className="validation-page">
        <div className="page-header">
          <div>
            <h1>Material Validation</h1>
            <p>
              Review and approve AI-generated material matching
              recommendations.
            </p>
          </div>
        </div>

        <div className="validation-empty">
          <h2>No material selected for validation</h2>
          <p>
            Go to AI Matching and send an AI recommendation for validation.
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

  return (
    <div className="validation-page">
      <div className="page-header">
        <div>
          <h1>Material Validation</h1>
          <p>
            Review the AI recommendation and approve or reject the proposed
            material mapping.
          </p>
        </div>

        <span className={`validation-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="validation-comparison">
        {/* SOURCE MATERIAL */}

        <div className="validation-card">
          <div className="card-label">SOURCE MATERIAL</div>

          <h2>{sourceMaterial.description}</h2>

          <div className="material-info">
            <div>
              <span>Material Code</span>
              <strong>{sourceMaterial.code}</strong>
            </div>

            <div>
              <span>CPSE</span>
              <strong>{sourceMaterial.cpse}</strong>
            </div>
          </div>
        </div>

        {/* AI MATCH */}

        <div className="match-arrow">
          AI
          <br />
          MATCH
        </div>

        <div className="validation-card matched-card">
          <div className="card-label">AI RECOMMENDED MATCH</div>

          <h2>{matchedMaterial.description}</h2>

          <div className="material-info">
            <div>
              <span>Material Code</span>
              <strong>{matchedMaterial.code}</strong>
            </div>

            <div>
              <span>CPSE</span>
              <strong>{matchedMaterial.cpse}</strong>
            </div>

            <div>
              <span>AI Confidence</span>
              <strong>
                {location.state?.similarity ?? matchedMaterial.confidence ?? 0}%
              </strong>
            </div>

            <div>
              <span>Match Type</span>
              <strong>
                {location.state?.matchType ?? matchedMaterial.matchType}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* AI REASONING */}

      <div className="validation-reasons">
        <h3>AI Matching Explanation</h3>

        <ul>
          {matchedMaterial.reasons?.map((reason, index) => (
            <li key={index}>{reason}</li>
          )) || (
            <>
              <li>Material descriptions show strong semantic similarity.</li>
              <li>Technical attributes indicate a potential equivalent material.</li>
              <li>Cross-CPSE AI matching identified this recommendation.</li>
            </>
          )}
        </ul>
      </div>

      {/* ACTIONS */}

      {status === "Pending" ? (
        <div className="validation-actions">
          <button
            className="approve-btn"
            onClick={handleApprove}
          >
            ✓ Approve Mapping
          </button>

          <button
            className="reject-btn"
            onClick={handleReject}
          >
            ✕ Reject Mapping
          </button>
        </div>
      ) : (
        <div className="validation-result">
          <h3>Mapping {status}</h3>

          <p>
            The validation decision has been recorded for this material
            recommendation.
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