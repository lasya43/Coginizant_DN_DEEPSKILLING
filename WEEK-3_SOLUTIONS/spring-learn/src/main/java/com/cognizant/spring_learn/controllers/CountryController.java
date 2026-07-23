package com.cognizant.spring_learn.controllers;

import com.cognizant.spring_learn.Country;
import com.cognizant.spring_learn.services.CountryService;
import com.cognizant.spring_learn.services.exception.CountryNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    @GetMapping("/countries/{code}")
    public Country getCountry(@PathVariable String code) throws CountryNotFoundException {
        LOGGER.info("START");

        CountryService countryService = new CountryService();
        Country country = countryService.getCountry(code);

        LOGGER.debug("Country : {}", country.toString());
        LOGGER.info("END");

        return country;
    }

}

