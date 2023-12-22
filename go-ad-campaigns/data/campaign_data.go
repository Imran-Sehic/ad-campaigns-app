package data

import (
	"example/go-ad-campaigns/models"
	"sync"
	"time"
)

var Campaigns = []models.Campaign{
	{ID: "1", Name: "Campaign 1", Status: "active", CreatedAt: time.Date(2023, time.March, 15, 10, 11, 25, 0, time.UTC)},
	{ID: "2", Name: "Campaign 2", Status: "active", CreatedAt: time.Date(2023, time.March, 18, 9, 25, 10, 0, time.UTC)},
	{ID: "3", Name: "Campaign 3", Status: "active", CreatedAt: time.Date(2023, time.March, 25, 13, 7, 14, 0, time.UTC)},
	{ID: "4", Name: "Campaign 4", Status: "paused", CreatedAt: time.Date(2023, time.May, 7, 11, 17, 0, 0, time.UTC)},
	{ID: "5", Name: "Campaign 5", Status: "paused", CreatedAt: time.Date(2023, time.May, 22, 14, 22, 2, 0, time.UTC)},
	{ID: "6", Name: "Campaign 6", Status: "paused", CreatedAt: time.Date(2023, time.June, 1, 13, 10, 59, 0, time.UTC)},
	{ID: "7", Name: "Campaign 7", Status: "active", CreatedAt: time.Date(2023, time.June, 5, 16, 55, 56, 0, time.UTC)},
	{ID: "8", Name: "Campaign 8", Status: "active", CreatedAt: time.Date(2023, time.June, 8, 21, 52, 44, 0, time.UTC)},
	{ID: "9", Name: "Campaign 9", Status: "active", CreatedAt: time.Date(2023, time.June, 12, 17, 34, 13, 0, time.UTC)},
	{ID: "10", Name: "Campaign 10", Status: "paused", CreatedAt: time.Date(2023, time.September, 3, 19, 27, 4, 0, time.UTC)},
	{ID: "11", Name: "Campaign 11", Status: "active", CreatedAt: time.Date(2023, time.September, 3, 22, 4, 15, 0, time.UTC)},
	{ID: "12", Name: "Campaign 12", Status: "active", CreatedAt: time.Date(2023, time.September, 8, 7, 32, 18, 0, time.UTC)},
	{ID: "13", Name: "Campaign 13", Status: "active", CreatedAt: time.Date(2023, time.September, 12, 8, 42, 48, 0, time.UTC)},
	{ID: "14", Name: "Campaign 14", Status: "active", CreatedAt: time.Date(2023, time.September, 21, 8, 11, 12, 0, time.UTC)},
	{ID: "15", Name: "Campaign 15", Status: "active", CreatedAt: time.Date(2023, time.October, 22, 11, 57, 56, 0, time.UTC)},
	{ID: "16", Name: "Campaign 16", Status: "active", CreatedAt: time.Date(2023, time.November, 16, 12, 30, 3, 0, time.UTC)},
	{ID: "17", Name: "Campaign 17", Status: "active", CreatedAt: time.Date(2023, time.November, 18, 10, 14, 50, 0, time.UTC)},
	{ID: "18", Name: "Campaign 18", Status: "paused", CreatedAt: time.Date(2023, time.December, 5, 18, 36, 4, 0, time.UTC)},
}
var mu sync.Mutex

func AddCampaign(campaign models.Campaign) {
	mu.Lock()
	defer mu.Unlock()
	Campaigns = append(Campaigns, campaign)
}

func GetCampaigns(start int, end int) []models.Campaign {
	mu.Lock()
	defer mu.Unlock()
	return Campaigns[start:end]
}

func UpdateCampaign(index int, campaign models.Campaign) {
	mu.Lock()
	defer mu.Unlock()
	Campaigns[index] = campaign
}

func DeleteCampaign(index int) {
	mu.Lock()
	defer mu.Unlock()
	// Remove the campaign from the slice
	Campaigns = append(Campaigns[:index], Campaigns[index+1:]...)
}

func FindCampaignByID(id string) (int, *models.Campaign) {
	for i, campaign := range Campaigns {
		if id == campaign.ID {
			return i, &campaign
		}
	}
	return -1, nil
}
