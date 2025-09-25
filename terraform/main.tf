data "aws_caller_identity" "current" {}
data "aws_region" "primary" {}
data "aws_iam_role" "stack" {
  name = local.stack_id
}

locals {
  stack_id = "idp-template-node-svc"
  region   = data.aws_region.primary.id

  common_tags = {
    env         = var.environment
    repo        = local.stack_id
    repoFolder  = "${local.stack_id}/terraform"
    createdBy   = "terraform"
  }
}
