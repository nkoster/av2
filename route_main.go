package main

import (
	"fmt"
	"html/template"
	"net/http"
	"path/filepath"
)

func routeMain(w http.ResponseWriter, r *http.Request) {
	// Load index.html from the "ui" directory
	t, _ := template.ParseFiles(filepath.Join("ui", "index.html"))
	content := loadFileContent(filepath.Join("templates", "home.html")) // Load the content of home.html
	if err := t.Execute(w, map[string]template.HTML{"Content": content}); err != nil {
		fmt.Println(err)
	}
}
