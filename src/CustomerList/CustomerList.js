import { useEffect, useState } from 'react';
import './CustomerList.css';
import { useNavigate } from 'react-router-dom';
import useApi from '../utils/useAPI';
import Table from '../utils/components/Table/Table';
import { deleteCustomer, fetchCustomerList } from '../utils/customerService';

function CustomerList() {
    const navigate = useNavigate();
    const [customerList, setCustomerList] = useState([]);
    const [totalDataCount, setTotalDataCount] = useState(0);

    const { executeAPI: deleteCustomerAPI } = useApi(deleteCustomer);
    const { executeAPI: getAllCustomers, loading: getAllCustomersLoading } = useApi(fetchCustomerList);


    const tableColumns = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue(),
            width: '10%'
        },
        {
            accessorKey: 'age',
            header: 'Age',
            cell: (info) => info.getValue(),
            width: '4%'
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: (info) => info.getValue(),
            width: '10%'
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
            width: '25%'
        },
        {
            header: 'Actions',
            cell: ({ row: { original: data } }) => <div className="ml-auto d-flex customer-action">
                <i className="bi bi-person-vcard-fill" title="Show Details" onClick={() => showCustomerInfo(data._id)}></i>
                <i className="bi bi-person-fill-gear" title="Edit customer" onClick={() => addOrEditCustomer(data)}></i>
                <i className="bi bi-trash-fill" role="delete" title="Delete customer" onClick={() => deleteCustomerById(data._id)}></i>
            </div>
        }
    ];

    async function getCustomersList(searchTerm = '', skip = 0, limit = 10) {
        try {
            const { result, success } = await getAllCustomers({ searchTerm, skip, limit });
            if (success) {
                setCustomerList(result.list);
                setTotalDataCount(result.totalCount);
            }
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

    return (
        <div className="d-flex flex-column w-100 customer-details-container">
            <Table tableColumns={tableColumns} tableData={customerList} tableTitle="Customers List"
                getListAPI={getCustomersList} getListAPILoading={getAllCustomersLoading}
                totalDataCount={totalDataCount} TableActions={
                    <button className="icon-button" onClick={() => addOrEditCustomer()}>
                        <i className="bi bi-person-fill-add" ></i>
                        Add Customer
                    </button>
                }
            />
        </div>
    )
}

export default CustomerList;