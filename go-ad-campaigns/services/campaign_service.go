package services

import (
	"example/go-ad-campaigns/data"
	"example/go-ad-campaigns/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func AddCampaign(c *gin.Context) {
	var newCampaign models.Campaign
	if err := c.ShouldBindJSON(&newCampaign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newCampaign.CreatedAt = time.Now()
	data.AddCampaign(newCampaign)

	c.JSON(http.StatusCreated, newCampaign)
}

func GetCampaigns(c *gin.Context) {
	pageStr := c.Query("page")

	// Convert page string to integer
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page value"})
		return
	}

	limit := 10
	start := (page - 1) * limit
	end := page * limit

	totalCampaigns := len(data.Campaigns)
	totalPages := (totalCampaigns + limit - 1) / limit

	// Check if the requested page is greater than the total number of pages
	if page > totalPages {
		// Set the page to the last available page
		page = totalPages
		start = (page - 1) * limit
		end = page * limit
	}

	if end > totalCampaigns {
		end = totalCampaigns
	}

	c.JSON(http.StatusOK, gin.H{"data": data.GetCampaigns(start, end), "pages": totalPages, "records": totalCampaigns, "limit": limit})
}

func UpdateCampaign(c *gin.Context) {
	id := c.Param("id")

	// Find the campaign with the given id
	index, campaign := data.FindCampaignByID(id)
	if campaign == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign not found"})
		return
	}

	var updatedCampaign models.Campaign
	if err := c.ShouldBindJSON(&updatedCampaign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data.UpdateCampaign(index, updatedCampaign)

	c.JSON(http.StatusOK, updatedCampaign)
}

func DeleteCampaign(c *gin.Context) {
	id := c.Param("id")

	// Find the campaign with the given id
	index, campaign := data.FindCampaignByID(id)
	if campaign == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign not found"})
		return
	}

	data.DeleteCampaign(index)

	c.JSON(http.StatusOK, gin.H{"message": "Campaign deleted successfully"})
}
