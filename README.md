# AWS Lambda setup
- create a new function
- run npm install locally to setup node_modules directory
- zip directory contents for upload to lambda function
`zip -r ../myTwilioIntegrationFunction.zip *`
- upload zip file to lambda function
- set environment variables via configuration tab
- setup API Gateway trigger

# Testing
## Lambda test tab
```
{
"body": "{\"to\":\"<your_phone_number>\", \"body\":\"Ahoy, World!\"}",
"headers": {
    "Content-Type": "application/json"
    }
}
```
## curl
```
curl -X POST https://<url>/myTwilioIntegrationFunction \
-H "Content-Type: application/json" \
-d '{
  "to": "<your_phone_number>",
  "body": "Ahoy World from Terminal"
}'
```