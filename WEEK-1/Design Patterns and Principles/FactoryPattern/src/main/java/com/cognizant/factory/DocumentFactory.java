package com.cognizant.factory;

public class DocumentFactory {

    public static Document createDocument(String type) {

        if (type.equalsIgnoreCase("WORD")) {
            return new WordDocument();
        } else if (type.equalsIgnoreCase("PDF")) {
            return new PdfDocument();
        } else if (type.equalsIgnoreCase("EXCEL")) {
            return new ExcelDocument();
        } else {
            throw new IllegalArgumentException("Invalid Document Type");
        }
    }
}