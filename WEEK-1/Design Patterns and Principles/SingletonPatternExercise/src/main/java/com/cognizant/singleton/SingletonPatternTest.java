package com.cognizant.singleton;

public class SingletonPatternTest {

    public static void main(String[] args) {

        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        logger1.log("First Message");
        logger2.log("Second Message");

        if (logger1 == logger2) {
            System.out.println("Both objects are the same. Singleton Pattern works!");
        } else {
            System.out.println("Singleton Pattern failed!");
        }
    }
}