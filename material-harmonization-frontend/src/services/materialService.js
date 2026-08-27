// ============================================
// MATERIAL DATA
// ============================================

const materials = [
  {
    id: 1,
    code: "CPCL-VAL-1023",
    description: "SS Ball Valve 2 Inch",
    cpse: "CPCL",
    category: "Valve",
    specification: "Stainless Steel, 2 Inch",
  },
  {
    id: 2,
    code: "ONGC-V-4567",
    description: "Stainless Steel Ball Valve 50mm",
    cpse: "ONGC",
    category: "Valve",
    specification: "SS, DN50",
  },
  {
    id: 3,
    code: "BHEL-V-245",
    description: "SS Ball Valve DN50",
    cpse: "BHEL",
    category: "Valve",
    specification: "Stainless Steel, DN50",
  },
  {
    id: 4,
    code: "BHEL-CAB-890",
    description: "Copper Cable 10 Sqmm",
    cpse: "BHEL",
    category: "Electrical",
    specification: "Copper, 10 Sqmm",
  },
  {
    id: 5,
    code: "ONGC-CAB-3321",
    description: "Cu Electrical Cable 10mm²",
    cpse: "ONGC",
    category: "Electrical",
    specification: "Copper, 10 Sqmm",
  },
];


// ============================================
// MATERIAL SERVICE FUNCTIONS
// ============================================

export const getMaterials = async () => {
  return materials;
};


export const getMaterialById = async (id) => {
  return materials.find(
    (material) => material.id === Number(id)
  );
};


// ============================================
// AI MATCHING DATA
// ============================================

const aiMatches = [
  {
    id: 1,

    sourceMaterial: {
      code: "CPCL-VAL-1023",
      description: "SS Ball Valve 2 Inch",
      cpse: "CPCL",
    },

    matchedMaterial: {
      code: "ONGC-V-4567",
      description: "Stainless Steel Ball Valve 50mm",
      cpse: "ONGC",
    },

    similarity: 96,
    matchType: "Near Duplicate",
    status: "Pending",
  },

  {
    id: 2,

    sourceMaterial: {
      code: "BHEL-CAB-890",
      description: "Copper Cable 10 Sqmm",
      cpse: "BHEL",
    },

    matchedMaterial: {
      code: "ONGC-CAB-3321",
      description: "Cu Electrical Cable 10mm²",
      cpse: "ONGC",
    },

    similarity: 94,
    matchType: "Equivalent",
    status: "Pending",
  },

  {
    id: 3,

    sourceMaterial: {
      code: "BHEL-V-245",
      description: "SS Ball Valve DN50",
      cpse: "BHEL",
    },

    matchedMaterial: {
      code: "CPCL-VAL-1023",
      description: "SS Ball Valve 2 Inch",
      cpse: "CPCL",
    },

    similarity: 91,
    matchType: "Near Duplicate",
    status: "Pending",
  },
];


export const getAIMatches = async () => {
  return aiMatches;
};


export const getAIMatchById = async (id) => {
  return aiMatches.find(
    (match) => match.id === Number(id)
  );
};


// ============================================
// VALIDATION DATA
// ============================================

const validationMappings = [
  {
    id: 1,

    sourceMaterial: {
      code: "CPCL-VAL-1023",
      description: "SS Ball Valve 2 Inch",
      cpse: "CPCL",
    },

    matchedMaterial: {
      code: "ONGC-V-4567",
      description: "Stainless Steel Ball Valve 50mm",
      cpse: "ONGC",
    },

    similarity: 96,
    matchType: "Near Duplicate",
    status: "Pending",
  },
];


export const getValidationMappings = async () => {
  return validationMappings;
};


export const updateValidationStatus = async (
  id,
  status
) => {
  const mapping = validationMappings.find(
    (item) => item.id === Number(id)
  );

  if (mapping) {
    mapping.status = status;
  }

  return mapping;
};


// ============================================
// AI HARMONIZATION RECOMMENDATIONS
// ============================================

const harmonizationRecommendations = {
  1: {
    standardizedDescription:
      "Stainless Steel Ball Valve, DN50 / 2 Inch",

    attributes: [
      "Material: Stainless Steel",
      "Type: Ball Valve",
      "Size: DN50 / 2 Inch",
    ],

    classification:
      "Valves → Ball Valves → Stainless Steel",

    nationalCode:
      "NMC-VAL-SS-BALL-0001",

    riskLevel: "Low",
  },

  2: {
    standardizedDescription:
      "Copper Electrical Cable, 10 Sqmm",

    attributes: [
      "Material: Copper",
      "Type: Electrical Cable",
      "Size: 10 Sqmm",
    ],

    classification:
      "Electrical → Cables → Copper",

    nationalCode:
      "NMC-ELE-CAB-CU-0002",

    riskLevel: "Low",
  },

  3: {
    standardizedDescription:
      "Stainless Steel Ball Valve, DN50",

    attributes: [
      "Material: Stainless Steel",
      "Type: Ball Valve",
      "Size: DN50",
    ],

    classification:
      "Valves → Ball Valves → Stainless Steel",

    // Same harmonized material family
    nationalCode:
      "NMC-VAL-SS-BALL-0001",

    riskLevel: "Medium",
  },
};


export const getHarmonizationRecommendation = async (
  id
) => {
  return harmonizationRecommendations[Number(id)];
};


// ============================================
// SAFE LOCAL STORAGE HELPER
// ============================================

const getStoredData = (key, defaultValue) => {
  try {
    const storedData = localStorage.getItem(key);

    if (!storedData) {
      return defaultValue;
    }

    return JSON.parse(storedData);

  } catch (error) {

    console.error(
      `Failed to load ${key} from localStorage:`,
      error
    );

    return defaultValue;
  }
};


// ============================================
// NATIONAL MATERIAL CODES
// ============================================

const nationalCodes = getStoredData(
  "nationalCodes",
  []
);


// ============================================
// CHECK IF MATERIAL ALREADY EXISTS
// ============================================

const materialExists = (
  mappedMaterials,
  material
) => {
  return mappedMaterials.some(
    (item) => item.code === material.code
  );
};


// ============================================
// APPROVE HARMONIZATION
// ============================================

export const approveHarmonization = async (
  sourceMaterial,
  matchedMaterial,
  recommendation
) => {

  if (
    !sourceMaterial ||
    !matchedMaterial ||
    !recommendation
  ) {
    throw new Error(
      "Required harmonization data is missing."
    );
  }


  // ============================================
  // CHECK IF NATIONAL CODE ALREADY EXISTS
  // ============================================

  const existingCode = nationalCodes.find(
    (item) =>
      item.code === recommendation.nationalCode
  );


  // ============================================
  // IF CODE EXISTS → ADD NEW MATERIALS
  // ============================================

  if (existingCode) {

    // Ensure mappedMaterials exists
    if (!existingCode.mappedMaterials) {

      existingCode.mappedMaterials = [];

      // Migrate old data structure if needed

      if (existingCode.sourceMaterial) {
        existingCode.mappedMaterials.push(
          existingCode.sourceMaterial
        );
      }

      if (existingCode.matchedMaterial) {
        existingCode.mappedMaterials.push(
          existingCode.matchedMaterial
        );
      }
    }


    // Add source material if not already mapped

    if (
      !materialExists(
        existingCode.mappedMaterials,
        sourceMaterial
      )
    ) {
      existingCode.mappedMaterials.push(
        sourceMaterial
      );
    }


    // Add matched material if not already mapped

    if (
      !materialExists(
        existingCode.mappedMaterials,
        matchedMaterial
      )
    ) {
      existingCode.mappedMaterials.push(
        matchedMaterial
      );
    }


    // Save updated National Codes

    localStorage.setItem(
      "nationalCodes",
      JSON.stringify(nationalCodes)
    );


    // Add audit log

    await addAuditLog({
      action: "Material Added to National Code",

      material:
        recommendation.standardizedDescription,

      materialCode:
        recommendation.nationalCode,

      user:
        "Material Validation Officer",

      status:
        "Approved",
    });


    return existingCode;
  }


  // ============================================
  // CREATE NEW NATIONAL MATERIAL CODE
  // ============================================

  const newNationalCode = {
    id: Date.now(),

    code:
      recommendation.nationalCode,

    description:
      recommendation.standardizedDescription,

    classification:
      recommendation.classification,

    riskLevel:
      recommendation.riskLevel,

    status:
      "Approved",


    // All CPSE materials mapped to this code

    mappedMaterials: [
      sourceMaterial,
      matchedMaterial,
    ],
  };


  // Add newest code at top

  nationalCodes.unshift(
    newNationalCode
  );


  // Save permanently

  localStorage.setItem(
    "nationalCodes",
    JSON.stringify(nationalCodes)
  );


  // Add approval to Audit Trail

  await addAuditLog({
    action:
      "National Material Code Approved",

    material:
      recommendation.standardizedDescription,

    materialCode:
      recommendation.nationalCode,

    user:
      "Material Validation Officer",

    status:
      "Approved",
  });


  return newNationalCode;
};


// ============================================
// GET NATIONAL MATERIAL CODES
// ============================================

export const getNationalCodes = async () => {
  return nationalCodes;
};


// ============================================
// AUDIT TRAIL
// ============================================

const defaultAuditLogs = [
  {
    id: 1,

    action:
      "AI Match Generated",

    material:
      "SS Ball Valve 2 Inch",

    materialCode:
      "CPCL-VAL-1023",

    user:
      "AI Matching Engine",

    time:
      "System Generated",

    status:
      "AI Generated",
  },
];


const auditLogs = getStoredData(
  "auditLogs",
  defaultAuditLogs
);


// ============================================
// ADD AUDIT ACTIVITY
// ============================================

export const addAuditLog = async ({
  action,
  material,
  materialCode,
  user,
  status,
}) => {

  const newLog = {
    id: Date.now(),

    action,

    material,

    materialCode,

    user,

    time:
      new Date().toLocaleString(),

    status,
  };


  // Add newest activity at top

  auditLogs.unshift(
    newLog
  );


  // Save permanently

  localStorage.setItem(
    "auditLogs",
    JSON.stringify(auditLogs)
  );


  return newLog;
};


// ============================================
// GET AUDIT ACTIVITIES
// ============================================

export const getAuditLogs = async () => {
  return auditLogs;
};