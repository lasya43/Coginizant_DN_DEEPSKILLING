CREATE TABLE Employees (
    EmpID        NUMBER PRIMARY KEY,
    Name         VARCHAR2(100),
    Department   VARCHAR2(50),
    Salary       NUMBER
);

INSERT INTO Employees VALUES (1, 'Nithesh', 'IT', 690000);
INSERT INTO Employees VALUES (2, 'Mallika', 'IT', 60000);
INSERT INTO Employees VALUES (3, 'Krishnasaamy', 'HR', 55000);

CREATE OR REPLACE PROCEDURE UpdateEmpolyeeBonus( dept_name in VARCHAR2, bonus in NUMBER) IS
    BEGIN
        FOR emp IN (
        SELECT EmpID, Name, Salary FROM Employees WHERE Department = dept_name)
        LOOP
            UPDATE Employees
            SET Salary = Salary + (emp.Salary * bonus/100) WHERE EmpID = emp.EmpID;
            
            DBMS.OUTPUT.PUT_LINE('bonus added for ' || emp.Name ||
             ' Old Salary: ' || emp.Salary || 
            ' New Salary: ' || (emp.Salary + (emp.Salary * bonus/ 100)));
    END LOOP;
END;
/
BEGIN
    UpdateEmployeeBonus('IT',10);
END;
/           