package com.myproject.my_application.service.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.http.HttpStatus;

import com.myproject.my_application.entity.EmployeeDetails;
import com.myproject.my_application.exception.EmployeeException;
import com.myproject.my_application.repository.EmployeeDeatilsRepo;
import com.myproject.my_application.requests.AddEmployeeReq;

class EmployeeServiceImplTest {
    private EmployeeDeatilsRepo repository;
    private EmployeeServiceImpl service;

    @BeforeEach
    void setUp() {
        repository = mock(EmployeeDeatilsRepo.class);
        service = new EmployeeServiceImpl(repository);
    }

    @Test
    void addTrimsFieldsAndLowercasesEmail() {
        when(repository.existsByMailIgnoreCase("alice@example.com")).thenReturn(false);

        service.addNewEmployee(new AddEmployeeReq(" Alice ", " ALICE@Example.com ", " Engineering ", 0));

        ArgumentCaptor<EmployeeDetails> employeeCaptor = ArgumentCaptor.forClass(EmployeeDetails.class);
        verify(repository).save(employeeCaptor.capture());
        EmployeeDetails saved = employeeCaptor.getValue();
        assertEquals("Alice", saved.getEmpName());
        assertEquals("alice@example.com", saved.getMail());
        assertEquals("Engineering", saved.getDept());
    }

    @Test
    void addRejectsEmailThatAlreadyExistsIgnoringCase() {
        when(repository.existsByMailIgnoreCase("alice@example.com")).thenReturn(true);

        EmployeeException exception = assertThrows(EmployeeException.class,
                () -> service.addNewEmployee(new AddEmployeeReq("Alice", "ALICE@example.com", "Engineering", 0)));

        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertEquals("An employee with this email already exists.", exception.getMessage());
        verifyNoInteractionsAfterEmailCheck();
    }

    @Test
    void updateRejectsEmailOwnedByAnotherEmployee() {
        EmployeeDetails existing = employee(1, "Alice", "alice@example.com", "Engineering", 100);
        when(repository.findById(1)).thenReturn(Optional.of(existing));
        when(repository.existsByMailIgnoreCaseAndEmpIdNot("bob@example.com", 1)).thenReturn(true);
        EmployeeDetails update = employee(1, "Alice", "Bob@example.com", "Engineering", 100);

        EmployeeException exception = assertThrows(EmployeeException.class, () -> service.updateEmployee(update));

        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertEquals("An employee with this email already exists.", exception.getMessage());
    }

    @Test
    void updateRejectsUnchangedEmployee() {
        EmployeeDetails existing = employee(1, "Alice", "alice@example.com", "Engineering", 100);
        when(repository.findById(1)).thenReturn(Optional.of(existing));
        when(repository.existsByMailIgnoreCaseAndEmpIdNot("alice@example.com", 1)).thenReturn(false);

        EmployeeException exception = assertThrows(EmployeeException.class,
                () -> service.updateEmployee(employee(1, " Alice ", "ALICE@example.com", " Engineering ", 100)));

        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
        assertEquals("Employee is already up to date.", exception.getMessage());
    }

    @Test
    void deleteRejectsMissingEmployee() {
        when(repository.existsById(42)).thenReturn(false);

        EmployeeException exception = assertThrows(EmployeeException.class, () -> service.delEmployee(42));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        assertEquals("Employee not found.", exception.getMessage());
    }

    private EmployeeDetails employee(Integer id, String name, String mail, String dept, double salary) {
        return new EmployeeDetails(id, name, mail, dept, salary, null);
    }

    private void verifyNoInteractionsAfterEmailCheck() {
        verify(repository).existsByMailIgnoreCase("alice@example.com");
        verifyNoMoreInteractions(repository);
    }
}
