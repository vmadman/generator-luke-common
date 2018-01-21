Deployment Configuration Notes
==============================

This document contains additional information about how this project
is deployed, in case it ever needs to be replicated or imitated.

## AWS IAM

### Deployment User

During deployment, the AWS IAM user named `<%= awsDeployUser %>` is
used to grant access to relevant AWS services.

### Deployment Policy

The AWS IAM user that is used to deploy this project is attached to
a custom IAM policy named `<%= awsDeployPolicy %>`.

Here's part of that policy:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "2",
            "Effect": "Allow",
            "Action": [
                "ecr:BatchCheckLayerAvailability",
                "ecr:BatchDeleteImage",
                "ecr:BatchGetImage",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetDownloadUrlForLayer",
                "ecr:InitiateLayerUpload",
                "ecr:ListImages",
                "ecr:PutImage",
                "ecr:UploadLayerPart"
            ],
            "Resource": [
                "arn:aws:ecr:us-east-1:<%= awsCustomerId %>:repository/<%= ecrNamespace %>/<%= dockerImageName %>"
            ]
        }
    ]
}
```

## Travis-CI

### Rebuilding the "base image"

By default, Travis-CI will _not_ rebuild or deploy the base image to
AWS ECR. This is to reduce the amount of time that _most_ build jobs
take to complete.

If you would like to rebuild the base image, please add "[rebuild base]"
to the *last* commit in a push to GitHub.

**e.g.**
```
$ git commit -m "Did some stuff [rebuild base]"
```

The `ci:base:rebuild` script will recognize the tag in the commit
message and will rebuild the base image and push it to AWS ECR before
moving on to the "deploy image".

### Rebuilding the "deploy image"

The deploy image will _always_ be rebuilt and deployed to AWS ECR
for each commit.

### AWS Authentication

The Travis build for this project uses the AWS CLI to authenticate
Docker with AWS ECR. We provide AWS IAM authentication information to
the AWS CLI utility being executed in Travis by way of encrypted
environment variables in the `.travis.yml` file.

We added those variables (and values) using the `Travis CLI` and its
`encrypt` command, like so:

```
$ travis encrypt AWS_ACCESS_KEY_ID="xxx" --add env.global
$ travis encrypt AWS_SECRET_ACCESS_KEY="xxx" --add env.global
```

This method allows us to securely provide `Travis CI` with AWS IAM
auth information that is sufficient for ECR deployment without needing
to provide the variables in the `Travis CI` web interface.

## Further Reading

All documentation for this project stems from the main [README.md](../README.md)
in the project's root directory.  Please find additional articles and
documentation there.