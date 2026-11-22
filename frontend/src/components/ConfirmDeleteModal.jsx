export default function ConfirmDeleteModal({
  isOpen,
  employee,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !employee) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box modal-box-small">
        <div className="modal-header modal-header-centered">
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="modal-icon delete-icon">!</div>

        <h3 className="modal-title">Delete Employee</h3>

        <p className="modal-message">
          Are you sure you want to delete {employee.empName}? This action cannot
          be undone.
        </p>

        <div className="modal-btn-row modal-btn-row-center">
          <button
            type="button"
            className="btn btn-delete-ok"
            onClick={() => onConfirm(employee.empId)}
          >
            OK
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
