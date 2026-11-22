import { useState } from 'react';

export default function EmployeeFormModal({
  isOpen,
  mode, // 'add' or 'update'
  employee,
  onClose,
  onSubmit,
}) {
  const isUpdate = mode === 'update';
  const title = isUpdate ? 'Update Employee' : 'Add New Employee';
  const submitText = isUpdate ? 'Update' : 'Submit';

  const [formData, setFormData] = useState(() => ({
    empId: isUpdate && employee ? employee.empId ?? '' : '',
    empName: isUpdate && employee ? employee.empName ?? '' : '',
    mail: isUpdate && employee ? employee.mail ?? '' : '',
    dept: isUpdate && employee ? employee.dept ?? '' : '',
    salary: isUpdate && employee ? employee.salary ?? '' : '',
  }));

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box">
        <div className="modal-header">
          <h3>{title}</h3>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isUpdate && (
            <div className="form-group">
              <label htmlFor="modal-empId">Employee ID:</label>
              <input
                id="modal-empId"
                name="empId"
                type="number"
                className="form-input"
                value={formData.empId}
                readOnly
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="modal-empName">Full Name:</label>
            <input
              id="modal-empName"
              name="empName"
              type="text"
              className="form-input"
              value={formData.empName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="modal-mail">Email Address:</label>
            <input
              id="modal-mail"
              name="mail"
              type="email"
              className="form-input"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="modal-dept">Department:</label>
            <input
              id="modal-dept"
              name="dept"
              type="text"
              className="form-input"
              value={formData.dept}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="modal-salary">Salary:</label>
            <input
              id="modal-salary"
              name="salary"
              type="number"
              className="form-input"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-btn-row">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
