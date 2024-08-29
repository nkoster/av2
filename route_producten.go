package main

import (
	"bytes"
	"database/sql"
	"fmt"
	"html/template"
	"net/http"
	"path/filepath"
	"strings"
)

func routeProducten(w http.ResponseWriter, r *http.Request) {

	funcMap := template.FuncMap{
		"images": images,
	}

	// Get the products from the database
	products, err := getProducts(db)
	if err != nil {
		http.Error(w, "Failed to get products", http.StatusInternalServerError)
		return
	}

	// Parse the producten.html template with the function map
	productsTemplate, err := template.New("producten.html").Funcs(funcMap).ParseFiles(filepath.Join("templates", "producten.html"))
	if err != nil {
		http.Error(w, "Failed to load products template", http.StatusInternalServerError)
		return
	}

	// Render the producten.html template with the Products data to a buffer
	var productsContent bytes.Buffer
	if err := productsTemplate.Execute(&productsContent, map[string]interface{}{
		"Products": products,
	}); err != nil {
		fmt.Println("Error executing template:", err)
		http.Error(w, "Failed to render products template", http.StatusInternalServerError)
		return
	}

	// Load the index.html template
	indexTemplate, err := template.ParseFiles(filepath.Join("ui", "index.html"))
	if err != nil {
		fmt.Println("Error parsing template:", err)
		http.Error(w, "Failed to load index template", http.StatusInternalServerError)
		return
	}

	// Render the index.html template with the productsContent as "Content"
	data := map[string]interface{}{
		"Content": template.HTML(productsContent.String()),
	}

	if err := indexTemplate.Execute(w, data); err != nil {
		fmt.Println("Error executing template:", err)
		http.Error(w, "Failed to execute index template", http.StatusInternalServerError)
		return
	}

}

func images(input string) []string {
	return strings.Split(input, ",")
}

func getProducts(db *sql.DB) ([]Product, error) {
	rows, err := db.Query("SELECT id, title, images, descr, specs, price, weight, length, width, height FROM products")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []Product
	for rows.Next() {
		var p Product
		if err := rows.Scan(&p.ID, &p.Title, &p.Images, &p.Descr, &p.Specs, &p.Price, &p.Weight, &p.Length, &p.Width, &p.Height); err != nil {
			return nil, err
		}
		products = append(products, p)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}
