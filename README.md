# Mini Leave Management System – Part 1

## Overview

This system is a basic Leave Management MVP that allows:

- Adding employees
- Applying for leave
- Approving/Rejecting leave requests
- Viewing an employee’s leave balance

## Edge Cases (as per assignment)

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
