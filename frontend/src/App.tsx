import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import EditItemForm from "./components/EditItemForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/add" element={<AddItemForm />} />
        <Route path="/edit/:id" element={<EditItemForm />} /> {/* Edit route */}
      </Routes>
    </Router>
  );
};

export default App;