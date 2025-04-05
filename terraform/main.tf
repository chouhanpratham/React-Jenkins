provider "azurerm" {
  features {}
  subscription_id = "e84d8697-ef3e-4296-9629-cdeb0c1df544"
}

resource "azurerm_resource_group" "rg" {
  name     = var.rg_name
  location = var.location
}

# App Service Plan
resource "azurerm_app_service_plan" "plan" {
  name                = var.asp_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "Windows"

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "app" {
  name                = var.as_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.plan.id

  site_config {
    always_on         = true
    windows_fx_version = "NODE|20-lts"
  }

  app_settings = {
    WEBSITE_NODE_DEFAULT_VERSION = "20.0.0"
    WEBSITE_RUN_FROM_PACKAGE     = "1"
  }
}


