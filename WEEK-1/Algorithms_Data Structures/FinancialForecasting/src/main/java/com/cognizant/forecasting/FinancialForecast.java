package com.cognizant.forecasting;

public class FinancialForecast {

    // Recursive method to calculate future value
    public static double forecast(double currentValue, double growthRate, int years) {

        if (years == 0) {
            return currentValue;
        }

        return forecast(currentValue * (1 + growthRate), growthRate, years - 1);
    }
}