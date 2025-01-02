import axios from "axios";
import { BACKEND_BASE_URL } from "./const";

async function fetchCustomerList({ searchTerm, skip, limit }) {
    try {
        const { data: { result, success, message } } = await axios.get(`${BACKEND_BASE_URL}customers`, { params: { searchTerm, skip, limit } });
        if (success) {
            return { result, success };
        } else {
            alert('Failed to get customer list');
            return { success, message };
        }
    } catch (error) {
        alert('Failed to get customer list');
        throw error;
    }
}

async function fetchCustomer(customerId) {
    try {
        const { data: { result, success, message } } = await axios.get(`${BACKEND_BASE_URL}customer?id=${customerId}`);

        if (success) {
            return { result, success };
        } else {
            alert('Failed to get customer information.');
            return { success, message };
        }
    } catch (error) {
        alert('Failed to get customer information.');
        throw error;
    }
}

async function deleteCustomer(id) {
    try {
        const { data: { success, message } } = await axios.delete(`${BACKEND_BASE_URL}customer?id=${id}`);
        if (success) {
            alert('Customer deleted successfully')
        } else {
            alert('Failed to delete customer');
        }
        return { success, message };
    } catch (error) {
        alert('Failed to delete customer');
        throw error;
    }
}

async function saveCustomer({_id, ...customer}) {
    try {
        const { data: { success, message } } = await axios.post(`${BACKEND_BASE_URL}customer`, { _id, ...customer });
        if (success) {
            alert(`Customer ${_id ? 'updated' : 'created'} successfully`);
        } else {
            alert(`Failed to ${_id ? 'update' : 'create'} customer`);
        }
        return { success, message };
    } catch (error) {
        alert(`Failed to ${_id ? 'update' : 'create'} customer`);
        throw error;
    }
}

async function fetchCustomerSkills() {
    try {
        const { data: { result, success, message } } = await axios.get(`${BACKEND_BASE_URL}skills`);
        if (success) {
            return { result, success };
        } else {
            alert(`Failed to get customer skills`);
            return { success, message };
        }
    } catch (error) {
        alert(`Failed to get customer skills`);
        throw error;
    }
}

export {
    fetchCustomerList,
    deleteCustomer,
    saveCustomer,
    fetchCustomer,
    fetchCustomerSkills
}