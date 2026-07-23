import org.junit.jupiter.api.*;

public class CalculatorTest {

    @BeforeAll
    static void startTests() {
        System.out.println("Opening database connection...");
    }

    @AfterAll
    static void endTests() {
        System.out.println("Closing database connection...");
    }

    @Test
    void testOne() {
        System.out.println("Running Test 1");
    }

    @Test
    void testTwo() {
        System.out.println("Running Test 2");
    }
}