package main

import (
	"bytes"
	"database/sql"
	"fmt"
	"html/template"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"
)

func routeProduct(w http.ResponseWriter, r *http.Request) {

	productIDStr := strings.TrimPrefix(r.URL.Path, "/product/")

	// Convert the ID to an integer
	productID, _ := strconv.Atoi(productIDStr)

	funcMap := template.FuncMap{
		"images": images,
	}

	// Get the product from the database based on the ID
	product, err := getProductByID(db, productID)
	if err != nil {
		fmt.Println(err)
	}

	// Parse the product.html template with the function map
	productTemplate, err := template.New("product.html").Funcs(funcMap).ParseFiles(filepath.Join("templates", "product.html"))
	if err != nil {
		fmt.Println(err)
	}

	// Render the product.html template with the Product data to a buffer
	var productContent bytes.Buffer
	if err := productTemplate.Execute(&productContent, map[string]interface{}{
		"Product": product,
	}); err != nil {
		fmt.Println(err)
	}

	// Load the index.html template
	indexTemplate, err := template.ParseFiles(filepath.Join("ui", "index.html"))
	if err != nil {
		fmt.Println(err)
	}

	data := map[string]interface{}{
		"Content": template.HTML(productContent.String()),
	}

	if err := indexTemplate.Execute(w, data); err != nil {
		http.Error(w, "Failed to execute index template", http.StatusInternalServerError)
		return
	}
}

// Function to retrieve a single product based on the ID
func getProductByID(db *sql.DB, id int) (Product, error) {
	fmt.Println("getProductByID called with id:", id)
	var p Product
	query := "SELECT id, title, images, descr, specs, price, weight, length, width, height FROM products WHERE id = $1"
	err := db.QueryRow(query, id).Scan(&p.ID, &p.Title, &p.Images, &p.Descr, &p.Specs, &p.Price, &p.Weight, &p.Length, &p.Width, &p.Height)
	if err != nil {
		return p, err
	}
	return p, nil
}
