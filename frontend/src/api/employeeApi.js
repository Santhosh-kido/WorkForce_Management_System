const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:9090";

const defaultHeaders = {
  "Content-Type": "application/json",
};

/**
 * Fetch all employees
 * GET /get-employee -> array of employees
 */
export async function getEmployees() {
  const response = await fetch(`${API_BASE}/get-employee`, {
    method: "GET",
    headers: defaultHeaders,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
}

/**
 * Fetch a single employee by ID
 * GET /get-employee/{id} -> single employee object
 */
export async function getEmployeeById(id) {
  const response = await fetch(`${API_BASE}/get-employee/${id}`, {
    method: "GET",
    headers: defaultHeaders,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error("Employee Not Found!");
  }

  return response.json();
}

/**
 * Search employees by name
 * GET /search-by-name?name=<text> -> array or single object
 */
export async function searchEmployeesByName(name) {
  const response = await fetch(
    `${API_BASE}/search-by-name?name=${encodeURIComponent(name)}`,
    {
      method: "GET",
      headers: defaultHeaders,
      mode: "cors",
    }
  );

  if (!response.ok) {
    throw new Error("Employee Not Found!");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

/**
 * Add a new employee
 * POST /add-employee body: { empName, mail, dept, salary }
 */
export async function addEmployee({ empName, mail, dept, salary }) {
  const parsedSalary = parseInt(salary, 10);
  const response = await fetch(`${API_BASE}/add-employee`, {
    method: "POST",
    headers: defaultHeaders,
    mode: "cors",
    body: JSON.stringify({
      empName,
      mail,
      dept,
      salary: isNaN(parsedSalary) ? 0 : parsedSalary,
    }),
  });

  if (!response.ok) {
    let errorMsg = "Employee Already Exist!";
    try {
      const data = await response.json();
      if (typeof data === "string") {
        errorMsg = data;
      } else if (data && (data.message || data.error)) {
        errorMsg = data.message || data.error;
      }
    } catch {
      try {
        const text = await response.text();
        if (text && text.trim()) {
          errorMsg = text.trim();
        }
      } catch {
        // Fallback to default errorMsg
      }
    }
    throw new Error(errorMsg);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Update existing employee
 * PUT /update-emp body: { empId, empName, mail, dept, salary }
 */
export async function updateEmployee({ empId, empName, mail, dept, salary }) {
  const response = await fetch(`${API_BASE}/update-emp`, {
    method: "PUT",
    headers: defaultHeaders,
    mode: "cors",
    body: JSON.stringify({
      empId: parseInt(empId, 10),
      empName,
      mail,
      dept,
      salary: parseInt(salary, 10),
    }),
  });

  if (!response.ok) {
    throw new Error("Employee Already up to Date");
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Delete employee by ID
 * DELETE /delete-employee/{id}
 */
export async function deleteEmployee(id) {
  const response = await fetch(`${API_BASE}/delete-employee/${id}`, {
    method: "DELETE",
    headers: defaultHeaders,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error("unable to delete employee");
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
