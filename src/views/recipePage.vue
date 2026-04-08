<template>
  <div
    ref="cookingViewContainer"
    :class="[
      { mobileCookingViewPage: isMobileLandscapeCookingView },
      { immersiveCookingMode: isImmersiveModeActive },
    ]"
  >
    <div v-if="isMobileLandscapeCookingView" id="mobileCookingView">
      <div id="cookingModeToolbar">
        <button
          id="immersiveModeToggle"
          type="button"
          @click="toggleImmersiveMode"
        >
          {{ isImmersiveModeActive ? "Exit immersive" : "Enable immersive" }}
        </button>

        <button
          v-if="showFullscreenButton"
          id="fullscreenToggle"
          type="button"
          @click="requestCookingFullscreen"
        >
          Fullscreen API
        </button>

        <button
          v-if="shouldAllowFullscreenDebug"
          id="fullscreenDebugToggle"
          type="button"
          @click="toggleFullscreenDebug"
        >
          {{ showFullscreenDebug ? "Hide debug" : "Show debug" }}
        </button>
      </div>

      <aside v-if="showFullscreenDebug" id="fullscreenDebugPanel">
        <div class="debugHeader">
          <strong>Fullscreen debug</strong>
          <button type="button" class="debugClose" @click="toggleFullscreenDebug">
            Close
          </button>
        </div>

        <ul>
          <li v-for="item in fullscreenDebugValues" :key="item.label">
            <span>{{ item.label }}</span>
            <b>{{ item.value }}</b>
          </li>
        </ul>
      </aside>

      <section class="mobileCookingPanel ingredientsPanel">
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
      isImmersiveModeEnabled: false,
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
    syncImmersiveModeState() {
      this.setMobileCookingDocumentState(this.isImmersiveModeActive);
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

      if (!this.isMobileLandscapeCookingView) {
        this.isImmersiveModeEnabled = false;
      }

      this.syncImmersiveModeState();
      this.updateFullscreenSupport();
      this.updateFullscreenState();

      if (this.isImmersiveModeActive) {
        window.setTimeout(() => {
          window.scrollTo(0, 1);
        }, 100);
      } else {
        this.showFullscreenDebugPanel = false;
      }
    },
    toggleImmersiveMode() {
      this.isImmersiveModeEnabled = !this.isImmersiveModeEnabled;
      this.syncImmersiveModeState();

      if (this.isImmersiveModeActive) {
        window.setTimeout(() => {
          window.scrollTo(0, 1);
        }, 100);
      } else {
        window.scrollTo(0, 0);
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
    isImmersiveModeActive() {
      return this.isMobileLandscapeCookingView && this.isImmersiveModeEnabled;
    },
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
      return (
        this.isMobileLandscapeCookingView &&
        this.shouldAllowFullscreenDebug &&
        this.showFullscreenDebugPanel
      );
    },
    fullscreenDebugValues() {
      const fullscreenElement =
        typeof document !== "undefined" ? document.fullscreenElement : null;
      const webkitFullscreenElement =
        typeof document !== "undefined" ? document.webkitFullscreenElement : null;
      const container = this.$refs.cookingViewContainer;
      const viewport = typeof window !== "undefined" ? window.visualViewport : null;
      const documentElement = typeof document !== "undefined" ? document.documentElement : null;
      const body = typeof document !== "undefined" ? document.body : null;
      const containerStyles = container ? window.getComputedStyle(container) : null;
      const bodyStyles = body ? window.getComputedStyle(body) : null;
      const htmlStyles = documentElement
        ? window.getComputedStyle(documentElement)
        : null;

      return [
        { label: "iPhone", value: String(this.isIPhone) },
        { label: "Admin", value: String(this.$store.state.admin) },
        { label: "User agent", value: navigator.userAgent || "n/a" },
        { label: "Cooking view", value: String(this.isMobileLandscapeCookingView) },
        { label: "Immersive enabled", value: String(this.isImmersiveModeEnabled) },
        { label: "Immersive active", value: String(this.isImmersiveModeActive) },
        {
          label: "Body class active",
          value: String(body?.classList.contains("mobile-cooking-view-active") ?? false),
        },
        {
          label: "Media query",
          value:
            this.mobileLandscapeMediaQuery?.media ||
            "(orientation: landscape) and (pointer: coarse) and (max-height: 600px)",
        },
        {
          label: "Media query matches",
          value: String(this.mobileLandscapeMediaQuery?.matches ?? false),
        },
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
          label: "requestFullscreen fn",
          value: String(Boolean(container?.requestFullscreen)),
        },
        {
          label: "webkitRequestFullscreen fn",
          value: String(Boolean(container?.webkitRequestFullscreen)),
        },
        {
          label: "fullscreenElement",
          value: fullscreenElement?.tagName || "null",
        },
        {
          label: "webkitFullscreenElement",
          value: webkitFullscreenElement?.tagName || "null",
        },
        {
          label: "Ref exists",
          value: String(Boolean(container)),
        },
        {
          label: "Ref client size",
          value: container
            ? `${container.clientWidth} × ${container.clientHeight}`
            : "n/a",
        },
        {
          label: "Ref offsetHeight",
          value: container ? String(container.offsetHeight) : "n/a",
        },
        {
          label: "Ref scroll size",
          value: container
            ? `${container.scrollWidth} × ${container.scrollHeight}`
            : "n/a",
        },
        {
          label: "Ref overflow",
          value: containerStyles
            ? `${containerStyles.overflow} / ${containerStyles.overflowY}`
            : "n/a",
        },
        {
          label: "Ref min-height",
          value: containerStyles?.minHeight || "n/a",
        },
        {
          label: "Ref height",
          value: containerStyles?.height || "n/a",
        },
        { label: "Window", value: `${window.innerWidth} × ${window.innerHeight}` },
        {
          label: "Visual viewport",
          value: viewport
            ? `${Math.round(viewport.width)} × ${Math.round(viewport.height)}`
            : "n/a",
        },
        {
          label: "Visual viewport offset",
          value: viewport
            ? `${Math.round(viewport.offsetLeft)}, ${Math.round(viewport.offsetTop)}`
            : "n/a",
        },
        {
          label: "Visual viewport scale",
          value: viewport ? String(viewport.scale) : "n/a",
        },
        {
          label: "Screen",
          value: `${window.screen.width} × ${window.screen.height}`,
        },
        {
          label: "Screen available",
          value: `${window.screen.availWidth} × ${window.screen.availHeight}`,
        },
        {
          label: "Orientation type",
          value: window.screen.orientation?.type || "n/a",
        },
        {
          label: "Orientation angle",
          value: String(window.screen.orientation?.angle ?? "n/a"),
        },
        { label: "outerHeight", value: String(window.outerHeight) },
        { label: "innerHeight", value: String(window.innerHeight) },
        {
          label: "documentElement clientHeight",
          value: String(document.documentElement?.clientHeight ?? "n/a"),
        },
        {
          label: "documentElement scrollHeight",
          value: String(document.documentElement?.scrollHeight ?? "n/a"),
        },
        {
          label: "documentElement overflow",
          value: htmlStyles ? `${htmlStyles.overflow} / ${htmlStyles.overflowY}` : "n/a",
        },
        { label: "body clientHeight", value: String(document.body?.clientHeight ?? "n/a") },
        { label: "body scrollHeight", value: String(document.body?.scrollHeight ?? "n/a") },
        {
          label: "body overflow",
          value: bodyStyles ? `${bodyStyles.overflow} / ${bodyStyles.overflowY}` : "n/a",
        },
        { label: "ScrollX", value: String(Math.round(window.scrollX)) },
        { label: "ScrollY", value: String(Math.round(window.scrollY)) },
        {
          label: "Standalone",
          value: String(
            window.navigator.standalone ??
              window.matchMedia("(display-mode: standalone)").matches
          ),
        },
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
  min-height: 100dvh;
  background: linear-gradient(180deg, #f7fbff 0%, #eef5ff 100%);
}

.mobileCookingViewPage.immersiveCookingMode {
  min-height: 101vh;
}

#mobileCookingView {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: 100dvh;
  position: relative;
  align-items: start;
}

.immersiveCookingMode #mobileCookingView {
  min-height: 101vh;
}

#cookingModeToolbar {
  position: sticky;
  top: calc(env(safe-area-inset-top) + 0.35rem);
  z-index: 5;
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem calc(env(safe-area-inset-right) + 0.45rem) 0;
}

#immersiveModeToggle,
#fullscreenToggle,
#fullscreenDebugToggle {
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
  background: rgba(18, 44, 76, 0.72);
  box-shadow: 0 10px 24px rgba(14, 31, 53, 0.18);
}

#immersiveModeToggle {
  background: rgba(45, 101, 182, 0.92);
}

#fullscreenDebugPanel {
  position: fixed;
  inset: 0;
  z-index: 7;
  width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  overflow-y: auto;
  background: rgba(12, 23, 38, 0.98);
  color: white;
  padding: calc(env(safe-area-inset-top) + 0.9rem)
    calc(env(safe-area-inset-right) + 0.9rem)
    calc(env(safe-area-inset-bottom) + 0.9rem)
    calc(env(safe-area-inset-left) + 0.9rem);
  box-shadow: 0 12px 30px rgba(8, 18, 32, 0.3);
  font-size: 0.88rem;

  .debugHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  strong {
    display: block;
    margin-bottom: 0;
    font-size: 1.1rem;
  }

  .debugClose {
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    color: white;
    padding: 0.55rem 0.9rem;
    font-weight: 700;
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
    margin-bottom: 0.55rem;
    padding: 0.55rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  span,
  b {
    overflow-wrap: anywhere;
  }

  span {
    max-width: 45%;
    color: rgba(255, 255, 255, 0.78);
  }

  b {
    max-width: 52%;
    text-align: right;
  }
}

.mobileCookingPanel {
  min-width: 0;
  min-height: 100dvh;
  overflow: visible;
  padding: calc(env(safe-area-inset-top) + 0.75rem)
    calc(env(safe-area-inset-right) + 0.75rem)
    calc(env(safe-area-inset-bottom) + 0.75rem)
    calc(env(safe-area-inset-left) + 0.75rem);
}

.immersiveCookingMode .mobileCookingPanel {
  min-height: calc(100dvh - 3.4rem);
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
