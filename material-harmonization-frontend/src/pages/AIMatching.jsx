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

  // Extract unique source materials for the left panel
  const materials = aiMatches.map((match) => ({
    id: match.id,
    code: match.sourceMaterial.code,
    description: match.sourceMaterial.description,
    cpse: match.sourceMaterial.cpse,
  }));

  // Get all matches for the selected source material
  const selectedMatches = aiMatches.filter(
    (match) => match.id === selectedMaterial
  );

  const selectedSourceMaterial = materials.find(
    (material) => material.id === selectedMaterial
  );

  return (
    <div className="ai-matching">
      <div className="page-header">
        <div>
          <h1>AI Material Matching</h1>
          <p>
            Identify identical, duplicate, near-duplicate and functionally
            equivalent materials across CPSEs.
          </p>
        </div>
      </div>

      <div className="matching-layout">

        {/* LEFT PANEL */}

        <div className="material-selection">
          <h2>Select a Material</h2>

          <p>
            Choose a material to analyze potential matches.
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
                Choose a material from the left to view AI-generated
                similarity matches.
              </p>
            </div>
          ) : (
            <>
              <div className="results-header">
                <div>
                  <h2>AI Match Recommendations</h2>

                  <p>
                    Potential equivalent materials identified across CPSEs.
                  </p>
                </div>

                <span className="ai-status">
                  AI Analysis Complete
                </span>
              </div>

              <div className="match-results-list">

                {selectedMatches.map((match) => (
                  <div className="ai-match-card" key={match.id}>

                    <div className="match-top">
                      <div>
                        <h3>
                          {match.matchedMaterial.description}
                        </h3>

                        <p>
                          {match.matchedMaterial.code} •{" "}
                          {match.matchedMaterial.cpse}
                        </p>
                      </div>

                      <div className="confidence-score">
                        {match.similarity}%
                      </div>
                    </div>

                    <div className="match-type">
                      {match.matchType}
                    </div>

                    <div className="match-reasons">
                      <h4>AI Match Details</h4>

                      <ul>
                        <li>
                          Similarity score calculated using material
                          descriptions and specifications.
                        </li>

                        <li>
                          Match classified as {match.matchType}.
                        </li>

                        <li>
                          Cross-CPSE material comparison completed.
                        </li>
                      </ul>
                    </div>

                    <div className="match-actions">

                      <button
                        className="review-btn"
                        onClick={() =>
                          navigate("/validation", {
                            state: {
                              sourceMaterial:
                                selectedSourceMaterial,
                              matchedMaterial:
                                match.matchedMaterial,
                              similarity:
                                match.similarity,
                              matchType:
                                match.matchType,
                            },
                          })
                        }
                      >
                        Send for Validation
                      </button>

                      <button className="details-btn">
                        View Details
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default AIMatching;