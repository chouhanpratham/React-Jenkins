variable "rg_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-jenkins"
}

variable "location" {
  description = "Location of the resource group"
  type        = string
  default     = "East US"
}

variable "asp_name" {
  description = "Name of the App Service Plan"
  type        = string
  default     = "asp-pratham-jenkins"
}
variable "as_name" {
  description = "Name of the App Service Plan"
  type        = string
  default     = "webapijenkinspratham2222225"
}
