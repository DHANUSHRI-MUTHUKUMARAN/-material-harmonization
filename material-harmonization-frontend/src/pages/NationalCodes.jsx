import { useState } from "react";

function NationalCodes() {
  const [generatedCodes, setGeneratedCodes] = useState([]);

  const approvedMaterials = [
    {
      id: 1,
      description: "Stainless Steel Ball Valve",
      category: "Valve",
      specification: "SS, DN50 / 2 Inch",
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
      description: "Copper Electrical Cable",
      category: "Electrical",
      specification: "Copper, 10 Sqmm",
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
  ];

  const generateCode = (material) => {
    const newCode = `NMC-${material.category
      .substring(0, 3)
      .toUpperCase()}-${String(material.id).padStart(4, "0")}`;

    if (!generatedCodes.find((item) => item.id === material.id)) {
      setGeneratedCodes([
        ...generatedCodes,
        {
          id: material.id,
          code: newCode,
        },
      ]);
    }
  };

  const getGeneratedCode = (id) => {
    return generatedCodes.find((item) => item.id === id)?.code;
  };

  return (
    <div className="national-codes-page">
      <div className="page-header">
        <div>
          <h1>Common National Material Codes</h1>

          <p>
            Create standardized national material codes for approved and
            harmonized material groups.
          </p>
        </div>
      </div>

      <div className="national-info">
        <h3>One Nation – One Material Code</h3>

        <p>
          Multiple existing CPSE material codes can be mapped to one common
          national material code while maintaining complete traceability.
        </p>
      </div>

      <div className="national-codes-list">
        {approvedMaterials.map((material) => {
          const nationalCode = getGeneratedCode(material.id);

          return (
            <div className="national-code-card" key={material.id}>
              <div className="national-code-header">
                <div>
                  <span className="card-label">
                    APPROVED MATERIAL GROUP
                  </span>

                  <h2>{material.description}</h2>

                  <p>{material.specification}</p>
                </div>

                {nationalCode ? (
                  <div className="generated-code">
                    {nationalCode}
                  </div>
                ) : (
                  <button
                    className="generate-code-btn"
                    onClick={() => generateCode(material)}
                  >
                    Generate National Code
                  </button>
                )}
              </div>

              <div className="mapped-materials">
                <h3>Mapped CPSE Material Codes</h3>

                <div className="mapping-table">
                  {material.materials.map((item, index) => (
                    <div className="mapping-row" key={index}>
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
                  ))}
                </div>
              </div>

              {nationalCode && (
                <div className="code-generated-message">
                  ✓ National Material Code successfully generated and mapped
                  to all corresponding CPSE material codes.
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