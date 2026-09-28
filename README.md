# foodlist
 List of foods i can make with recipes etc, more of a VUE test site than anything

Now also includes drinks that I've tested and recommend

## Submit recipes through the API

The Firebase HTTPS endpoint accepts `POST /api/recipes` with a JSON recipe and
an `Authorization: Bearer <token>` header. It writes recipes to the existing
Realtime Database `recipes` collection with `needsApproval: true`; an admin
must review and approve each submission before it is considered published.

Before deploying, install the Cloud Functions dependencies and configure a
strong API token as a Firebase secret. Then deploy both Functions and Hosting:

1. Run `npm install --prefix functions`.
2. Run `firebase functions:secrets:set RECIPE_API_TOKEN` and enter a strong,
   private token when prompted. Keep this token in Node-RED credentials and do
   not put it in the Vue app or source control.
3. Run `firebase deploy --only functions,hosting`.

Send the request to your deployed Hosting domain, for example
`https://<your-hosting-domain>/api/recipes`, with `Content-Type: application/json`
and `Authorization: Bearer <your-token>`. The JSON body follows the recipe
shape from the Add Recipe JSON textarea (without `recipeId`, which the API
assigns):

```json
{
  "title": "Example recipe",
  "description": "A short description",
  "drink": false,
  "ingredients": [
    {
      "id": "b2c2374b-d814-4eb9-ae67-84fd28fbf7b3",
      "amount": 2,
      "measurement": "st",
      "name": "Tomater",
      "section": ""
    }
  ],
  "instructions": [
    { "id": 0, "checked": false, "text": "Prepare the ingredients." }
  ],
  "servings": 2,
  "link": "https://example.com/recipe",
  "imgLink": ""
}
```

Successful submissions return HTTP `201` and the generated recipe key. Missing
or invalid tokens return `401`; malformed recipe payloads return `400`.
