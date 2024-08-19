package main

import (
	"fmt"
	"html/template"
	"net/http"
	"path/filepath"
)

func routeContact(w http.ResponseWriter, r *http.Request) {
	// Load index.html from the "ui" directory and content from the "templates" directory
	t, _ := template.ParseFiles(filepath.Join("ui", "index.html"))
	// Load the content of contact.html
	content := loadFileContent(filepath.Join("templates", "contact.html"))
	if err := t.Execute(w, map[string]template.HTML{"Content": content}); err != nil {
		fmt.Println(err)
	}
}
