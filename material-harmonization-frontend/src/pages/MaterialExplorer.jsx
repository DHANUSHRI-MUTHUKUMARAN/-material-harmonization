import { useState } from "react";
import materials from "../data/materials";

function MaterialExplorer() {
  const [search, setSearch] = useState("");
  const [cpseFilter, setCpseFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.code.toLowerCase().includes(search.toLowerCase()) ||
      material.description.toLowerCase().includes(search.toLowerCase());

    const matchesCPSE =
      cpseFilter === "All" || material.cpse === cpseFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      material.category === categoryFilter;

    return matchesSearch && matchesCPSE && matchesCategory;
  });

  return (
    <div className="material-explorer">
      <div className="page-header">
        <div>
          <h1>Material Explorer</h1>
          <p>
            Explore and compare material master records across participating
            CPSEs.
          </p>
        </div>

        <div className="material-count">
          {filteredMaterials.length} Materials
        </div>
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by material code or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={cpseFilter}
          onChange={(e) => setCpseFilter(e.target.value)}
        >
          <option value="All">All CPSEs</option>
          <option value="CPCL">CPCL</option>
          <option value="ONGC">ONGC</option>
          <option value="BHEL">BHEL</option>
          <option value="SAIL">SAIL</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Valve">Valve</option>
          <option value="Electrical">Electrical</option>
          <option value="Fastener">Fastener</option>
          <option value="Pump">Pump</option>
        </select>
      </div>

      <div className="materials-table-container">
        <table className="materials-table">
          <thead>
            <tr>
              <th>Material Code</th>
              <th>Material Description</th>
              <th>Category</th>
              <th>Specification</th>
              <th>Unit</th>
              <th>CPSE</th>
            </tr>
          </thead>

          <tbody>
            {filteredMaterials.map((material) => (
              <tr key={material.id}>
                <td>{material.code}</td>
                <td>{material.description}</td>
                <td>
                  <span className="category-badge">
                    {material.category}
                  </span>
                </td>
                <td>{material.specification}</td>
                <td>{material.unit}</td>
                <td>
                  <span className="cpse-badge">
                    {material.cpse}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMaterials.length === 0 && (
          <div className="no-results">
            No materials found.
          </div>
        )}
      </div>
    </div>
  );
}

export default MaterialExplorer;