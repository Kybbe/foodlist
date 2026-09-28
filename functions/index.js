const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getDatabase } = require("firebase-admin/database");
const { timingSafeEqual } = require("node:crypto");

initializeApp();

const recipeApiToken = defineSecret("RECIPE_API_TOKEN");
const RECIPE_FIELDS = [
  "title",
  "description",
  "drink",
  "ingredients",
  "instructions",
  "servings",
  "link",
  "imgLink",
];

function sendJson(res, status, payload) {
  res.status(status).set("Content-Type", "application/json").send(payload);
}

function normalizeRecipe(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Request body must be a recipe JSON object.");
  }

  const missingFields = RECIPE_FIELDS.filter(
    (field) => !Object.prototype.hasOwnProperty.call(input, field)
  );
  if (missingFields.length) {
    throw new Error(`Missing required recipe fields: ${missingFields.join(", ")}`);
  }
  if (typeof input.title !== "string" || !input.title.trim()) {
    throw new Error("title must be a non-empty string.");
  }
  if (typeof input.description !== "string") {
    throw new Error("description must be a string.");
  }
  if (typeof input.drink !== "boolean") {
    throw new Error("drink must be a boolean.");
  }
  if (!Array.isArray(input.ingredients) || !input.ingredients.length) {
    throw new Error("ingredients must be a non-empty array.");
  }
  if (!Array.isArray(input.instructions) || !input.instructions.length) {
    throw new Error("instructions must be a non-empty array.");
  }
  if (typeof input.servings !== "number" || !Number.isFinite(input.servings)) {
    throw new Error("servings must be a number.");
  }
  if (typeof input.link !== "string" || typeof input.imgLink !== "string") {
    throw new Error("link and imgLink must be strings.");
  }

  const ingredients = input.ingredients.map((ingredient, index) => {
    if (!ingredient || typeof ingredient !== "object" || Array.isArray(ingredient)) {
      throw new Error(`ingredients[${index}] must be an object.`);
    }
    if (
      typeof ingredient.id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(ingredient.id)
    ) {
      throw new Error(`ingredients[${index}].id must be a UUID v4 string.`);
    }
    if (!(typeof ingredient.amount === "string" || typeof ingredient.amount === "number")) {
      throw new Error(`ingredients[${index}].amount must be a string or number.`);
    }
    for (const field of ["measurement", "name", "section"]) {
      if (typeof ingredient[field] !== "string") {
        throw new Error(`ingredients[${index}].${field} must be a string.`);
      }
    }
    return {
      id: ingredient.id,
      amount: ingredient.amount,
      measurement: String(ingredient.measurement),
      name: String(ingredient.name),
      section: String(ingredient.section),
    };
  });

  const instructions = input.instructions.map((instruction, index) => {
    if (!instruction || typeof instruction !== "object" || Array.isArray(instruction)) {
      throw new Error(`instructions[${index}] must be an object.`);
    }
    if (!Number.isFinite(instruction.id)) {
      throw new Error(`instructions[${index}].id must be a number.`);
    }
    if (typeof instruction.checked !== "boolean") {
      throw new Error(`instructions[${index}].checked must be a boolean.`);
    }
    if (typeof instruction.text !== "string") {
      throw new Error(`instructions[${index}].text must be a string.`);
    }
    return {
      id: instruction.id,
      checked: instruction.checked,
      text: instruction.text,
    };
  });

  return {
    title: input.title.trim(),
    description: input.description,
    drink: input.drink,
    ingredients,
    instructions,
    servings: input.servings,
    link: input.link,
    imgLink: input.imgLink,
    needsApproval: true,
    submittedAt: Date.now(),
    submittedBy: "api",
  };
}

exports.recipes = onRequest(
  { region: "europe-west1", secrets: [recipeApiToken], cors: false },
  async (req, res) => {
    if (req.method !== "POST") {
      res.set("Allow", "POST");
      return sendJson(res, 405, { error: "Method not allowed. Use POST." });
    }

    const authorization = req.get("authorization") || "";
    const suppliedToken = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
    const expectedToken = recipeApiToken.value();
    const suppliedTokenBuffer = Buffer.from(suppliedToken || "");
    const expectedTokenBuffer = Buffer.from(expectedToken);
    if (
      !suppliedToken ||
      suppliedTokenBuffer.length !== expectedTokenBuffer.length ||
      !timingSafeEqual(suppliedTokenBuffer, expectedTokenBuffer)
    ) {
      return sendJson(res, 401, { error: "Invalid or missing bearer token." });
    }

    try {
      const recipe = normalizeRecipe(req.body);
      const recipesRef = getDatabase().ref("recipes");
      const ref = recipesRef.push();
      const result = await recipesRef.transaction((recipes) => {
        const currentRecipes = recipes || {};
        const existingIds = Object.values(currentRecipes)
          .map((item) => Number(item?.recipeId))
          .filter(Number.isFinite);
        recipe.recipeId = existingIds.length ? Math.max(...existingIds) + 1 : 0;
        currentRecipes[ref.key] = recipe;
        return currentRecipes;
      });
      if (!result.committed) {
        throw new Error("Could not save the recipe; please try again.");
      }
      return sendJson(res, 201, {
        message: "Recipe submitted for approval.",
        key: ref.key,
        title: recipe.title,
        needsApproval: true,
        recipeId: recipe.recipeId,
      });
    } catch (error) {
      return sendJson(res, 400, { error: error.message || "Invalid recipe payload." });
    }
  }
);
