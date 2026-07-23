import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerDemo {

    private static final Logger logger =
            LoggerFactory.getLogger(LoggerDemo.class);

    public static void main(String[] args) {

        logger.trace("Trace Message");

        logger.debug("Debug Message");

        logger.info("Application Started");

        logger.warn("Low Disk Space");

        logger.error("Database Connection Failed");

    }
}