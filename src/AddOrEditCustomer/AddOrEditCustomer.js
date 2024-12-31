import { useState } from 'react';
import './AddOrEditCustomer.css';
import useApi from '../utils/useAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveCustomer } from '../utils/customerService';

function AddOrEditCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(location.state || {});
  const { executeAPI: saveCustomerAPI, loading: saveCustomerLoading } = useApi(saveCustomer);

  function saveDetails() {
    if (Object.keys(customer).length && Object.values(customer).filter(x => !!x).length) {
      createOrUpdateCustomer();
    } else {
      alert('Enter the valid Details');
    }
  }

  function clearInputs() {
    setCustomer({
      name: '',
      age: '',
      email: '',
      phone: '',
      comments: ''
    });
  }

  async function createOrUpdateCustomer() {
    try {
      const { success } = await saveCustomerAPI(customer);
      if (success) {
        clearInputs();
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="d-flex flex-column m-auto action-container">
      <div className="d-flex align-items-center">
        <button className="icon-button" role="back" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
          Back
        </button>
        <h4>{customer._id ? 'Edit' : 'Add'} Customer</h4>
      </div>
      <div className="d-flex flex-column input-fields">
        <span className="align-items-center section-field">
          <label>Name</label>
          <input placeholder="Name" value={customer.name} onChange={({ target: { value: name } }) => {
            setCustomer((prev) => ({ ...prev, name }));
          }} />
        </span>
        <span className="align-items-center section-field">
          <label>Age</label>
          <input placeholder="Age" value={customer.age} onChange={({ target: { value: age } }) => {
            setCustomer((prev) => ({ ...prev, age }));
          }} />
        </span>
        <span className="align-items-center section-field">
          <label>Email</label>
          <input placeholder="Email" value={customer.email} onChange={({ target: { value: email } }) => {
            setCustomer((prev) => ({ ...prev, email }));
          }} />
        </span>
        <span className="align-items-center section-field">
          <label>Phone</label>
          <input placeholder="Phone" value={customer.phone} onChange={({ target: { value: phone } }) => {
            setCustomer((prev) => ({ ...prev, phone }));
          }} />
        </span>
        <span className="section-field">
          <label>Comments</label>
          <textarea placeholder="Comments..." style={{ height: 100 }} value={customer.comments}
            onChange={({ target: { value: comments } }) => {
              setCustomer((prev) => ({ ...prev, comments }));
            }}
          />
        </span>
        <div className="d-flex page-actions">
          <button onClick={clearInputs}>Clear</button>
          <button className="ml-auto" role="save" disabled={saveCustomerLoading} onClick={saveDetails}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddOrEditCustomer;
