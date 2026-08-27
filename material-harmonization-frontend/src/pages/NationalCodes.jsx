import { useEffect, useState } from "react";

function NationalCodes() {
  const [generatedCodes, setGeneratedCodes] = useState([]);

  // Approved harmonized material groups
  const approvedMaterials = [
    {
      id: 1,
      description: "Stainless Steel Ball Valve, DN50 / 2 Inch",
      category: "Valve",
      specification: "Stainless Steel, DN50 / 2 Inch",
      nationalCode: "NMC-VAL-SS-BALL-0001",

      materials: [
        {
          code: "CPCL-VAL-1023",
          cpse: "CPCL",
          description: "SS Ball Valve 2 Inch",
        },
        {
          code: "ONGC-V-4567",
          cpse: "ONGC",
          description: "Stainless Steel Ball Valve 50mm",
        },
        {
          code: "BHEL-V-245",
          cpse: "BHEL",
          description: "SS Ball Valve DN50",
        },
      ],
    },

    {
      id: 2,
      description: "Copper Electrical Cable, 10 Sqmm",
      category: "Electrical",
      specification: "Copper, 10 Sqmm",
      nationalCode: "NMC-ELE-CAB-CU-0002",

      materials: [
        {
          code: "BHEL-CAB-890",
          cpse: "BHEL",
          description: "Copper Cable 10 Sqmm",
        },
        {
          code: "ONGC-CAB-3321",
          cpse: "ONGC",
          description: "Cu Electrical Cable 10mm²",
        },
      ],
    },

    {
      id: 3,
      description: "Stainless Steel Ball Valve, DN50",
      category: "Valve",
      specification: "Stainless Steel, DN50",
      nationalCode: "NMC-VAL-SS-BALL-0003",

      materials: [
        {
          code: "BHEL-V-245",
          cpse: "BHEL",
          description: "SS Ball Valve DN50",
        },
        {
          code: "CPCL-VAL-1023",
          cpse: "CPCL",
          description: "SS Ball Valve 2 Inch",
        },
      ],
    },
  ];

  // Load previously registered codes
  useEffect(() => {
    const savedCodes =
      JSON.parse(localStorage.getItem("nationalCodes")) || [];

    setGeneratedCodes(savedCodes);
  }, []);

  // Register approved national code
  const generateCode = (material) => {
    const alreadyExists = generatedCodes.find(
      (item) => item.id === material.id
    );

    if (alreadyExists) {
      return;
    }

    const newGeneratedCode = {
      id: material.id,
      code: material.nationalCode,
      description: material.description,
      category: material.category,
      status: "Active",
    };

    const updatedCodes = [
      ...generatedCodes,
      newGeneratedCode,
    ];

    setGeneratedCodes(updatedCodes);

    localStorage.setItem(
      "nationalCodes",
      JSON.stringify(updatedCodes)
    );
  };

  // Get registered national code
  const getGeneratedCode = (id) => {
    return generatedCodes.find(
      (item) => item.id === id
    );
  };

  return (
    <div className="national-codes-page">

      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <h1>Common National Material Codes</h1>

          <p>
            Create and manage standardized national material codes for
            approved harmonized material groups.
          </p>
        </div>
      </div>

      {/* INFORMATION */}

      <div className="national-info">
        <h3>One Nation – One Material Code</h3>

        <p>
          Multiple existing CPSE material codes can be mapped to one
          common national material code while maintaining complete
          traceability.
        </p>
      </div>

      {/* APPROVED MATERIAL GROUPS */}

      <div className="national-codes-list">

        {approvedMaterials.map((material) => {

          const generatedCode =
            getGeneratedCode(material.id);

          return (

            <div
              className="national-code-card"
              key={material.id}
            >

              {/* CARD HEADER */}

              <div className="national-code-header">

                <div>

                  <span className="card-label">
                    APPROVED MATERIAL GROUP
                  </span>

                  <h2>
                    {material.description}
                  </h2>

                  <p>
                    {material.specification}
                  </p>

                </div>

                {/* NATIONAL CODE */}

                {generatedCode ? (

                  <div className="generated-code-section">

                    <div className="generated-code">
                      {generatedCode.code}
                    </div>

                    <span className="code-status">
                      Active
                    </span>

                  </div>

                ) : (

                  <button
                    className="generate-code-btn"
                    onClick={() =>
                      generateCode(material)
                    }
                  >
                    Register National Code
                  </button>

                )}

              </div>

              {/* MAPPED CPSE MATERIALS */}

              <div className="mapped-materials">

                <h3>
                  Mapped CPSE Material Codes
                </h3>

                <div className="mapping-table">

                  {material.materials.map(
                    (item, index) => (

                      <div
                        className="mapping-row"
                        key={index}
                      >

                        <span className="mapping-cpse">
                          {item.cpse}
                        </span>

                        <span className="mapping-code">
                          {item.code}
                        </span>

                        <span className="mapping-description">
                          {item.description}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* SUCCESS MESSAGE */}

              {generatedCode && (

                <div className="code-generated-message">

                  ✓ National Material Code successfully registered and
                  mapped to all corresponding CPSE material codes.

                </div>

              )}

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default NationalCodes;