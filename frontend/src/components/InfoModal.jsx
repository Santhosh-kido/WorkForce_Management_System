export default function InfoModal({
  isOpen,
  title,
  message,
  onClose,
}) {
  if (!isOpen) {
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

        <div className="modal-icon info-icon">ℹ️</div>

        <h3 className="modal-title">{title}</h3>

        <p className="modal-message">{message}</p>

        <div className="modal-btn-row modal-btn-row-center">
          <button
            type="button"
            className="btn btn-info-ok"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
