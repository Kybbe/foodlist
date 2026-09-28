<template>
  <main class="approvalPage">
    <header class="pageHeader">
      <div>
        <p class="eyebrow">ADMIN REVIEW</p>
        <h1>Recipe approvals</h1>
        <p>Review the complete recipe JSON, make changes, then approve it.</p>
      </div>
      <span class="queueCount">{{ pendingRecipes.length }} pending</span>
    </header>

    <p v-if="message" class="statusMessage" :class="messageType" role="status">
      {{ message }}
    </p>

    <div v-if="pendingRecipes.length" class="reviewLayout">
      <aside class="queuePanel" aria-label="Pending recipes">
        <h2>Waiting for review</h2>
        <button
          v-for="recipe in pendingRecipes"
          :key="recipe._key"
          type="button"
          class="queueItem"
          :class="{ selected: recipe._key === currentRecipe?._key }"
          @click="openRecipe(recipe)"
        >
          <span>{{ recipe.title || "Untitled recipe" }}</span>
          <small>{{ recipe.drink ? "Drink" : "Food" }}</small>
        </button>
      </aside>

      <section v-if="currentRecipe" class="editorPanel">
        <div class="editorHeading">
          <div>
            <span class="pendingTag">Needs approval</span>
            <h2>{{ previewRecipe?.title || currentRecipe.title }}</h2>
          </div>
          <span v-if="currentRecipe.submittedAt" class="submittedDate">
            Submitted {{ formatDate(currentRecipe.submittedAt) }}
          </span>
        </div>

        <label class="jsonLabel" for="recipe-json">Recipe JSON</label>
        <textarea
          id="recipe-json"
          v-model="recipeJson"
          spellcheck="false"
          aria-describedby="json-help"
        ></textarea>
        <p id="json-help" class="helpText">
          Edit the full recipe object. Ingredient and instruction arrays are
          shown below as a preview.
        </p>
        <p v-if="jsonError" class="jsonError" role="alert">{{ jsonError }}</p>

        <div v-if="previewRecipe" class="recipePreview">
          <h3>Recipe preview</h3>
          <p>{{ previewRecipe.description }}</p>
          <p><strong>Servings:</strong> {{ previewRecipe.servings }}</p>
          <p v-if="previewRecipe.link">
            <strong>Source:</strong>
            <a
              :href="previewRecipe.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ previewRecipe.link }}
            </a>
          </p>
          <h4>Ingredients</h4>
          <ul>
            <li
              v-for="(ingredient, index) in previewRecipe.ingredients"
              :key="ingredient.id || index"
            >
              {{ ingredient.amount }} {{ ingredient.measurement }}
              {{ ingredient.name }}
              <span v-if="ingredient.section"> — {{ ingredient.section }}</span>
            </li>
          </ul>
          <h4>Instructions</h4>
          <ol>
            <li
              v-for="(instruction, index) in previewRecipe.instructions"
              :key="instruction.id ?? index"
            >
              {{ instruction.text }}
            </li>
          </ol>
        </div>

        <div class="actions">
          <button
            type="button"
            class="saveButton"
            :disabled="saving || !!jsonError"
            @click="saveRecipe(false)"
          >
            Save changes
          </button>
          <button
            type="button"
            class="approveButton"
            :disabled="saving || !!jsonError"
            @click="saveRecipe(true)"
          >
            {{ saving ? "Saving…" : "Approve recipe" }}
          </button>
        </div>
      </section>
    </div>

    <section v-else class="emptyState">
      <h2>All caught up</h2>
      <p>There are no recipes waiting for approval.</p>
    </section>
  </main>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

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

export default {
  name: "AdminRecipeApprovals",
  data() {
    return {
      recipeJson: "",
      message: "",
      messageType: "success",
      saving: false,
      selectedKey: "",
      loadedKey: "",
    };
  },
  computed: {
    pendingRecipes() {
      return this.$store.state.recipesList.filter(
        (recipe) => recipe.needsApproval
      );
    },
    currentRecipe() {
      const routeKey = this.$route.params.key;
      const key = routeKey || this.selectedKey;
      return this.pendingRecipes.find((recipe) => recipe._key === key) || null;
    },
    previewRecipe() {
      try {
        const parsed = JSON.parse(this.recipeJson);
        return parsed && typeof parsed === "object" && !Array.isArray(parsed)
          ? parsed
          : null;
      } catch (error) {
        return null;
      }
    },
    jsonError() {
      if (!this.recipeJson.trim()) return "Recipe JSON cannot be empty.";
      try {
        const parsed = JSON.parse(this.recipeJson);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          return "The JSON must be a recipe object.";
        }
        const missing = RECIPE_FIELDS.filter(
          (field) => parsed[field] === undefined
        );
        if (missing.length) return `Missing fields: ${missing.join(", ")}`;
        if (
          typeof parsed.title !== "string" ||
          typeof parsed.description !== "string" ||
          typeof parsed.drink !== "boolean" ||
          typeof parsed.servings !== "number" ||
          typeof parsed.link !== "string" ||
          typeof parsed.imgLink !== "string"
        ) {
          return "Recipe fields have invalid types.";
        }
        if (
          !Array.isArray(parsed.ingredients) ||
          !Array.isArray(parsed.instructions) ||
          !parsed.ingredients.length ||
          !parsed.instructions.length
        ) {
          return "Ingredients and instructions must be arrays.";
        }
        for (const [index, ingredient] of parsed.ingredients.entries()) {
          if (
            !ingredient ||
            typeof ingredient.id !== "string" ||
            typeof ingredient.name !== "string" ||
            typeof ingredient.measurement !== "string" ||
            typeof ingredient.section !== "string" ||
            !(
              typeof ingredient.amount === "number" ||
              typeof ingredient.amount === "string"
            )
          ) {
            return `Ingredient ${index + 1} has invalid fields.`;
          }
        }
        for (const [index, instruction] of parsed.instructions.entries()) {
          if (
            !instruction ||
            typeof instruction.id !== "number" ||
            typeof instruction.checked !== "boolean" ||
            typeof instruction.text !== "string"
          ) {
            return `Instruction ${index + 1} has invalid fields.`;
          }
        }
        return "";
      } catch (error) {
        return "Enter valid JSON before saving.";
      }
    },
  },
  watch: {
    currentRecipe: {
      immediate: true,
      handler(recipe) {
        if (recipe && recipe._key !== this.loadedKey) {
          this.loadedKey = recipe._key;
          this.selectedKey = recipe._key;
          this.recipeJson = JSON.stringify(
            this.editableRecipe(recipe),
            null,
            2
          );
        }
      },
    },
    pendingRecipes: {
      immediate: true,
      handler(recipes) {
        if (!this.$route.params.key && !this.selectedKey && recipes.length) {
          this.openRecipe(recipes[0]);
        }
      },
    },
  },
  methods: {
    editableRecipe(recipe) {
      const editable = { ...recipe };
      delete editable._key;
      return editable;
    },
    openRecipe(recipe) {
      this.selectedKey = recipe._key;
      this.message = "";
      this.$router.push(`/approving/${recipe._key}`);
    },
    formatDate(value) {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? "recently" : date.toLocaleString();
    },
    async saveRecipe(approve) {
      if (!this.currentRecipe || this.jsonError || this.saving) return;

      const recipeBeingSaved = this.currentRecipe;
      this.saving = true;
      this.message = "";
      try {
        const editedRecipe = JSON.parse(this.recipeJson);
        const recipe = {
          ...editedRecipe,
          recipeId: recipeBeingSaved.recipeId,
          submittedAt:
            recipeBeingSaved.submittedAt ||
            editedRecipe.submittedAt ||
            Date.now(),
          needsApproval: !approve,
        };
        if (approve) {
          recipe.reviewedAt = Date.now();
          recipe.reviewedBy = this.$store.state.currentUser?.email || "admin";
        }

        await firebase
          .database()
          .ref(`recipes/${recipeBeingSaved._key}`)
          .set(recipe);
        if (!approve) {
          this.recipeJson = JSON.stringify(recipe, null, 2);
          this.messageType = "success";
          this.message =
            "Changes saved. This recipe is still awaiting approval.";
          return;
        }

        const nextRecipe = this.pendingRecipes.find(
          (pending) => pending._key !== recipeBeingSaved._key
        );
        this.messageType = "success";
        this.message = "Recipe approved and published.";
        if (nextRecipe) {
          this.selectedKey = nextRecipe._key;
          await this.$router.push(`/approving/${nextRecipe._key}`);
        } else {
          this.selectedKey = "";
          await this.$router.push("/approving");
        }
      } catch (error) {
        this.messageType = "error";
        this.message = error?.message || "Could not save this recipe.";
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.approvalPage {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  color: #1d2939;
}

.pageHeader,
.editorHeading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.pageHeader {
  margin-bottom: 1.25rem;

  h1,
  p {
    margin: 0.25rem 0;
  }

  > div > p:last-child {
    color: #667085;
  }
}

.eyebrow {
  color: #3977c3;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.queueCount,
.pendingTag {
  border-radius: 999px;
  background: #fff1d6;
  color: #8a4b08;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.4rem 0.7rem;
  white-space: nowrap;
}

.reviewLayout {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  align-items: start;
  gap: 1.2rem;
}

.queuePanel,
.editorPanel,
.emptyState {
  border: 1px solid #e4e7ec;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 14px rgba(16, 24, 40, 0.06);
}

.queuePanel {
  padding: 1rem;

  h2 {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
  }
}

.queueItem {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  background: #fff;
  color: inherit;
  text-align: left;
  cursor: pointer;

  &:hover,
  &.selected {
    border-color: #4a8ee7;
    background: #f3f8ff;
  }

  small {
    color: #667085;
  }
}

.editorPanel {
  min-width: 0;
  padding: 1.25rem;
}

.editorHeading {
  margin-bottom: 1rem;

  h2 {
    margin: 0.65rem 0 0;
  }
}

.submittedDate,
.helpText {
  color: #667085;
  font-size: 0.85rem;
}

.jsonLabel {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 700;
}

textarea {
  width: 100%;
  min-height: 340px;
  box-sizing: border-box;
  padding: 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font: 0.9rem/1.5 ui-monospace, SFMono-Regular, Menlo, monospace;
  resize: vertical;
}

.jsonError {
  color: #b42318;
  font-weight: 600;
}

.recipePreview {
  margin-top: 1.25rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f8fafc;
  overflow-wrap: anywhere;

  h3,
  h4 {
    margin-bottom: 0.45rem;
  }

  li {
    margin: 0.35rem 0;
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;

  button {
    border: 0;
    border-radius: 8px;
    padding: 0.7rem 1rem;
    color: white;
    font-weight: 700;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }
  }
}

.saveButton {
  background: #52657d;
}

.approveButton {
  background: #218653;
}

.statusMessage {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: #e8f6ed;
  color: #17663a;

  &.error {
    background: #fef3f2;
    color: #b42318;
  }
}

.emptyState {
  padding: 3rem 1rem;
  text-align: center;
  color: #667085;

  h2 {
    color: #1d2939;
  }
}

@media (max-width: 760px) {
  .approvalPage {
    padding: 1rem;
  }

  .reviewLayout {
    grid-template-columns: 1fr;
  }

  .queuePanel {
    max-height: 250px;
    overflow-y: auto;
  }

  .pageHeader,
  .editorHeading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
