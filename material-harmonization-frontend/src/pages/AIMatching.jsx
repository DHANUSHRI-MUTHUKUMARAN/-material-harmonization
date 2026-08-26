import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AIMatching() {
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const navigate = useNavigate();

  const materials = [
    {
      id: 1,
      code: "CPCL-VAL-1023",
      description: "SS Ball Valve 2 Inch",
      cpse: "CPCL",
    },
    {
      id: 2,
      code: "BHEL-CAB-890",
      description: "Copper Cable 10 Sqmm",
      cpse: "BHEL",
    },
  ];

  const matches = {
    1: [
      {
        code: "ONGC-V-4567",
        description: "Stainless Steel Ball Valve 50mm",
        cpse: "ONGC",
        confidence: 94,
        matchType: "Near Duplicate",
        reasons: [
          "Same material type: Ball Valve",
          "Same material: Stainless Steel",
          "Equivalent size: 2 Inch ≈ 50 mm",
        ],
      },
      {
        code: "BHEL-V-245",
        description: "SS Ball Valve DN50",
        cpse: "BHEL",
        confidence: 91,
        matchType: "Functionally Equivalent",
        reasons: [
          "Same material type",
          "Equivalent nominal size",
          "Similar technical specification",
        ],
      },
    ],

    2: [
      {
        code: "ONGC-CAB-3321",
        description: "Cu Electrical Cable 10mm²",
        cpse: "ONGC",
        confidence: 96,
        matchType: "Near Duplicate",
        reasons: [
          "Copper and Cu represent the same material",
          "Same cross-sectional area",
          "Same electrical cable category",
        ],
      },
    ],
  };

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
          <p>Choose a material to analyze potential matches.</p>

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
                {matches[selectedMaterial]?.map((match, index) => (
                  <div className="ai-match-card" key={index}>
                    <div className="match-top">
                      <div>
                        <h3>{match.description}</h3>

                        <p>
                          {match.code} • {match.cpse}
                        </p>
                      </div>

                      <div className="confidence-score">
                        {match.confidence}%
                      </div>
                    </div>

                    <div className="match-type">
                      {match.matchType}
                    </div>

                    <div className="match-reasons">
                      <h4>Why did AI match this?</h4>

                      <ul>
                        {match.reasons.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="match-actions">
                      <button
                        className="review-btn"
                        onClick={() =>
                            navigate("/validation", {
                            state: {
                                sourceMaterial: materials.find(
                                (material) => material.id === selectedMaterial
                                ),
                                matchedMaterial: match,
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
