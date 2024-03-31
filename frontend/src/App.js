import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const CreateGroup = lazy(() => import("./pages/CreateGroup.js"));
const PaymentSplit = lazy(() => import("./pages/PaymentSplit.js"));
const SplitterBill = lazy(() => import("./pages/SplittedBill.js"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<CreateGroup />} />
        <Route path="/splitter" element={<PaymentSplit />} />
        <Route path="/show-contri" element={<SplitterBill />} />
      </Routes>
    </Suspense>
  );
}

export default App;
