package com.cognizant.factory;

public class FactoryPatternTest {

    public static void main(String[] args) {

        Document word = DocumentFactory.createDocument("WORD");
        word.open();

        Document pdf = DocumentFactory.createDocument("PDF");
        pdf.open();

        Document excel = DocumentFactory.createDocument("EXCEL");
        excel.open();
    }
}