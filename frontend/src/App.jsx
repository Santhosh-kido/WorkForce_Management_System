import { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFormModal from './components/EmployeeFormModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import InfoModal from './components/InfoModal';
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from './api/employeeApi';
import { parseJoiningDate } from './utils/dateUtils';
import './App.css';

const initialFilterValues = {
  id: '',
  name: '',
  dept: '',
  year: '',
  month: '',
};

export default function App() {
  const [view, setView] = useState('initial'); // 'initial' | 'details'
  const [allEmployees, setAllEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter bar states: 'all' | 'id' | 'name' | 'dept' | 'date'
  const [filterType, setFilterType] = useState('all');
  const [filterValues, setFilterValues] = useState(initialFilterValues);

  // Form modal state (Add / Update)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' | 'update'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Info modal state (only for Add, Update, Delete notifications)
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  // Re-fetch all employees and preserve current filter state
  const refreshEmployees = async () => {
    try {
      const data = await getEmployees();
      const list = Array.isArray(data) ? data : [];
      setAllEmployees(list);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setAllEmployees([]);
    }
  };

  // Initial landing view button click
  const handleInitialClick = async () => {
    setIsLoading(true);
    try {
      const data = await getEmployees();
      setAllEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setAllEmployees([]);
    } finally {
      setIsLoading(false);
      setView('details');
    }
  };

  // Derived visibleEmployees based on active filter rule (all instantaneous client-side in memory)
  const visibleEmployees = useMemo(() => {
    // Filter rule 1: "All Employees" shows the full list
    if (filterType === 'all') {
      return allEmployees;
    }

    // Filter rule 2: "By ID" - startsWith match on empId as string
    if (filterType === 'id') {
      const typedId = filterValues.id.trim();
      if (!typedId) return allEmployees;
      return allEmployees.filter((emp) =>
        String(emp.empId).startsWith(typedId)
      );
    }

    // Filter rule 3: "By Name" - instantaneous case-insensitive contains match (just like Department)
    if (filterType === 'name') {
      const typedName = filterValues.name.trim().toLowerCase();
      if (!typedName) return allEmployees;
      return allEmployees.filter(
        (emp) =>
          emp.empName && String(emp.empName).toLowerCase().includes(typedName)
      );
    }

    // Filter rule 4: "By Department" - case-insensitive contains match on dept
    if (filterType === 'dept') {
      const typedDept = filterValues.dept.trim().toLowerCase();
      if (!typedDept) return allEmployees;
      return allEmployees.filter(
        (emp) =>
          emp.dept && String(emp.dept).toLowerCase().includes(typedDept)
      );
    }

    // Filter rule 5: "By Joining Date" - Year startsWith match AND Month equality match
    if (filterType === 'date') {
      const typedYear = filterValues.year.trim();
      const selectedMonth =
        filterValues.month !== '' ? Number(filterValues.month) : null;

      // If Year is empty and Month is "All Months", show full list
      if (!typedYear && selectedMonth === null) return allEmployees;

      return allEmployees.filter((emp) => {
        const parsed = parseJoiningDate(emp.joiningDt);
        // Employees whose date cannot be parsed are excluded when a date filter is active
        if (!parsed) return false;

        // Year match: startsWith on 4-digit year string
        if (typedYear && !String(parsed.year).startsWith(typedYear)) {
          return false;
        }

        // Month match: compares month number (1 to 12)
        if (selectedMonth !== null && parsed.month !== selectedMonth) {
          return false;
        }

        return true;
      });
    }

    return allEmployees;
  }, [allEmployees, filterType, filterValues]);

  // When dropdown changes: clear all filter inputs, show selected inputs, reload full list
  const handleFilterTypeChange = (newType) => {
    setFilterType(newType);
    setFilterValues(initialFilterValues);
  };

  // Change individual filter input values live
  const handleFilterValueChange = (field, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Reset dropdown to "All Employees", empty all inputs, show full list
  const handleClear = () => {
    setFilterType('all');
    setFilterValues(initialFilterValues);
  };

  // Open Add modal
  const handleOpenAddModal = () => {
    setFormMode('add');
    setSelectedEmployee(null);
    setIsFormModalOpen(true);
  };

  // Open Update modal
  const handleOpenUpdateModal = (employee) => {
    setFormMode('update');
    setSelectedEmployee(employee);
    setIsFormModalOpen(true);
  };

  // Submit Add or Update
  const handleFormSubmit = async (formData) => {
    if (formMode === 'add') {
      try {
        await addEmployee(formData);
        setIsFormModalOpen(false);
        setInfoModal({
          isOpen: true,
          title: 'Success',
          message: 'Employee Added Successfully!!',
        });
      } catch (err) {
        console.error('Add employee error:', err);
        setInfoModal({
          isOpen: true,
          title: 'Error',
          message: err.message || 'Employee Already Exist!',
        });
      }
    } else {
      try {
        await updateEmployee(formData);
        setIsFormModalOpen(false);
        setInfoModal({
          isOpen: true,
          title: 'Success',
          message: 'Employee Updated Successfully.',
        });
      } catch (err) {
        console.error('Update employee error:', err);
        setInfoModal({
          isOpen: true,
          title: 'Error',
          message: err.message || 'Employee Already up to Date',
        });
      }
    }
  };

  // Open Delete modal
  const handleOpenDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
      setInfoModal({
        isOpen: true,
        title: 'Success',
        message: 'Employee Deleted Successfully!!',
      });
    } catch (err) {
      console.error('Delete employee error:', err);
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
      setInfoModal({
        isOpen: true,
        title: 'Error',
        message: 'unable to delete employee',
      });
    }
  };

  // Close Info Modal & re-fetch employees while re-applying the current filter
  const handleCloseInfoModal = () => {
    setInfoModal({ isOpen: false, title: '', message: '' });
    if (view === 'details') {
      refreshEmployees();
    }
  };

  return (
    <div className="container">
      <Header />

      <main className="main-content">
        {view === 'initial' ? (
          <div className="initial-view">
            <div className="initial-card">
              <div className="initial-icon-wrap">👥</div>
              <p>
                Access, search, update, and manage your organization&apos;s
                employee records seamlessly in real time.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-big"
                onClick={handleInitialClick}
                disabled={isLoading}
              >
                {isLoading ? 'Loading Records...' : 'Employee Details'}
              </button>
            </div>
          </div>
        ) : (
          <div className="details-section">
            <div className="section-header">
              <h2>Employee Details</h2>
              {visibleEmployees.length > 0 && (
                <span className="record-badge">
                  {visibleEmployees.length}{' '}
                  {visibleEmployees.length === 1 ? 'record' : 'records'}
                </span>
              )}
            </div>

            <div className="panel">
              <FilterBar
                filterType={filterType}
                onFilterTypeChange={handleFilterTypeChange}
                filterValues={filterValues}
                onFilterValueChange={handleFilterValueChange}
                onClear={handleClear}
                onOpenAddModal={handleOpenAddModal}
              />

              <EmployeeTable
                employees={visibleEmployees}
                onEdit={handleOpenUpdateModal}
                onDelete={handleOpenDeleteModal}
              />
            </div>
          </div>
        )}
      </main>

      <EmployeeFormModal
        key={
          isFormModalOpen
            ? `${formMode}-${selectedEmployee?.empId ?? 'new'}`
            : 'closed'
        }
        isOpen={isFormModalOpen}
        mode={formMode}
        employee={selectedEmployee}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        employee={employeeToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <InfoModal
        isOpen={infoModal.isOpen}
        title={infoModal.title}
        message={infoModal.message}
        onClose={handleCloseInfoModal}
      />
    </div>
  );
}
