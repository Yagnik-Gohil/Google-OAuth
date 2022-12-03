# Google OAuth Using Node, Express, MongoDB and Handlebars

## How to use

① fork the repository and clone locally

② Run `npm install` to install dependencies.

③ create config.env file inside cinfig `config/config.env`, and copy below variables in it.
```
PORT=3000
MONGO_URI=mongodb+srv://<DATABASE_NAME>:<DATABASE_PASSWORD>@cluster0.obtvghn.mongodb.net/GoogleOAuth?retryWrites=true&w=majority
GOOGLE_CLIENT_ID=YOUR-GOOGLE-CLIENT-ID
GOOGLE_CLIENT_SECRET=YOUR-GOOGLE-CLIENT-SECRET

```
④ once installation is complete, run `npm run dev` to get your local copy running in the browser at `http://localhost:3000/`.