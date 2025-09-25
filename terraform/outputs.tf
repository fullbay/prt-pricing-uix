
output "current_region" {
  value = data.aws_region.primary.id
}

output "lambda_role" {
  value = data.aws_iam_role.stack.arn
}

output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

output "caller_arn" {
  value = data.aws_caller_identity.current.arn
}

output "caller_user" {
  value = data.aws_caller_identity.current.user_id
}

output "git_short_sha" {
  value = local.git_sha
}


