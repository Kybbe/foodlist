<template>
  <div :class="['instructionComponent', { mobileCookingView }]">
    <h2>{{ mobileCookingView ? "Steps" : "Instructions" }}</h2>
    <ol class="instruction">
      <li
        v-for="instruction in instructions"
        :key="instruction.id"
        v-bind:class="{ checked: instruction.checked }"
      >
        <input
          type="checkbox"
          :name="instruction.id"
          :id="instruction.id"
          v-model="instruction.checked"
          v-on:click="checkInstruction(instruction)"
        />
        <label :for="instruction.id"> {{ instruction.text }} </label>
        <div
          v-for="n in countAmountOfTimers(instruction.text)"
          :key="`${instruction.id}-container-${n}`"
          :id="`${instruction.id}-container-${n}`"
          class="timerContainer"
        >
          <timer
            :instruction="instruction.text"
            :timerCountId="n - 1"
            :id="`${instruction.id}-timer-${n}`"
            :key="`${instruction.id}-timer-${n}`"
            v-if="!instruction.checked"
          />
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import timer from "./timer.vue";
export default {
  name: "instructionComponent",
  components: {
    timer,
  },
  props: {
    instructions: {
      type: Array,
      required: true,
    },
    mobileCookingView: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    checkInstruction(instruction) {
      const parent = document.getElementById(instruction.id).parentElement;
      if (instruction.checked) {
        parent.classList.remove("checked");
      } else {
        parent.classList.add("checked");
      }
    },
    countAmountOfTimers(instructionText) {
      let amountOfTimers = 0;
      if (
        instructionText.includes("minuter") ||
        instructionText.includes("minut") ||
        instructionText.includes("timme") ||
        instructionText.includes("timmar")
      ) {
        amountOfTimers +=
          instructionText.match(/\bminut(?:er)?\b/gi)?.length ?? 0;
        amountOfTimers += instructionText.match(/\btimmar?\b/gi)?.length ?? 0;
        amountOfTimers += instructionText.match(/\btimme\b/gi)?.length ?? 0;
      }
      return amountOfTimers;
    },
  },
};
</script>

<style lang="scss" scoped>
.instructionComponent {
  min-height: 100%;
  box-sizing: border-box;
}

h2 {
  margin-top: 10px;
  margin-bottom: 3px;
  text-align: center;
}

ol {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  opacity: 1;
  width: 100%;

  label {
    padding: 15px 25px 15px 10px;
    width: calc(100% - 75px);
    cursor: pointer;
    min-width: 0;
  }

  input[type="checkbox"] {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    margin: auto 0px auto 10px;
    cursor: pointer;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  }
}

.checked input,
.checked label:nth-child(2) {
  opacity: 0.7 !important;
  text-decoration: line-through;
}

.checked label:nth-child(2) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timerContainer {
  width: 100%;
}

.instructionComponent.mobileCookingView {
  color: #16324f;
  padding-bottom: 1.5rem;

  .instruction {
    padding-bottom: 1.75rem;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 0.6rem;
    text-align: left;
    font-size: 1.15rem;
    letter-spacing: 0.01em;
  }

  li {
    margin-bottom: 0.55rem;
    border-radius: 10px;
    box-shadow: rgba(31, 68, 120, 0.12) 0px 6px 16px;

    label {
      padding: 12px 14px 12px 8px;
      width: calc(100% - 56px);
      font-size: 0.94rem;
      line-height: 1.35;
    }

    input[type="checkbox"] {
      width: 24px;
      height: 24px;
      margin: auto 0px auto 12px;
    }
  }
}
</style>
