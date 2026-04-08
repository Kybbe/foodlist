<template>
  <div
    ref="cookingViewContainer"
    :class="{ mobileCookingViewPage: isMobileLandscapeCookingView }"
  >
    <div
      v-if="isMobileLandscapeCookingView"
      id="mobileCookingView"
    >
      <button
        v-if="showFullscreenButton"
        id="fullscreenToggle"
        type="button"
        @click="requestCookingFullscreen"
      >
        Fullscreen
      </button>

      <button
        v-if="shouldAllowFullscreenDebug"
        id="fullscreenDebugToggle"
        type="button"
        @click="toggleFullscreenDebug"
      >
        {{ showFullscreenDebug ? "Hide debug" : "Show debug" }}
      </button>

      <section class="mobileCookingPanel ingredientsPanel">

      <aside v-if="showFullscreenDebug" id="fullscreenDebugPanel">
        <strong>Fullscreen debug</strong>
        <ul>
          <li v-for="item in fullscreenDebugValues" :key="item.label">
            <span>{{ item.label }}</span>
            <b>{{ item.value }}</b>
          </li>
        </ul>
      </aside>
        <ingredients
          :ingredients="this.currentRecipe.ingredients"
          :portions="this.currentRecipe.servings"
          :mobile-cooking-view="true"
        />
      </section>

      <section class="mobileCookingPanel instructionsPanel">
        <instruction
          :instructions="this.currentRecipe.instructions"
          :mobile-cooking-view="true"
        />
      </section>
    </div>

    <template v-else>
      <div id="content">
        <div
          class="bigCard card"
          style="
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            padding: 0px;
          "
        >
          <mainArea
            :title="this.currentRecipe.title"
            :description="this.currentRecipe.description"
            :imgLink="this.currentRecipe.imgLink"
            :drink="this.currentRecipe.drink"
          />
        </div>

        <div class="mediumCard card">
          <ingredients
            :ingredients="this.currentRecipe.ingredients"
            :portions="this.currentRecipe.servings"
          />
        </div>

        <div class="mediumCard card">
          <instruction :instructions="this.currentRecipe.instructions" />
        </div>
      </div>
      <div id="footer">
        <a
          v-if="this.currentRecipe.link"
          :href="this.currentRecipe.link"
          target="_blank"
          id="ogLink"
          >Original Recipe</a
        >
        <router-link
          id="edit"
          :to="'/edit/' + this.currentRecipeId"
          v-if="this.$store.state.admin"
        >
          Edit this recipe
        </router-link>
        <button id="delete" @click="confirmDelete" v-if="this.$store.state.admin">
          Delete this recipe
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import ingredients from "../components/ingredients.vue";
import instruction from "../components/instructions.vue";
import mainArea from "../components/mainArea.vue";

import { useStore } from "vuex";

export default {
  name: "recipePage",
  components: {
    mainArea,
    instruction,
    ingredients,
  },
  data() {
    return {
      isMobileLandscapeCookingView: false,
      mobileLandscapeMediaQuery: null,
      canRequestFullscreen: false,
      isFullscreenActive: false,
      showFullscreenDebugPanel: false,
    };
  },
  mounted() {
    if (typeof window === "undefined") {
      return;
    }

    this.mobileLandscapeMediaQuery = window.matchMedia(
      "(orientation: landscape) and (pointer: coarse) and (max-height: 600px)"
    );

    this.updateMobileLandscapeCookingView();
    this.updateFullscreenSupport();
    this.updateFullscreenState();

    if (this.mobileLandscapeMediaQuery.addEventListener) {
      this.mobileLandscapeMediaQuery.addEventListener(
        "change",
        this.updateMobileLandscapeCookingView
      );
    } else {
      this.mobileLandscapeMediaQuery.addListener(
        this.updateMobileLandscapeCookingView
      );
    }

    window.addEventListener("resize", this.updateMobileLandscapeCookingView);
    document.addEventListener("fullscreenchange", this.updateFullscreenState);
    document.addEventListener(
      "webkitfullscreenchange",
      this.updateFullscreenState
    );
  },
  beforeUnmount() {
    if (typeof window === "undefined") {
      return;
    }

    if (this.mobileLandscapeMediaQuery?.removeEventListener) {
      this.mobileLandscapeMediaQuery.removeEventListener(
        "change",
        this.updateMobileLandscapeCookingView
      );
    } else if (this.mobileLandscapeMediaQuery?.removeListener) {
      this.mobileLandscapeMediaQuery.removeListener(
        this.updateMobileLandscapeCookingView
      );
    }

    window.removeEventListener("resize", this.updateMobileLandscapeCookingView);
    document.removeEventListener(
      "fullscreenchange",
      this.updateFullscreenState
    );
    document.removeEventListener(
      "webkitfullscreenchange",
      this.updateFullscreenState
    );
    this.setMobileCookingDocumentState(false);
  },
  methods: {
    setMobileCookingDocumentState(isActive) {
      if (typeof document === "undefined") {
        return;
      }

      document.documentElement.classList.toggle(
        "mobile-cooking-view-active",
        isActive
      );
      document.body.classList.toggle("mobile-cooking-view-active", isActive);
    },
    updateFullscreenSupport() {
      if (typeof document === "undefined") {
        this.canRequestFullscreen = false;
        return;
      }

      const element = this.$refs.cookingViewContainer;
      this.canRequestFullscreen = Boolean(
        document.fullscreenEnabled ||
          document.webkitFullscreenEnabled ||
          element?.requestFullscreen ||
          element?.webkitRequestFullscreen
      );
    },
    updateFullscreenState() {
      if (typeof document === "undefined") {
        this.isFullscreenActive = false;
        return;
      }

      this.isFullscreenActive = Boolean(
        document.fullscreenElement || document.webkitFullscreenElement
      );
    },
    updateMobileLandscapeCookingView() {
      if (typeof window === "undefined") {
        return;
      }

      const mediaMatches = this.mobileLandscapeMediaQuery?.matches ?? false;
      this.isMobileLandscapeCookingView =
        mediaMatches && window.innerWidth > window.innerHeight;

      this.setMobileCookingDocumentState(this.isMobileLandscapeCookingView);
      this.updateFullscreenSupport();
      this.updateFullscreenState();

      if (this.isMobileLandscapeCookingView) {
        window.setTimeout(() => {
          window.scrollTo(0, 0);
        }, 60);
      } else {
        this.showFullscreenDebugPanel = false;
      }
    },
    toggleFullscreenDebug() {
      this.showFullscreenDebugPanel = !this.showFullscreenDebugPanel;
    },
    async requestCookingFullscreen() {
      const element = this.$refs.cookingViewContainer;

      if (!element) {
        return;
      }

      try {
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        }
      } catch (err) {
        console.error("Could not enter fullscreen cooking view", err);
      }
    },
    async deleteRecipe() {
      try {
        await this.$store.dispatch("deleteRecipeAndReindex", this.currentRecipeId);
        this.$toast.add({
          severity: "success",
          summary: "Recipe deleted",
          detail: "Recipe deleted and IDs reindexed successfully!",
          life: 5000,
        });
        this.$router.push("/");
      } catch (err) {
        console.error("Delete failed", err);
        this.$toast.add({
          severity: "error",
          summary: "Delete failed",
          detail: err?.message || "Could not delete recipe.",
          life: 6000,
        });
      }
    },
    confirmDelete() {
      if (
        confirm(
          "Are you sure you want to delete this recipe? \r\nThis action cannot be undone."
        )
      ) {
        this.deleteRecipe();
      }
    },
  },
  computed: {
    isIPhone() {
      if (typeof navigator === "undefined") {
        return false;
      }

      return /iPhone/i.test(navigator.userAgent || "");
    },
    shouldAllowFullscreenDebug() {
      return this.$store.state.admin && this.isIPhone;
    },
    showFullscreenButton() {
      return (
        this.isMobileLandscapeCookingView &&
        this.canRequestFullscreen &&
        !this.isFullscreenActive
      );
    },
    showFullscreenDebug() {
      return this.isMobileLandscapeCookingView && this.shouldAllowFullscreenDebug && this.showFullscreenDebugPanel;
    },
    fullscreenDebugValues() {
      return [
        { label: "iPhone", value: String(this.isIPhone) },
        { label: "Admin", value: String(this.$store.state.admin) },
        { label: "Cooking view", value: String(this.isMobileLandscapeCookingView) },
        { label: "Can fullscreen", value: String(this.canRequestFullscreen) },
        { label: "Fullscreen active", value: String(this.isFullscreenActive) },
        {
          label: "fullscreenEnabled",
          value: String(document.fullscreenEnabled ?? false),
        },
        {
          label: "webkitFullscreenEnabled",
          value: String(document.webkitFullscreenEnabled ?? false),
        },
        {
          label: "fullscreenElement",
          value: document.fullscreenElement ? "present" : "null",
        },
        {
          label: "webkitFullscreenElement",
          value: document.webkitFullscreenElement ? "present" : "null",
        },
        { label: "Window", value: `${window.innerWidth} × ${window.innerHeight}` },
        {
          label: "Visual viewport",
          value: window.visualViewport
            ? `${Math.round(window.visualViewport.width)} × ${Math.round(window.visualViewport.height)}`
            : "n/a",
        },
        {
          label: "Screen",
          value: `${window.screen.width} × ${window.screen.height}`,
        },
        { label: "ScrollY", value: String(Math.round(window.scrollY)) },
      ];
    },
    currentRecipeId() {
      return this.$route.params.id;
    },
    currentRecipe() {
      return this.$store.state.recipesList[this.currentRecipeId];
    },
    store() {
      return useStore();
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

.mobileCookingViewPage {
  height: 100dvh;
  min-height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
  background: linear-gradient(180deg, #f7fbff 0%, #eef5ff 100%);
}

#mobileCookingView {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  height: 100dvh;
  min-height: 100dvh;
  max-height: 100dvh;
  position: relative;
  overflow: hidden;
}

#fullscreenToggle {
  position: absolute;
  top: calc(env(safe-area-inset-top) + 0.45rem);
  right: calc(env(safe-area-inset-right) + 0.45rem);
  z-index: 5;
  border: 0;
  border-radius: 999px;
  background: rgba(18, 44, 76, 0.88);
  color: white;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 0.5rem 0.8rem;
  box-shadow: 0 10px 24px rgba(14, 31, 53, 0.22);
  cursor: pointer;
}

#fullscreenDebugToggle {
  position: absolute;
  top: calc(env(safe-area-inset-top) + 0.45rem);
  right: calc(env(safe-area-inset-right) + 6.35rem);
  z-index: 5;
  border: 0;
  border-radius: 999px;
  background: rgba(18, 44, 76, 0.72);
  color: white;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 0.5rem 0.8rem;
  box-shadow: 0 10px 24px rgba(14, 31, 53, 0.18);
  cursor: pointer;
}

#fullscreenDebugPanel {
  position: absolute;
  top: calc(env(safe-area-inset-top) + 2.8rem);
  right: calc(env(safe-area-inset-right) + 0.45rem);
  z-index: 6;
  width: min(18rem, calc(100vw - 1rem));
  max-height: calc(100dvh - env(safe-area-inset-top) - 4rem);
  overflow-y: auto;
  background: rgba(12, 23, 38, 0.92);
  color: white;
  border-radius: 12px;
  padding: 0.75rem;
  box-shadow: 0 12px 30px rgba(8, 18, 32, 0.3);
  font-size: 0.72rem;

  strong {
    display: block;
    margin-bottom: 0.5rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.35rem;
  }

  span,
  b {
    overflow-wrap: anywhere;
  }
}

.mobileCookingPanel {
  min-width: 0;
  height: 100dvh;
  min-height: 100dvh;
  max-height: 100dvh;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  padding: calc(env(safe-area-inset-top) + 0.75rem)
    calc(env(safe-area-inset-right) + 0.75rem)
    calc(env(safe-area-inset-bottom) + 0.75rem)
    calc(env(safe-area-inset-left) + 0.75rem);
}

.ingredientsPanel {
  background: rgba(255, 255, 255, 0.94);
  border-right: 1px solid rgba(74, 142, 231, 0.18);
}

.instructionsPanel {
  background: rgba(244, 248, 255, 0.98);
}

#content {
  display: flex;
  flex-wrap: wrap;

  max-width: 75em;
  margin: 0 auto;
}

.card {
  padding: 10px;
  width: 100%;
  margin: 7px auto 7px auto;
}

.mediumCard {
  background-color: rgba(0, 0, 0, 0.01);
}

#footer {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0px;
  text-align: center;
  margin-bottom: 30px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
}

#ogLink,
#delete,
#edit {
  text-decoration: none;
  color: white;
  background-color: #4a8ee7;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
  border: none;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease-in;
  margin: 0px 20px 10px 20px;

  &:hover {
    background-color: #386baf;
    box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.4);
  }

  @media (min-width: 600px) {
    margin: 0px !important;
  }
}

#edit {
  background-color: orange;
  &:hover {
    background-color: #e07b00;
  }
}

#delete {
  background-color: #ff4d4d;
  &:hover {
    background-color: red;
  }
}

@media (min-width: 800px) {
  #content {
    padding: 10px;
  }

  .card {
    border-radius: 10px;
    background-color: white;
    border: solid rgb(192, 192, 192) 1px;
    height: 100%;
  }

  .bigCard {
    width: 100%;
  }

  .mediumCard {
    width: calc(50% - 10px);
    margin: 7px 0px;
  }

  .mediumCard:nth-child(2n) {
    margin-right: 20px;
  }

  .smallCard {
    width: 32%;
  }
}
</style>
