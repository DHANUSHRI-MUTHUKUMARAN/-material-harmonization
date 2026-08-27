import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAIMatches } from "../services/materialService";

function AIMatching() {
  const [aiMatches, setAiMatches] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadMatches = async () => {
      const data = await getAIMatches();
      setAiMatches(data);
    };

    loadMatches();
  }, []);

  // Source materials available for analysis
  const materials = aiMatches.map((match) => ({
    id: match.id,
    code: match.sourceMaterial.code,
    description: match.sourceMaterial.description,
    cpse: match.sourceMaterial.cpse,
  }));

  // Get the selected AI match record
  const selectedMatch = aiMatches.find(
    (match) => match.id === selectedMaterial
  );

  // Get the selected source material
  const selectedSourceMaterial = materials.find(
    (material) => material.id === selectedMaterial
  );

  return (
    <div className="ai-matching">
      <div className="page-header">
        <div>
          <h1>AI Material Harmonization</h1>

          <p>
            Identify equivalent materials across CPSEs and generate an
            AI-powered harmonization recommendation.
          </p>
        </div>
      </div>

      <div className="matching-layout">

        {/* LEFT PANEL */}

        <div className="material-selection">
          <h2>Select a Material</h2>

          <p>
            Select a material to analyze similar and equivalent records
            across CPSEs.
          </p>

          <div className="material-list">
            {materials.map((material) => (
              <div
                key={material.id}
                className={`material-item ${
                  selectedMaterial === material.id ? "selected" : ""
                }`}
                onClick={() => setSelectedMaterial(material.id)}
              >
                <h3>{material.description}</h3>

                <span>{material.code}</span>

                <div className="material-cpse">
                  {material.cpse}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="matching-results">

          {!selectedMaterial ? (

            <div className="empty-state">
              <h2>Select a material</h2>

              <p>
                Choose a material to start AI-powered cross-CPSE
                harmonization analysis.
              </p>
            </div>

          ) : (

            <>
              <div className="results-header">

                <div>
                  <h2>Harmonization Cluster</h2>

                  <p>
                    AI has identified related material records across
                    participating CPSEs.
                  </p>
                </div>

                <span className="ai-status">
                  AI Analysis Complete
                </span>

              </div>

              {/* SOURCE MATERIAL */}

              {selectedSourceMaterial && (
                <div className="cluster-source-card">

                  <div className="cluster-label">
                    SOURCE MATERIAL
                  </div>

                  <h3>
                    {selectedSourceMaterial.description}
                  </h3>

                  <p>
                    {selectedSourceMaterial.code} •{" "}
                    {selectedSourceMaterial.cpse}
                  </p>

                </div>
              )}

              {/* MATCHED MATERIAL */}

              <div className="match-results-list">

                <div className="cluster-label">
                  AI IDENTIFIED RELATED MATERIALS
                </div>

                {selectedMatch && (
                  <div className="ai-match-card">

                    <div className="match-top">

                      <div>
                        <h3>
                          {selectedMatch.matchedMaterial.description}
                        </h3>

                        <p>
                          {selectedMatch.matchedMaterial.code} •{" "}
                          {selectedMatch.matchedMaterial.cpse}
                        </p>
                      </div>

                      <div className="confidence-score">
                        {selectedMatch.similarity}%
                      </div>

                    </div>

                    <div className="match-type">
                      {selectedMatch.matchType}
                    </div>

                  </div>
                )}

              </div>

              {/* CLUSTER SUMMARY */}

              <div className="cluster-summary">

                <div>
                  <span>Cluster Size</span>

                  <strong>
                    {selectedMatch ? 2 : 1} Materials
                  </strong>
                </div>

                <div>
                  <span>AI Confidence</span>

                  <strong>
                    {selectedMatch?.similarity || 0}%
                  </strong>
                </div>

                <div>
                  <span>Match Type</span>

                  <strong>
                    {selectedMatch?.matchType || "No Match"}
                  </strong>
                </div>

              </div>

              {/* MAIN ACTION */}

              {selectedMatch && selectedSourceMaterial && (
                <div className="harmonization-action">

                  <button
                    className="review-btn"
                    onClick={() =>
                      navigate("/harmonization-recommendation", {
                        state: {
                          sourceMaterial: selectedSourceMaterial,
                          matchedMaterial:
                            selectedMatch.matchedMaterial,
                          similarity:
                            selectedMatch.similarity,
                          matchType:
                            selectedMatch.matchType,
                        },
                      })
                    }
                  >
                    Generate Harmonization Recommendation →
                  </button>

                  <p>
                    AI will generate a standardized description,
                    classification, and proposed National Material Code.
                  </p>

                </div>
              )}

            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default AIMatching;