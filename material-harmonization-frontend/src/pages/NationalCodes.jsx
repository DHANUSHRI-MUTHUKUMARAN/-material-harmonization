import { useEffect, useState } from "react";
import { getNationalCodes } from "../services/materialService";

function NationalCodes() {
  const [nationalCodes, setNationalCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNationalCodes = async () => {
      try {
        const data = await getNationalCodes();

        setNationalCodes(data || []);

      } catch (error) {
        console.error(
          "Failed to load National Material Codes:",
          error
        );

      } finally {
        setLoading(false);
      }
    };

    loadNationalCodes();
  }, []);

  return (
    <div className="national-codes-page">

      <div className="page-header">
        <div>
          <h1>
            Common National Material Codes
          </h1>

          <p>
            Approved harmonized materials mapped to their
            common National Material Codes.
          </p>
        </div>
      </div>

      <div className="national-info">

        <h3>
          One Nation – One Material Code
        </h3>

        <p>
          Multiple existing CPSE material codes are mapped to one
          common National Material Code while maintaining complete
          traceability.
        </p>

      </div>

      {loading ? (

        <div className="validation-empty">
          <h2>
            Loading National Material Codes...
          </h2>
        </div>

      ) : nationalCodes.length === 0 ? (

        <div className="validation-empty">

          <h2>
            No approved harmonizations yet
          </h2>

          <p>
            National Material Codes will appear here after approval.
          </p>

        </div>

      ) : (

        <div className="national-codes-list">

          {nationalCodes.map((item) => (

            <div
              className="national-code-card"
              key={item.id}
            >

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

                <div className="generated-code-section">

                  <div className="generated-code">
                    {item.code}
                  </div>

                  <span className="code-status">
                    {item.status}
                  </span>

                </div>

              </div>

              <div className="mapped-materials">

                <h3>
                  Harmonized CPSE Material Codes
                </h3>

                <div className="mapping-table">

                  {(item.mappedMaterials || []).map(
                    (material, index) => (

                      <div
                        className="mapping-row"
                        key={`${material.code}-${index}`}
                      >

                        <span className="mapping-cpse">
                          {material.cpse}
                        </span>

                        <span className="mapping-code">
                          {material.code}
                        </span>

                        <span className="mapping-description">
                          {material.description}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

              <div className="code-risk-info">

                <span>
                  Total Mapped Materials:
                </span>

                <strong>
                  {(item.mappedMaterials || []).length}
                </strong>

                <br />

                <span>
                  Risk Level:
                </span>

                <strong>
                  {item.riskLevel}
                </strong>

              </div>

              <div className="code-generated-message">

                ✓ National Material Code approved and mapped to
                the corresponding CPSE material records.

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default NationalCodes;