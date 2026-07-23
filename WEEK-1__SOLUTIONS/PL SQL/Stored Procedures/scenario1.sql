CREATE TABLE SavingsAccounts (
    AccountID    NUMBER PRIMARY KEY,
    CustomerID   NUMBER,
    Balance      NUMBER
);

INSERT INTO SavingsAccounts VALUES (201, 1, 10000);
INSERT INTO SavingsAccounts VALUES (202, 2, 8000);
INSERT INTO SavingsAccounts VALUES (203, 3, 15000);

--scenario 1
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest IS
BEGIN
    FOR acc in (SELECT AccountID, Balance FROM SavingsAccounts)
    LOOP
        UPDATE SavingsAccounts
        SET Balance = Balance +(acc.Balance * 0.01) WHERE
        AccountID = acc.AccountID;
        
        DBMS_OUTPUT.PUT_LINE('INTEREST ADDED FOR THE ACC D' || acc.AccountID ||
        ' Old Balanace: ' || acc.Balance ||
        ' New Balance: ' || (acc.Balance + (acc.Balance*0.01)) );
    END LOOP;
END;
/

SET SERVEROUTPUT ON;
BEGIN
    processmonthlyinterest;
END;
/