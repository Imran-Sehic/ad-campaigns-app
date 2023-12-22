package main

import (
	"example/go-ad-campaigns/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(corsMiddleware())

	controllers.SetupRoutes(router)

	// Run the server
	router.Run(":8080")
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Cache-Control, Origin, Authorization, cache")

		// Handle preflight requests
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}

		c.Next()
	}
}
