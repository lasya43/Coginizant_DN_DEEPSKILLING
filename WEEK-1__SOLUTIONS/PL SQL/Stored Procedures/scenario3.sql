CREATE TABLE BankAccounts (
    AccountID    NUMBER PRIMARY KEY,
    CustomerID   NUMBER,
    Balance      NUMBER
);

INSERT INTO BankAccounts VALUES (301, 1, 20000);
INSERT INTO BankAccounts VALUES (302, 2, 5000);

CREATE OR REPLACE PROCEDURE TransferFunds(
    from_acc IN NUMBER,
    to_acc IN NUMBER,
    amount IN NUMBER) IS
    insufficient_balance EXCEPTION;
BEGIN
    DECLARE
        from_balance NUMBER;
    BEGIN
        SELECT Balance INTO from_balance FROM BankAccounts WHERE AccountID = from_acc;

        IF from_balance < amount THEN
            RAISE insufficient_balance;
        END IF;

        UPDATE BankAccounts
        SET Balance = Balance - amount
        WHERE AccountID = from_acc;

        UPDATE BankAccounts
        SET Balance = Balance + amount
        WHERE AccountID = to_acc;

        DBMS_OUTPUT.PUT_LINE(
            'Transferred Rs.' || amount || 
            ' from AccountID ' || from_acc || 
            ' to AccountID ' || to_acc
        );
    EXCEPTION
        WHEN insufficient_balance THEN
            DBMS_OUTPUT.PUT_LINE(
                'Transfer failed: Insufficient balance in AccountID ' || from_acc
            );
    END;
END;
/
SET SERVEROUTPUT ON;
BEGIN
    transferfunds(301,302,5000);
END;
/