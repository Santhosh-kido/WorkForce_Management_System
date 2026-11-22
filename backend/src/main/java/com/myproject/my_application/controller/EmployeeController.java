
package com.myproject.my_application.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myproject.my_application.entity.EmployeeDetails;
import com.myproject.my_application.requests.AddEmployeeReq;
import com.myproject.my_application.service.EmployeeService;

@RestController
@CrossOrigin(origins = "*")
public class EmployeeController {
    final EmployeeService empService;

    EmployeeController(EmployeeService empService) {
        this.empService = empService;
    }

    @GetMapping("/get-employee")
    public ResponseEntity<Object> getAllEmployees() {
        return new ResponseEntity<>(empService.fetchAllEmployees(), HttpStatus.OK);
    }

    @GetMapping("/employees")
    public Object getEmployees() {
        return empService.fetchAllEmployees();
    }

    @GetMapping("/get-employees")
    public Object getAllEmployeesPlural() {
        return empService.fetchAllEmployees();
    }

    @GetMapping("/get-employee/{id}")
    public ResponseEntity<EmployeeDetails> getEmployeeById(@PathVariable int id) {
        return ResponseEntity.ok(empService.fetchEmployeeId(id));
    }

    @GetMapping("/search-by-name")
    public ResponseEntity<List<EmployeeDetails>> getMethodName(@RequestParam String name) {
        return ResponseEntity.ok(empService.searchByName(name));
    }

    @PostMapping("/add-employee")
    public ResponseEntity<String> postMethodName(@RequestBody AddEmployeeReq addEmpReq) {
        return ResponseEntity.ok(empService.addNewEmployee(addEmpReq));
    }

    @PutMapping("/update-emp")
    public ResponseEntity<String> putMethodName(@RequestBody EmployeeDetails empDtls) {
        return ResponseEntity.ok(empService.updateEmployee(empDtls));
    }

    @DeleteMapping("/delete-employee/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
        return ResponseEntity.ok(empService.delEmployee(id));
    }
}
