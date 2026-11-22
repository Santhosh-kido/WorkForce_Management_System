package com.myproject.my_application.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee")
public class EmployeeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee_details_seq")
    @SequenceGenerator(name = "employee_details_seq",
            sequenceName = "employee_details_emp_id_seq", allocationSize = 1)
    @Column(name = "emp_id")
    private Integer empId;

    @Column(name = "emp_name")
    private String empName;

    @Column(name = "email")
    private String mail;

    @Column(name = "department")
    private String dept;

    @Column(name = "salary")
    private double salary;

    @Column(name = "joining_date")
    private LocalDate joiningDt;

    public EmployeeDetails() {}

    public EmployeeDetails(Integer empId, String empName, String mail, String dept,
                           double salary, LocalDate joiningDt) {
        this.empId = empId;
        this.empName = empName;
        this.mail = mail;
        this.dept = dept;
        this.salary = salary;
        this.joiningDt = joiningDt;
    }

    // Sets today's date if no joining date is given
    @PrePersist
    public void onCreate() {
        if (joiningDt == null) joiningDt = LocalDate.now();
    }

    public Integer getEmpId() { return empId; }
    public void setEmpId(Integer empId) { this.empId = empId; }

    public String getEmpName() { return empName; }
    public void setEmpName(String empName) { this.empName = empName; }

    public String getMail() { return mail; }
    public void setMail(String mail) { this.mail = mail; }

    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }

    public LocalDate getJoiningDt() { return joiningDt; }
    public void setJoiningDt(LocalDate joiningDt) { this.joiningDt = joiningDt; }
}