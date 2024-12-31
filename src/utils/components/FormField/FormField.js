import './FormField.css';

function FormField({ id, type = 'text', elementName = 'input',label, value, onChange, options, onBlur, optionsValueKey = '_id', optionsDisplayKey = 'value', placeholder, touched, errorMessage }) {

    return (
        <div id={`formik_${id}`} className="form-field">
            <label className="form-label" htmlFor={id}>{label}</label>
            {elementName === 'textarea' &&
                <textarea className="form-input"
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur} 
                    placeholder={placeholder}
                /> 
            }
            {elementName === 'input' && type !== 'checkbox' && 
                <input className="form-input"
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                />
            }
            {type === 'checkbox' && 
                <div className="d-flex options-list">
                    {options.map((option) => (
                      <label className="d-flex" key={option[optionsValueKey]}>
                        <input
                          type={type}
                          name={id}
                          value={option[optionsValueKey]}
                          checked={value.some((item) => item === option[optionsValueKey])}
                          onChange={onChange}
                        />
                        {option[optionsDisplayKey]}
                      </label>
                    ))}
                </div>
            }
            {touched && errorMessage && (
                <span className="error-message">{errorMessage}</span>
            )}
        </div>
    )
}

export default FormField;