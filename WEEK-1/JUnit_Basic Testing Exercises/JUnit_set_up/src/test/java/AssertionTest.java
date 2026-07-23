import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AssertionTest {

    @Test
    void testAddition() {
        assertEquals(30, 10 + 20);
    }

    @Test
    void testPositive() {
        assertTrue(10 > 5);
    }

    @Test
    void testNull() {
        String s = null;
        assertNull(s);
    }
}