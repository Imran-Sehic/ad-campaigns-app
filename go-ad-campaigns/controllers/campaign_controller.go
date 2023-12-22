package controllers

import (
	"example/go-ad-campaigns/services"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.GET("/campaigns", services.GetCampaigns)
	router.POST("/campaigns", services.AddCampaign)
	router.PUT("/campaigns/:id", services.UpdateCampaign)
	router.DELETE("/campaigns/:id", services.DeleteCampaign)
}
