import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './CustomerInfo.css';
import useApi from "../utils/useAPI";
import { useFormik } from "formik";
import { customerSchema } from "../utils/schema";
import FormField from "../utils/components/FormField/FormField";
import { fetchCustomer, fetchCustomerSkills, saveCustomer } from "../utils/customerService";

function CustomerInfo() {
    const { customerId } = useParams();
    const { executeAPI: fetchCustomerAPI } = useApi(fetchCustomer);
    const { executeAPI: saveCustomerAPI } = useApi(saveCustomer);
    const { executeAPI: fetchCustomerSkillsAPI } = useApi(fetchCustomerSkills);

    const navigate = useNavigate();
    const [skillOptions, setSkillOptions] = useState([]);

    const customerFormik = useFormik({
        validationSchema: customerSchema,
        onSubmit: saveCustomerOnSubmit,
        validateOnMount: true,
        initialValues: {
            name: '',
            age: null,
            dob: null,
            email: '',
            phone: '',
            fatherName: '',
            address: '',
            pincode: '',
            skills: [],
            comments: '',
        }
    });

    useEffect(() => {
        getCustomer();
        getCustomerSkills();
    }, []);

    async function getCustomerSkills() {
        try {
            const { data, success } = await fetchCustomerSkillsAPI();
            if (success && Array.isArray(data) && data.length) {
                setSkillOptions(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getCustomer() {
        if (customerId) {
            try {
                const { data: customerData, success } = await fetchCustomerAPI(customerId);
                if (success) {
                    const { _id, ...customer } = customerData;
                    Object.entries(customer).forEach(([field, value]) => {
                        if (field in customerFormik.values) customerFormik.setFieldValue(field, value);
                    });
                    customerFormik.validateForm();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function saveCustomerOnSubmit(customer, { setSubmitting }) {
        if (customerFormik.isValid && customerId) {
            setSubmitting(true);
            try {
                const { success } = await saveCustomerAPI({ _id: customerId, ...customer});
                if (success) {
                    customerFormik.resetForm();
                    navigate(-1);
                }                
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        }
    }
    
    return (
        <form className="customer-form d-flex flex-column" onSubmit={customerFormik.handleSubmit}>
            <h4>Customer Information</h4>
            <div className="form-input-fields">
                <FormField id="name" label="Name"
                    value={customerFormik.values.name}
                    onChange={customerFormik.handleChange}
                    onBlur={customerFormik.handleBlur}
                    touched={customerFormik.touched.name}
                    errorMessage={customerFormik.errors.name}
                />

                <FormField id="age" label="Age" type="number"
                    value={customerFormik.values.age}
                    onChange={customerFormik.handleChange}
                    onBlur={customerFormik.handleBlur}
                    touched={customerFormik.touched.age}
                    errorMessage={customerFormik.errors.age}
                />

                <FormField id="dob" label="Date of Birth" type="date"
                    value={customerFormik.values.dob}
                    onChange={(e) => {
                        customerFormik.handleChange(e); 
                        
                        if (customerFormik.values.dob) {
                            const age = new Date(new Date().getTime() - new Date(customerFormik.values.dob)).getUTCFullYear() - new Date(0).getUTCFullYear();
                            customerFormik.setFieldValue('age', age);
                        } else {
                            customerFormik.setFieldValue('age', 0)
                        }
                    }}
                    onBlur={customerFormik.handleBlur}
                    touched={customerFormik.touched.dob}
                    errorMessage={customerFormik.errors.dob}
                />

                <FormField id="email" label="Email" type="email"
                    value={customerFormik.values.email}
                    onChange={customerFormik.handleChange}
                    onBlur={customerFormik.handleBlur}
                    touched={customerFormik.touched.email}
                    errorMessage={customerFormik.errors.email}
                />

                <FormField id="phone" label="Phone"
                    value={customerFormik.values.phone}
                    onChange={customerFormik.handleChange}
                    onBlur={customerFormik.handleBlur}
                    touched={customerFormik.touched.phone}
                    errorMessage={customerFormik.errors.phone}
                />

                <FormField id="fatherName" label="Father Name"
                    value={customerFormik.values.fatherName}
                    onChange={customerFormik.handleChange}
                    onBlur={customerFormik.handleBlur}
                    touched={customerFormik.touched.fatherName}
                    errorMessage={customerFormik.errors.fatherName}
                />

                <FormField id="address" label="Address"
                    value={customerFormik.values.address}
                    onChange={customerFormik.handleChange}
                    onBlur={customerFormik.handleBlur}
                    touched={customerFormik.touched.address}
                    errorMessage={customerFormik.errors.address}
                />

                <FormField id="pincode" label="Pincode"
                    value={customerFormik.values.pincode}
                    onChange={customerFormik.handleChange}
                    onBlur={customerFormik.handleBlur}
                    touched={customerFormik.touched.pincode}
                    errorMessage={customerFormik.errors.pincode}
                />

                <FormField id="skills" label="Choose Skills" type="checkbox"
                    options={skillOptions} value={customerFormik.values.skills}
                    onChange={customerFormik.handleChange}
                    touched={customerFormik.touched.skills}
                    errorMessage={customerFormik.errors.skills}
                />

                <FormField id="comments" label="Comments" elementName="textarea"
                    value={customerFormik.values.comments}
                    onChange={customerFormik.handleChange}
                    onBlur={customerFormik.handleBlur}
                    placeholder="Comments..."
                    touched={customerFormik.touched.comments}
                    errorMessage={customerFormik.errors.comments}
                />
            </div>

            <div className="d-flex customer-actions">
                <button onClick={() => {    
                    customerFormik.resetForm();
                    navigate(-1)
                }}>
                    Back
                </button>
                <button className="ml-auto" role="save" type="submit" disabled={customerFormik.isSubmitting}>
                    Submit
                </button>
            </div>
        </form>
    );
}

export default CustomerInfo;