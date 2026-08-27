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

    nationalCode:
      "NMC-VAL-SS-BALL-0003",

    riskLevel: "Medium",
  },
};


export const getHarmonizationRecommendation = async (
  id
) => {
  return harmonizationRecommendations[Number(id)];
};


// ============================================
// NATIONAL MATERIAL CODES
// ============================================

const nationalCodes = [];


export const approveHarmonization = async (
  sourceMaterial,
  matchedMaterial,
  recommendation
) => {

  const newNationalCode = {
    id: Date.now(),

    code: recommendation.nationalCode,

    description:
      recommendation.standardizedDescription,

    classification:
      recommendation.classification,

    riskLevel:
      recommendation.riskLevel,

    status: "Approved",

    sourceMaterial,

    matchedMaterial,
  };

  nationalCodes.push(newNationalCode);


  // Add approval to audit trail

  await addAuditLog({
    action: "Harmonization Approved",

    material:
      recommendation.standardizedDescription,

    materialCode:
      recommendation.nationalCode,

    user: "Material Validation Officer",

    status: "Approved",
  });


  return newNationalCode;
};


export const getNationalCodes = async () => {
  return nationalCodes;
};


// ============================================
// AUDIT TRAIL
// ============================================

const auditLogs = [
  {
    id: 1,

    action: "AI Match Generated",

    material: "SS Ball Valve 2 Inch",

    materialCode: "CPCL-VAL-1023",

    user: "AI Matching Engine",

    time: "System Generated",

    status: "AI Generated",
  },
];


// Add a new audit activity

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

    time: new Date().toLocaleString(),

    status,
  };


  auditLogs.unshift(newLog);

  return newLog;
};


// Get all audit activities

export const getAuditLogs = async () => {
  return auditLogs;
};