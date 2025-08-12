# **Mini Leave Management System – Part 1**

## **Overview**

The **Mini Leave Management System** is a basic MVP designed for a small startup with around 50 employees.
It provides a simple way to manage employee leave records through REST APIs.

### **Core Features**

* **Add Employee** – Store employee details including name, email, department, and joining date.
* **Apply for Leave** – Employees can submit leave requests with start and end dates, type, and reason.
* **Approve / Reject Leave** – HR can approve or reject requests.
* **Check Leave Balance** – View the remaining leave balance for an employee.

## Edge Cases

1. Leave apply before joining date
2. More days than available balance (PAID)
3. Overlapping leave requests
4. Employee not found
5. Invalid dates (end date before start date)

## APIs

### 1. Add Employee

`POST /employees`
Body:

```json
{
  "name": "Aisha Khan",
  "email": "aisha@example.com",
  "department": "Engineering",
  "joiningDate": "2025-08-01"
}
```

### 2. Apply Leave

`POST /leaves/apply`
Body:

```json
{
  "employeeEmail": "aisha@example.com",
  "type": "PAID",
  "startDate": "2025-08-20",
  "endDate": "2025-08-22",
  "reason": "Family function"
}
```

### 3. Approve Leave

`PATCH /leaves/:id/approve`

### 4. Reject Leave

`PATCH /leaves/:id/reject`

### 5. Get Leave Balance

`GET /employees/:id/leave-balance`

