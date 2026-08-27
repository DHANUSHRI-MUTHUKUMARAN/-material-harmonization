import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import MaterialExplorer from "./pages/MaterialExplorer";
import AIMatching from "./pages/AIMatching";
import HarmonizationRecommendation from "./pages/HarmonizationRecommendation";
import Validation from "./pages/Validation";
import NationalCodeApproval from "./pages/NationalCodeApproval";
import NationalCodes from "./pages/NationalCodes";
import Analytics from "./pages/Analytics";
import AuditTrail from "./pages/AuditTrail";

function App() {
  return (
    <BrowserRouter>

      <div className="app-layout">

        <Sidebar />

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/materials"
              element={<MaterialExplorer />}
            />

            <Route
              path="/ai-matching"
              element={<AIMatching />}
            />

            <Route
              path="/harmonization-recommendation"
              element={<HarmonizationRecommendation />}
            />

            <Route
              path="/validation"
              element={<Validation />}
            />

            <Route
              path="/national-code-approval"
              element={<NationalCodeApproval />}
            />

            <Route
              path="/national-codes"
              element={<NationalCodes />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/audit-trail"
              element={<AuditTrail />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;