import { useEffect, useState } from "react";
import { getNationalCodes } from "../services/materialService";

function NationalCodes() {
  const [nationalCodes, setNationalCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNationalCodes = async () => {
      try {
        const data = await getNationalCodes();

        setNationalCodes(data);
      } catch (error) {
        console.error("Failed to load National Material Codes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNationalCodes();
  }, []);

  return (
    <div className="national-codes-page">

      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <h1>Common National Material Codes</h1>

          <p>
            Approved harmonized materials mapped to their common National
            Material Codes.
          </p>
        </div>
      </div>

      {/* INFORMATION */}

      <div className="national-info">
        <h3>One Nation – One Material Code</h3>

        <p>
          Multiple existing CPSE material codes are mapped to one common
          National Material Code while maintaining complete traceability.
        </p>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="validation-empty">
          <h2>Loading National Material Codes...</h2>
        </div>
      ) : nationalCodes.length === 0 ? (

        /* EMPTY STATE */

        <div className="validation-empty">
          <h2>No approved harmonizations yet</h2>

          <p>
            National Material Codes will appear here after an AI harmonization
            recommendation is approved.
          </p>
        </div>

      ) : (

        /* NATIONAL CODE LIST */

        <div className="national-codes-list">

          {nationalCodes.map((item) => (

            <div
              className="national-code-card"
              key={item.id}
            >

              {/* CARD HEADER */}

              <div className="national-code-header">

                <div>

                  <span className="card-label">
                    APPROVED HARMONIZED MATERIAL
                  </span>

                  <h2>
                    {item.description}
                  </h2>

                  <p>
                    {item.classification}
                  </p>

                </div>

                {/* NATIONAL CODE */}

                <div className="generated-code-section">

                  <div className="generated-code">
                    {item.code}
                  </div>

                  <span className="code-status">
                    {item.status}
                  </span>

                </div>

              </div>

              {/* MATERIAL DETAILS */}

              <div className="mapped-materials">

                <h3>
                  Harmonized CPSE Material Codes
                </h3>

                <div className="mapping-table">

                  {/* SOURCE MATERIAL */}

                  <div className="mapping-row">

                    <span className="mapping-cpse">
                      {item.sourceMaterial.cpse}
                    </span>

                    <span className="mapping-code">
                      {item.sourceMaterial.code}
                    </span>

                    <span className="mapping-description">
                      {item.sourceMaterial.description}
                    </span>

                  </div>

                  {/* MATCHED MATERIAL */}

                  <div className="mapping-row">

                    <span className="mapping-cpse">
                      {item.matchedMaterial.cpse}
                    </span>

                    <span className="mapping-code">
                      {item.matchedMaterial.code}
                    </span>

                    <span className="mapping-description">
                      {item.matchedMaterial.description}
                    </span>

                  </div>

                </div>

              </div>

              {/* ADDITIONAL DETAILS */}

              <div className="code-generated-message">

                ✓ National Material Code approved and mapped to the
                corresponding CPSE material records.

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default NationalCodes;