# Not For Production Use
- Remove hard coded JWT check from index and setup JWT verifier (i.e. AWS Cognito) in API Gateway. Current JWT setup is for development testing only! 

# AWS Lambda setup
- create a new function
- run npm install locally to setup node_modules directory
- zip directory contents for upload to lambda function (`npm run build`)
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
-H "Authorization: Bearer <token>" \
-d '{
  "to": "<your_phone_number>",
  "body": "Ahoy World from Terminal"
}'
```