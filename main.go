package main

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"html/template"
	"log"
	"net/http"
	"os"
)

var db *sql.DB
var err error

// Helper function to load file content into a template.HTML
func loadFileContent(filePath string) template.HTML {
	content, err := os.ReadFile(filePath)
	if err != nil {
		return template.HTML("Error loading file")
	}
	return template.HTML(content)
}

func main() {

	// Load the .env file
	if err = godotenv.Load(); err != nil {
		log.Fatal("No .env file in current directory.")
	}

	port := os.Getenv("PORT")

	// Connect to the database
	connect()

	mux := http.NewServeMux()

	// Serve static files from the "static" directory
	fs := http.FileServer(http.Dir("static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// Define the routes
	mux.HandleFunc("/over", routeOver)
	mux.HandleFunc("/producten", routeProducten)
	mux.HandleFunc("/product/", routeProduct)
	mux.HandleFunc("/contact", routeContact)
	mux.HandleFunc("/voorwaarden", routeVoorwaarden)
	mux.HandleFunc("/", routeMain)

	// Start the server
	fmt.Printf("Server is running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}
