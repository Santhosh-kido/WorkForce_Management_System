package com.myproject.my_application.requests;

public class AddEmployeeReq {

    private String empName;
    private String mail;
    private String dept;
    private double salary;

    public AddEmployeeReq() {}

    public AddEmployeeReq(String empName, String mail, String dept, double salary) {
        this.empName = empName;
        this.mail = mail;
        this.dept = dept;
        this.salary = salary;
    }

    public String getEmpName() { return empName; }
    public void setEmpName(String empName) { this.empName = empName; }

    public String getMail() { return mail; }
    public void setMail(String mail) { this.mail = mail; }

    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }

}
