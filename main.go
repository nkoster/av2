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

	// Connect to the database
	connect()

	// Serve static files from the "static" directory
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// Define the routes
	http.HandleFunc("/", routeMain)
	http.HandleFunc("/over", routeOver)
	http.HandleFunc("/producten", routeProducten)
	http.HandleFunc("/contact", routeContact)

	// Start the server
	fmt.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
