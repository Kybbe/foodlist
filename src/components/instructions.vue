<template>
  <h2 style="text-align: center">Instructions</h2>
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
h2 {
  margin-top: 10px;
  margin-bottom: 3px;
}

ol {
  padding: 0;
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

.timerContainer {
  width: 100%;
}
</style>
