import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAIMatches } from "../services/materialService";

function AIMatching() {
  const [aiMatches, setAiMatches] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ============================================
     LOAD AI MATCHES
  ============================================ */

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);

        const data = await getAIMatches();

        setAiMatches(data || []);

      } catch (error) {
        console.error(
          "Failed to load AI matches:",
          error
        );

      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);


  /* ============================================
     SOURCE MATERIALS
  ============================================ */

  const materials = aiMatches.map((match) => ({
    id: match.id,

    code: match.sourceMaterial.code,

    description:
      match.sourceMaterial.description,

    cpse:
      match.sourceMaterial.cpse,
  }));


  /* ============================================
     SELECTED AI MATCH
  ============================================ */

  const selectedMatch = aiMatches.find(
    (match) =>
      match.id === selectedMaterial
  );


  /* ============================================
     SELECTED SOURCE MATERIAL
  ============================================ */

  const selectedSourceMaterial =
    materials.find(
      (material) =>
        material.id === selectedMaterial
    );


  /* ============================================
     GO TO VALIDATION
  ============================================ */

  const handleGenerateRecommendation = () => {
    if (
      !selectedMatch ||
      !selectedSourceMaterial
    ) {
      alert(
        "Please select a material first."
      );

      return;
    }

    navigate("/validation", {
      state: {
        sourceMaterial:
          selectedSourceMaterial,

        matchedMaterial:
          selectedMatch.matchedMaterial,

        similarity:
          selectedMatch.similarity,

        matchType:
          selectedMatch.matchType,

        matchId:
          selectedMatch.id,
      },
    });
  };


  /* ============================================
     LOADING
  ============================================ */

  if (loading) {
    return (
      <div className="ai-matching">

        <div className="page-header">

          <div>

            <h1>
              AI Material Harmonization
            </h1>

            <p>
              Identifying equivalent materials across CPSEs.
            </p>

          </div>

        </div>


        <div className="empty-state">

          <h2>
            Loading AI Matches...
          </h2>

          <p>
            Retrieving material similarity
            recommendations.
          </p>

        </div>

      </div>
    );
  }


  /* ============================================
     MAIN UI
  ============================================ */

  return (
    <div className="ai-matching">


      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="page-header">

        <div>

          <h1>
            AI Material Harmonization
          </h1>

          <p>
            Identify equivalent materials across CPSEs and
            generate an AI-powered harmonization
            recommendation.
          </p>

        </div>

      </div>


      {/* ========================================
          MAIN LAYOUT
      ======================================== */}

      <div className="matching-layout">


        {/* ======================================
            LEFT PANEL
        ====================================== */}

        <div className="material-selection">

          <h2>
            Select a Material
          </h2>

          <p>
            Select a material to analyze similar and
            equivalent records across CPSEs.
          </p>


          <div className="material-list">

            {materials.length === 0 ? (

              <div className="empty-state">

                <p>
                  No AI matches available.
                </p>

              </div>

            ) : (

              materials.map(
                (material) => (

                  <div
                    key={material.id}
                    className={`material-item ${
                      selectedMaterial === material.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedMaterial(
                        material.id
                      )
                    }
                  >

                    <h3>
                      {material.description}
                    </h3>


                    <span>
                      {material.code}
                    </span>


                    <div className="material-cpse">

                      {material.cpse}

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>


        {/* ======================================
            RIGHT PANEL
        ====================================== */}

        <div className="matching-results">


          {!selectedMaterial ? (

            /* ==================================
                EMPTY STATE
            ================================== */

            <div className="empty-state">

              <h2>
                Select a Material
              </h2>

              <p>
                Choose a material to start
                AI-powered cross-CPSE harmonization
                analysis.
              </p>

            </div>

          ) : (

            <>


              {/* ==================================
                  RESULTS HEADER
              ================================== */}

              <div className="results-header">

                <div>

                  <h2>
                    Harmonization Cluster
                  </h2>

                  <p>
                    AI has identified related
                    material records across
                    participating CPSEs.
                  </p>

                </div>


                <span className="ai-status">

                  AI Analysis Complete

                </span>

              </div>


              {/* ==================================
                  SOURCE MATERIAL
              ================================== */}

              {selectedSourceMaterial && (

                <div className="cluster-source-card">

                  <div className="cluster-label">

                    SOURCE MATERIAL

                  </div>


                  <h3>

                    {
                      selectedSourceMaterial.description
                    }

                  </h3>


                  <p>

                    {
                      selectedSourceMaterial.code
                    }

                    {" • "}

                    {
                      selectedSourceMaterial.cpse
                    }

                  </p>

                </div>

              )}


              {/* ==================================
                  AI MATCH
              ================================== */}

              <div className="match-results-list">


                <div className="cluster-label">

                  AI IDENTIFIED RELATED MATERIALS

                </div>


                {selectedMatch && (

                  <div className="ai-match-card">


                    <div className="match-top">


                      <div>

                        <h3>

                          {
                            selectedMatch
                              .matchedMaterial
                              .description
                          }

                        </h3>


                        <p>

                          {
                            selectedMatch
                              .matchedMaterial
                              .code
                          }

                          {" • "}

                          {
                            selectedMatch
                              .matchedMaterial
                              .cpse
                          }

                        </p>

                      </div>


                      <div className="confidence-score">

                        {
                          selectedMatch.similarity
                        }

                        %

                      </div>

                    </div>


                    <div className="match-type">

                      {
                        selectedMatch.matchType
                      }

                    </div>

                  </div>

                )}

              </div>


              {/* ==================================
                  CLUSTER SUMMARY
              ================================== */}

              <div className="cluster-summary">


                <div>

                  <span>
                    Cluster Size
                  </span>

                  <strong>

                    {
                      selectedMatch
                        ? 2
                        : 1
                    }

                    {" Materials"}

                  </strong>

                </div>


                <div>

                  <span>
                    AI Confidence
                  </span>

                  <strong>

                    {
                      selectedMatch
                        ? selectedMatch.similarity
                        : 0
                    }

                    %

                  </strong>

                </div>


                <div>

                  <span>
                    Match Type
                  </span>

                  <strong>

                    {
                      selectedMatch
                        ? selectedMatch.matchType
                        : "No Match"
                    }

                  </strong>

                </div>

              </div>


              {/* ==================================
                  MAIN ACTION
              ================================== */}

              {selectedMatch &&
                selectedSourceMaterial && (

                  <div className="harmonization-action">

                    <button
                      className="review-btn"
                      onClick={
                        handleGenerateRecommendation
                      }
                    >

                      Generate Harmonization
                      Recommendation →

                    </button>


                    <p>

                      AI will generate a standardized
                      description, classification, and
                      proposed National Material Code for
                      human validation.

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