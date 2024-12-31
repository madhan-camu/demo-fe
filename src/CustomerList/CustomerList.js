import { useEffect, useState } from 'react';
import './CustomerList.css';
import { useNavigate } from 'react-router-dom';
import useApi from '../utils/useAPI';
import Table from '../utils/components/Table/Table';
import { deleteCustomer, fetchCustomerList } from '../utils/customerService';

function CustomerList() {
    const [customerList, setCustomerList] = useState([]);
    const navigate = useNavigate();

    const { executeAPI: deleteCustomerAPI } = useApi(deleteCustomer);
    const { executeAPI: getAllCustomers, loading: getAllCustomersLoading } = useApi(fetchCustomerList);

    const tableColumns = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'age',
            header: 'Age',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'dob',
            header: 'Date of Birth',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'fatherName',
            header: 'Father Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'address',
            header: 'Address',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'pincode',
            header: 'Pincode',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'skills',
            header: 'Skills',
            cell: (info) => info.getValue()?.map(skill => skill?.value).filter(x => x).join(', '),
        },
        {
            accessorKey: 'comments',
            header: 'Comments',
            cell: (info) => info.getValue(),
            width: '400px'
        },
        {
            header: 'Actions',
            cell: ({ row: { original: data } }) => <div className="ml-auto d-flex customer-action">
                <i class="bi bi-person-vcard-fill" title="Show Details" onClick={() => showCustomerInfo(data._id)}></i>
                <i class="bi bi-person-fill-gear" title="Edit customer" onClick={() => addOrEditCustomer(data)}></i>
                <i class="bi bi-trash-fill" role="delete" title="Delete customer" onClick={() => deleteCustomerById(data._id)}></i>
            </div>
        }
    ];
    
    useEffect(() => {
        getCustomersList();
    }, []);

    async function getCustomersList() {
        try {
            const { data, success } = await getAllCustomers();
            if (success) setCustomerList(data);
        } catch (error) {
            console.log(error)
        }
    }

    function addOrEditCustomer(state = null) {
        navigate('/add-or-edit', { state });
    }

    function showCustomerInfo(id) {
        navigate(`/info/${id}`);
    }

    async function deleteCustomerById(id) {
        try {
            const { success } = await deleteCustomerAPI(id);
            if (success) getCustomersList();
        } catch (error) {
            console.log(error);
        }
    }

    function searchTable() {

    }

    return (
        <div className="d-flex flex-column w-100 customer-details-container">
            <div className="d-flex justify-content-between">
                <h4>Customer List</h4>
                <div class="table-actions">
                    {/* <input onChange={searchTable} /> */}
                    <button className="icon-button" onClick={() => addOrEditCustomer()}>
                        <i className="bi bi-person-fill-add" ></i>
                        Add Customer
                    </button>
                </div>
            </div>
            {getAllCustomersLoading ? 
                <span>Customers List Loading...</span> : 
                <Table tableColumns={tableColumns} tableData={customerList} />
            }
        </div>
    )
}

export default CustomerList;