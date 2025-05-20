> :warning: **DEPRECATED - DO NOT USE** This fork is deprecated an should not be used

# cloud-build-notifications
Google Cloud Function that allows you to easily receive Cloud Build status updates

## Insert your project id for gcp
Go to `deploy.sh` and and change the `$PROJECT_ID` with your GCP Project ID

## Change the config
Go to `.env.example.yaml` and you will see there are 2 configurations (slack and email). On slack you need to change the webhook url with your own webhook
`https://hooks.slack.com/services/foo/bar/your-key`

and for email configuration you need to insert 
`EMAIL_FROM_ADDRESS` : your email that you use to send the notification
`EMAIL_RECIPIENTS` : email will receive the notification
`EMAIL_SMTP_HOST` : the email smtp host
`EMAIL_SMTP_PORT` : the port for email
`EMAIL_SMTP_USER` : the user name for the email
`EMAIL_SMTP_PASS` : the password for the email
`EMAIL_USE_TLS` : insert `true` if use TLS or `false` is use TLS

and everything is done, you can use it directly. You can change the template of your email in `assets/email.html` and change the value on `notifiers/email.js`.
This is we're using `handlebars` for manipulating the strings for javascript.
