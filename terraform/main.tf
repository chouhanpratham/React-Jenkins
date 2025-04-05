provider "azurerm" {
  features {}
  subscription_id = "e84d8697-ef3e-4296-9629-cdeb0c1df544"
}

resource "azurerm_resource_group" "rg" {
  name     = var.rg_name
  location = var.location
}

resource "azurerm_service_plan" "plan" {
  name                = var.asp_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Windows"
  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_windows_web_app" "app" {
  name                = "webapijenkinspratham2222225"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    always_on = true

    application_stack {
      node_version = "~20"
    }
  }

  app_settings = {
    WEBSITE_NODE_DEFAULT_VERSION = "~20"
    SCM_DO_BUILD_DURING_DEPLOYMENT = "false"
    WEBSITE_RUN_FROM_PACKAGE = "1"
  }
}




