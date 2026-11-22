export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="employee-table">
        <thead>
          <tr>
            <th className="th-id">ID</th>
            <th className="th-name">Name</th>
            <th className="th-email">Email</th>
            <th className="th-dept">Department</th>
            <th className="th-salary">Salary</th>
            <th className="th-date">Date of Joining</th>
            <th className="th-action">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.empId}>
                <td className="td-id">#{emp.empId}</td>
                <td className="td-name">{emp.empName}</td>
                <td className="td-email">{emp.mail}</td>
                <td>
                  <span className="dept-badge">{emp.dept}</span>
                </td>
                <td className="td-salary">
                  {emp.salary != null && !isNaN(emp.salary)
                    ? Number(emp.salary).toLocaleString()
                    : 'N/A'}
                </td>
                <td className="td-date">{emp.joiningDt ?? 'N/A'}</td>
                <td>
                  <div className="action-cell">
                    <button
                      type="button"
                      className="action-btn edit-btn"
                      title="Edit"
                      onClick={() => onEdit(emp)}
                      aria-label={`Edit ${emp.empName}`}
                    >
                      ✏️
                    </button>
                    <span className="action-separator" />
                    <button
                      type="button"
                      className="action-btn delete-btn"
                      title="Delete"
                      onClick={() => onDelete(emp)}
                      aria-label={`Delete ${emp.empName}`}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="no-data">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
