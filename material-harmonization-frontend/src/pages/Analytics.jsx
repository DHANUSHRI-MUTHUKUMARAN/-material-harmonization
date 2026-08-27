import { useEffect, useState } from "react";

import {
  getMaterials,
  getAIMatches,
  getNationalCodes,
} from "../services/materialService";

function Analytics() {
  const [materials, setMaterials] = useState([]);
  const [aiMatches, setAiMatches] = useState([]);
  const [nationalCodes, setNationalCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  /* LOAD ANALYTICS DATA */

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);

        const [
          materialsData,
          matchesData,
          nationalCodesData,
        ] = await Promise.all([
          getMaterials(),
          getAIMatches(),
          getNationalCodes(),
        ]);

        setMaterials(materialsData);
        setAiMatches(matchesData);
        setNationalCodes(nationalCodesData);

      } catch (error) {
        console.error(
          "Failed to load analytics data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);


  /* TOTAL APPROVED MAPPINGS */

  const approvedMappings = nationalCodes.length;


  /* UNIQUE CPSES */

  const cpseNames = [
    ...new Set(
      materials.map((material) => material.cpse)
    ),
  ];


  /* CPSE ANALYTICS */

  const cpseData = cpseNames.map((cpse) => {
    const cpseMaterials = materials.filter(
      (material) => material.cpse === cpse
    );

    const cpseDuplicates = aiMatches.filter(
      (match) =>
        match.sourceMaterial.cpse === cpse ||
        match.matchedMaterial.cpse === cpse
    );

    const cpseApproved = nationalCodes.filter(
      (code) =>
        code.sourceMaterial?.cpse === cpse ||
        code.matchedMaterial?.cpse === cpse
    );

    return {
      name: cpse,
      materials: cpseMaterials.length,
      duplicates: cpseDuplicates.length,
      mappings: cpseApproved.length,
    };
  });


  /* CATEGORY ANALYTICS */

  const categoryNames = [
    ...new Set(
      materials.map((material) => material.category)
    ),
  ];


  const categories = categoryNames.map((category) => {
    const categoryMaterials = materials.filter(
      (material) => material.category === category
    );

    const categoryMatches = aiMatches.filter((match) => {
      const source = materials.find(
        (material) =>
          material.code === match.sourceMaterial.code
      );

      return source?.category === category;
    });

    const percentage =
      categoryMaterials.length > 0
        ? Math.round(
            (categoryMatches.length /
              categoryMaterials.length) *
              100
          )
        : 0;

    return {
      name: category,
      percentage:
        percentage > 100 ? 100 : percentage,
      matches: `${categoryMatches.length} Matches`,
    };
  });


  /* DUPLICATE REDUCTION */

  const duplicateReduction =
    aiMatches.length > 0
      ? Math.round(
          (nationalCodes.length /
            aiMatches.length) *
            100
        )
      : 0;


  /* CROSS-CPSE VISIBILITY */

  const crossCPSEMatches = aiMatches.filter(
    (match) =>
      match.sourceMaterial.cpse !==
      match.matchedMaterial.cpse
  ).length;


  const visibilityImprovement =
    aiMatches.length > 0
      ? Math.round(
          (crossCPSEMatches /
            aiMatches.length) *
            100
        )
      : 0;


  /* STATISTICS */

  const stats = [
    {
      title: "Total Materials",
      value: materials.length,
      description:
        "Across participating CPSEs",
    },

    {
      title: "Duplicate Candidates",
      value: aiMatches.length,
      description:
        "Potential duplicate materials detected",
    },

    {
      title: "AI Matches",
      value: aiMatches.length,
      description:
        "AI-generated material match recommendations",
    },

    {
      title: "Approved Mappings",
      value: approvedMappings,
      description:
        "Approved harmonization mappings",
    },

    {
      title: "National Codes",
      value: nationalCodes.length,
      description:
        "Common national material codes generated",
    },
  ];


  /* LOADING STATE */

  if (loading) {
    return (
      <div className="analytics-page">

        <div className="validation-empty">

          <h2>Loading Analytics...</h2>

          <p>
            Collecting material harmonization data and
            generating analytics.
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="analytics-page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <h1>
            Material Master Analytics
          </h1>

          <p>
            Monitor material duplication, AI recommendations,
            validation progress and national code harmonization.
          </p>

        </div>

      </div>


      {/* STATISTICS CARDS */}

      <div className="analytics-stats">

        {stats.map((stat, index) => (

          <div
            className="analytics-stat-card"
            key={index}
          >

            <p>
              {stat.title}
            </p>

            <h2>
              {stat.value}
            </h2>

            <span>
              {stat.description}
            </span>

          </div>

        ))}

      </div>


      {/* ANALYTICS GRID */}

      <div className="analytics-grid">


        {/* CPSE OVERVIEW */}

        <div className="analytics-card">

          <div className="analytics-card-header">

            <div>

              <h2>
                CPSE Material Overview
              </h2>

              <p>
                Material harmonization progress by organization.
              </p>

            </div>

          </div>


          <div className="analytics-table">


            {/* TABLE HEADER */}

            <div className="analytics-table-header">

              <span>
                CPSE
              </span>

              <span>
                Materials
              </span>

              <span>
                Duplicates
              </span>

              <span>
                Approved
              </span>

            </div>


            {/* TABLE DATA */}

            {cpseData.map((cpse, index) => (

              <div
                className="analytics-table-row"
                key={index}
              >

                <strong>
                  {cpse.name}
                </strong>

                <span>
                  {cpse.materials}
                </span>

                <span className="duplicate-number">
                  {cpse.duplicates}
                </span>

                <span className="approved-number">
                  {cpse.mappings}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* AI MATCHING BY CATEGORY */}

        <div className="analytics-card">

          <div className="analytics-card-header">

            <div>

              <h2>
                AI Matching by Category
              </h2>

              <p>
                Material match coverage across categories.
              </p>

            </div>

          </div>


          <div className="category-analytics">

            {categories.length > 0 ? (

              categories.map((category, index) => (

                <div
                  className="category-row"
                  key={index}
                >

                  <div className="category-info">

                    <span>
                      {category.name}
                    </span>

                    <span>
                      {category.matches}
                    </span>

                  </div>


                  <div className="progress-track">

                    <div
                      className="progress-bar"
                      style={{
                        width: `${category.percentage}%`,
                      }}
                    ></div>

                  </div>


                  <strong>
                    {category.percentage}%
                  </strong>

                </div>

              ))

            ) : (

              <p>
                No category analytics available.
              </p>

            )}

          </div>

        </div>

      </div>


      {/* IMPACT SECTION */}

      <div className="impact-section">

        <h2>
          Harmonization Impact
        </h2>


        <div className="impact-grid">


          {/* DUPLICATE REDUCTION */}

          <div className="impact-item">

            <h3>
              ↓ {duplicateReduction}%
            </h3>

            <p>
              Potential duplicate harmonization coverage
            </p>

          </div>


          {/* CROSS CPSE VISIBILITY */}

          <div className="impact-item">

            <h3>
              ↑ {visibilityImprovement}%
            </h3>

            <p>
              Cross-CPSE material visibility
            </p>

          </div>


          {/* NATIONAL CODES */}

          <div className="impact-item">

            <h3>
              {nationalCodes.length}
            </h3>

            <p>
              Common national material codes established
            </p>

          </div>


          {/* CPSES */}

          <div className="impact-item">

            <h3>
              {cpseNames.length} CPSEs
            </h3>

            <p>
              Currently participating in the unified framework
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;