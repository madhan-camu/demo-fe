import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerList from "./CustomerList/CustomerList";
import CustomerInfo from "./CustomerInfo/CustomerInfo";
import AddOrEditCustomer from "./AddOrEditCustomer/AddOrEditCustomer";

function App() {

    return <Router>
        <Routes>
            <Route path="" element={<CustomerList />} />
            <Route path="add-or-edit" element={<AddOrEditCustomer />} />
            <Route path="info/:customerId" element={<CustomerInfo />} />
        </Routes>
    </Router>
}

export default App;