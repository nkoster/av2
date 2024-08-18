package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

// Helper function to load file content into a template.HTML
func loadFileContent(filePath string) template.HTML {
	content, err := os.ReadFile(filePath)
	if err != nil {
		return template.HTML("Error loading file")
	}
	return template.HTML(content)
}

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Load index.html from the "ui" directory
		t, _ := template.ParseFiles(filepath.Join("ui", "index.html"))
		content := loadFileContent(filepath.Join("templates", "home.html")) // Load the content of home.html
		if err := t.Execute(w, map[string]template.HTML{"Content": content}); err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/over", func(w http.ResponseWriter, r *http.Request) {
		// Load index.html from the "ui" directory and content from the "templates" directory
		t, _ := template.ParseFiles(filepath.Join("ui", "index.html"))
		// Load the content of over.html
		content := loadFileContent(filepath.Join("templates", "over.html"))
		if err := t.Execute(w, map[string]template.HTML{"Content": content}); err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/producten", func(w http.ResponseWriter, r *http.Request) {
		// Load index.html from the "ui" directory and content from the "templates" directory
		t, _ := template.ParseFiles(filepath.Join("ui", "index.html"))
		// Load the content of producten.html
		content := loadFileContent(filepath.Join("templates", "producten.html"))
		if err := t.Execute(w, map[string]template.HTML{"Content": content}); err != nil {
			fmt.Println(err)
		}
	})

	http.HandleFunc("/contact", func(w http.ResponseWriter, r *http.Request) {
		// Load index.html from the "ui" directory and content from the "templates" directory
		t, _ := template.ParseFiles(filepath.Join("ui", "index.html"))
		// Load the content of contact.html
		content := loadFileContent(filepath.Join("templates", "contact.html"))
		if err := t.Execute(w, map[string]template.HTML{"Content": content}); err != nil {
			fmt.Println(err)
		}
	})
	fmt.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
