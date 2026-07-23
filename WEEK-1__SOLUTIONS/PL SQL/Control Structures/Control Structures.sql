CREATE TABLE Customers (
    CustomerID   NUMBER PRIMARY KEY,
    Name         VARCHAR2(100),
    Age          NUMBER,
    Balance      NUMBER,
    IsVIP        CHAR(1) DEFAULT 'N'  
);

CREATE TABLE Loans (
    LoanID         NUMBER PRIMARY KEY,
    CustomerID     NUMBER,
    InterestRate   NUMBER(5,2),
    DueDate        DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);


INSERT INTO Customers VALUES (1, 'Nithesh', 65, 12000, 'N');
INSERT INTO Customers VALUES (2, 'Krishnasamy', 45, 8000, 'N');
INSERT INTO Customers VALUES (3, 'Mallika', 70, 15000, 'N');


INSERT INTO Loans VALUES (101, 1, 8.50, SYSDATE + 20);
INSERT INTO Loans VALUES (102, 2, 9.00, SYSDATE + 45);
INSERT INTO Loans VALUES (103, 3, 7.75, SYSDATE + 10);

SET SERVEROUTPUT ON;
--scenario 1
BEGIN
    FOR cust IN (
        SELECT c.CustomerID,c.Name, l.LoanID, l.InterestRate
        FROM Customers c
        JOIN Loans l ON c.CustomerID = l.CustomerID
        WHERE c.Age > 60
    )
    LOOP
        UPDATE Loans
        SET InterestRate = InterestRate - 1
        WHERE LoanID = cust.LoanID;
        DBMS_OUTPUT.PUT_LINE(
            'Interest rate updated for Customer ' || cust.Name ||
            ' (CustomerID: ' || cust.CustomerID || 
            ') on LoanID ' || cust.LoanID || 
            '. Old Rate: ' || cust.InterestRate ||
            ', New Rate: ' || (cust.InterestRate - 1)
        );
    END LOOP;
END;
/

--scenario 2
BEGIN
    FOR cust IN (
        SELECT CustomerID, Name, Balance
        FROM Customers
        WHERE Balance > 10000
    )
    LOOP
        UPDATE Customers
        SET IsVIP = 'Y'
        WHERE CustomerID = cust.CustomerID;

        DBMS_OUTPUT.PUT_LINE(
            'Customer ' || cust.Name ||
            ' (CustomerID: ' || cust.CustomerID || 
            ') has been promoted to VIP. Balance: Rs.' || cust.Balance
        );
    END LOOP;
END;
/

--scenario 3
BEGIN
    FOR loan_rec IN (
        SELECT l.LoanID, c.Name, l.DueDate
        FROM Loans l
        JOIN Customers c ON l.CustomerID = c.CustomerID
        WHERE l.DueDate <= SYSDATE + 30
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Loan ' || loan_rec.LoanID || 
            ' for Customer ' || loan_rec.Name || 
            ' is due on ' || loan_rec.DueDate
        );
    END LOOP;
END;
/