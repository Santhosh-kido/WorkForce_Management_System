package com.myproject.my_application.service.serviceimpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.myproject.my_application.entity.EmployeeDetails;
import com.myproject.my_application.exception.EmployeeException;
import com.myproject.my_application.repository.EmployeeDeatilsRepo;
import com.myproject.my_application.requests.AddEmployeeReq;
import com.myproject.my_application.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    final EmployeeDeatilsRepo empRepo;

    EmployeeServiceImpl(EmployeeDeatilsRepo empRepo) {
        this.empRepo = empRepo;
    }

    // Fetch All Employee
    @Override
    public Object fetchAllEmployees() {
        List<EmployeeDetails> empList = empRepo.findAll();
        if (empList.isEmpty()) {
            return "No employees found!!";
        }
        return empList;
    }

    // Fetch Employee By Id
    @Override
    public EmployeeDetails fetchEmployeeId(int id) {
        return empRepo.findById(id)
                .orElseThrow(() -> new EmployeeException(HttpStatus.NOT_FOUND, "Employee not found."));
    }

    // Search Employee By Name
    @Override
    public List<EmployeeDetails> searchByName(String name) {
        return empRepo.findByEmpNameIgnoreCaseContaining(name);
    }

    // Add New Employee
    @Override
    public String addNewEmployee(AddEmployeeReq addEmpReq) {
        if (addEmpReq == null) {
            throw new EmployeeException(HttpStatus.BAD_REQUEST, "Request body is invalid.");
        }
        validateEmployee(addEmpReq.getEmpName(), addEmpReq.getMail(), addEmpReq.getDept(), addEmpReq.getSalary());
        String empName = addEmpReq.getEmpName().trim();
        String mail = normalizeMail(addEmpReq.getMail());
        String dept = addEmpReq.getDept().trim();
        ensureEmailIsAvailable(mail);

        EmployeeDetails empDetails = new EmployeeDetails();
        empDetails.setDept(dept);
        empDetails.setJoiningDt(LocalDate.now());
        empDetails.setEmpName(empName);
        empDetails.setMail(mail);
        empDetails.setSalary(addEmpReq.getSalary());

        empRepo.save(empDetails);

        return "Employee created successfully!!";
    }

    @Override
    public String updateEmployee(EmployeeDetails empDtls) {
        if (empDtls == null) {
            throw new EmployeeException(HttpStatus.BAD_REQUEST, "Request body is invalid.");
        }
        Integer empId = empDtls.getEmpId();
        EmployeeDetails existing = empId == null ? null : empRepo.findById(empId).orElse(null);
        if (existing == null) {
            throw new EmployeeException(HttpStatus.NOT_FOUND, "Employee not found.");
        }

        validateEmployee(empDtls.getEmpName(), empDtls.getMail(), empDtls.getDept(), empDtls.getSalary());
        String empName = empDtls.getEmpName().trim();
        String mail = normalizeMail(empDtls.getMail());
        String dept = empDtls.getDept().trim();
        if (empRepo.existsByMailIgnoreCaseAndEmpIdNot(mail, empId)) {
            throw emailAlreadyExists();
        }

        if (Objects.equals(existing.getEmpName(), empName)
                && Objects.equals(existing.getMail() == null ? null : normalizeMail(existing.getMail()), mail)
                && Objects.equals(existing.getDept(), dept)
                && Double.compare(existing.getSalary(), empDtls.getSalary()) == 0) {
            throw new EmployeeException(HttpStatus.CONFLICT, "Employee is already up to date.");
        }

        existing.setEmpName(empName);
        existing.setMail(mail);
        existing.setDept(dept);
        existing.setSalary(empDtls.getSalary());
        empRepo.save(existing);
        return "Employee Updated Successfully!!";
    }

    // Delete an Employee
    @Override
    public String delEmployee(int id) {
        if (!empRepo.existsById(id)) {
            throw new EmployeeException(HttpStatus.NOT_FOUND, "Employee not found.");
        }
        empRepo.deleteById(id);
        return "Employee Deleted Successfully!!";
    }

    private void validateEmployee(String empName, String mail, String dept, double salary) {
        if (empName == null || empName.trim().isEmpty()) {
            throw new EmployeeException(HttpStatus.BAD_REQUEST, "Name is required.");
        }
        if (mail == null || mail.trim().isEmpty()) {
            throw new EmployeeException(HttpStatus.BAD_REQUEST, "Email is required.");
        }
        if (!EMAIL_PATTERN.matcher(mail.trim()).matches()) {
            throw new EmployeeException(HttpStatus.BAD_REQUEST, "Email must be valid.");
        }
        if (dept == null || dept.trim().isEmpty()) {
            throw new EmployeeException(HttpStatus.BAD_REQUEST, "Department is required.");
        }
        if (!Double.isFinite(salary) || salary < 0) {
            throw new EmployeeException(HttpStatus.BAD_REQUEST, "Salary must be 0 or more.");
        }
    }

    private String normalizeMail(String mail) {
        return mail.trim().toLowerCase(Locale.ROOT);
    }

    private void ensureEmailIsAvailable(String mail) {
        if (empRepo.existsByMailIgnoreCase(mail)) {
            throw emailAlreadyExists();
        }
    }

    private EmployeeException emailAlreadyExists() {
        return new EmployeeException(HttpStatus.CONFLICT,
                "An employee with this email already exists.");
    }
}
