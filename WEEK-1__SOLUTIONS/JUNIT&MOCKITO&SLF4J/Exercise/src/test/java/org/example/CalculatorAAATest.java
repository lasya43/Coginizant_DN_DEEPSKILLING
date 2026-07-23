package org.example;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CalculatorAAATest {

    private Calculator calculator;

    @Before
    public void setUp() {
              calculator = new Calculator();
        System.out.println("Setup executed");
    }

    @After
    public void tearDown() {
                calculator = null;
        System.out.println("Teardown executed");
    }

    @Test
    public void testAdd() {

              int a = 5;
              int b = 3;

               int result = calculator.add(a, b);


        assertEquals(8, result);
    }
}