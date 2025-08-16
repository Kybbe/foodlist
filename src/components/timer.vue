<template v-if="time && originalTime">
  <label class="timer">
    <!-- Timer Overlay -->
    <div v-if="showTimerDone" class="timer-done-overlay">
      <div class="timer-done-content">
        <h1>TIMER DONE</h1>

        <div class="timer-done-buttons">
          <button @click="rerunTimer" class="rerun-btn">RERUN</button>
          <button @click="stopTimerDone" class="stop-btn">STOP</button>
        </div>
      </div>
    </div>

    <svg
      style="width: 30px; height: 30px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xml:space="preserve"
    >
      <g transform="translate(1 1)">
        <g>
          <g>
            <path
              d="M255,101.4c-103.253,0-187.733,84.48-187.733,187.733c0,50.764,20.43,96.981,53.462,130.861     c0.328,0.492,0.71,0.963,1.152,1.405c0.484,0.484,0.97,0.891,1.473,1.238c33.949,33.484,80.49,54.229,131.647,54.229     c103.253,0,187.733-84.48,187.733-187.733S358.253,101.4,255,101.4z M400.067,297.667h25.385     c-2.023,40.571-18.386,77.528-44.093,105.879l-17.985-17.985c-3.413-3.413-8.533-3.413-11.947,0     c-3.413,3.413-3.413,8.533,0,11.947l17.985,17.985c-28.35,25.707-65.308,42.07-105.879,44.093V434.2     c0-5.12-3.413-8.533-8.533-8.533s-8.533,3.413-8.533,8.533v25.385c-40.784-2.034-77.916-18.559-106.325-44.5l17.578-17.578     c3.413-3.413,3.413-8.533,0-11.947c-3.413-3.413-8.533-3.413-11.947,0l-17.533,17.534     c-25.474-28.291-41.679-65.07-43.692-105.427h25.385c4.267,0,8.533-3.413,8.533-8.533s-3.413-8.533-8.533-8.533H84.548     c2.023-40.571,18.386-77.528,44.093-105.879l17.985,17.985c1.707,1.707,3.413,2.56,5.973,2.56c1.707,0,4.267-0.853,5.973-2.56     c3.413-3.413,3.413-8.533,0-11.947l-17.985-17.985c28.35-25.707,65.308-42.07,105.879-44.093v25.385     c0,5.12,3.413,8.533,8.533,8.533c4.267,0,8.533-3.413,8.533-8.533v-25.385c40.571,2.023,77.528,18.386,105.879,44.093     l-17.985,17.985c-3.413,3.413-3.413,8.533,0,11.947c1.707,1.707,3.413,2.56,5.973,2.56s4.267-0.853,5.973-2.56l17.985-17.985     c25.707,28.35,42.07,65.308,44.093,105.879h-25.385c-5.12,0-8.533,3.413-8.533,8.533S394.947,297.667,400.067,297.667z"
            />
            <path
              d="M468.333,153.453c6.827,0,13.653-2.56,18.773-7.68c10.24-10.24,10.24-27.307,0-37.547l-34.133-34.133     c-10.24-10.24-27.307-10.24-37.547,0c-8.316,8.316-9.878,21.133-4.688,31.141l-13.759,13.759     c-30.247-25.306-67.268-42.746-107.847-49.081V50.2h16.213c10.24,0,17.92-7.68,17.92-17.067V16.92     c0-10.24-7.68-17.92-17.92-17.92H203.8c-9.387,0-17.067,7.68-17.067,17.92v15.36c0,10.24,7.68,17.92,17.067,17.92h17.067v19.712     c-40.371,6.302-77.223,23.593-107.384,48.69l-13.941-13.941c4.842-9.92,3.191-22.409-4.968-30.568     c-10.24-10.24-27.307-10.24-37.547,0l-34.133,34.133c-10.24,10.24-10.24,27.307,0,37.547c5.12,5.12,11.947,7.68,18.773,7.68     c6.06,0,12.117-2.022,16.983-6.057l14.723,14.723c-25.327,36.043-40.24,79.869-40.24,127.013C33.133,411.16,132.973,511,255,511     s221.867-99.84,221.867-221.867c0-46.926-14.777-90.562-39.89-126.51l14.846-14.846     C456.605,151.558,462.468,153.453,468.333,153.453z M427.373,86.04c1.707-1.707,4.267-2.56,6.827-2.56s5.12,0.853,6.827,2.56     l34.133,34.133c3.413,4.267,4.267,10.24,0,13.653s-10.24,3.413-13.653,0l-1.543-1.543c-0.426-0.975-1.047-1.9-1.871-2.724     l-29.867-29.867c-0.559-0.559-1.168-1.018-1.804-1.394C424.006,94.202,424.317,89.096,427.373,86.04z M421.4,117.613l17.92,17.92     l-12.8,12.8c-5.12-6.827-11.093-12.8-17.067-18.773L421.4,117.613z M203.8,16.067l102.4,0.853v15.36c0,0.853,0,0.853-0.853,0.853     L203.8,32.28V16.067z M237.933,50.2h34.133v17.722c-5.634-0.434-11.326-0.656-17.067-0.656s-11.432,0.222-17.067,0.656V50.2z      M88.6,117.613l11.947,11.947c-5.973,5.973-11.947,11.947-17.067,18.773l-12.8-12.8L88.6,117.613z M34.84,133.827     c-3.413-4.267-3.413-10.24,0-13.653L68.973,86.04c1.707-1.707,4.267-2.56,6.827-2.56s5.12,0.853,6.827,2.56     c3.413,4.267,3.413,10.24,0,13.653L52.76,129.56l-4.267,4.267C45.08,137.24,38.253,137.24,34.84,133.827z M255,493.933     c-112.64,0-204.8-92.16-204.8-204.8c0-45.669,15.152-87.969,40.673-122.128c0.38-0.248,0.76-0.499,1.14-0.752     c7.68-11.093,17.067-20.48,27.307-29.867c0.348-0.348,0.651-0.737,0.928-1.142c29.931-26.26,67.508-43.989,108.838-49.267     c0.387,0.037,0.777,0.062,1.167,0.062c17.067-1.707,32.427-1.707,49.493,0h0.853c0.171,0,0.356-0.015,0.542-0.032     C381.556,98.947,459.8,185.346,459.8,289.133C459.8,401.773,367.64,493.933,255,493.933z"
            />
            <path
              d="M263.533,256.088V178.2c0-5.12-3.413-8.533-8.533-8.533s-8.533,3.413-8.533,8.533v77.888     c-14.679,3.814-25.6,17.216-25.6,33.046c0,18.773,15.36,34.133,34.133,34.133s34.133-15.36,34.133-34.133     C289.133,273.304,278.212,259.902,263.533,256.088z M255,306.2c-9.387,0-17.067-7.68-17.067-17.067s7.68-17.067,17.067-17.067     s17.067,7.68,17.067,17.067S264.387,306.2,255,306.2z"
            />
          </g>
        </g>
      </g>
    </svg>
    <span class="time">{{ time }}</span>
    <button
      class="timerStart"
      @click="this.countdownTimer"
      v-if="!this.started"
    >
      Start
    </button>
    <button class="timerStop" @click="this.stopTimer" v-if="this.started">
      Stop
    </button>
    <button class="timerReset" @click="this.resetTimer" v-if="this.time !== originalTime">
      Reset
    </button>
  </label>
</template>

<script>
export default {
	name: "timerComponent",
	props: {
		instruction: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			time: "",
			originalTime: "",
			started: false,
		};
	},
	methods: {
		getTimeFromInstruction() {
			// Match number directly followed by unit (minut/er or timme/ar)
			const regex = /(\d+(?:[\.,]\d+)?)\s*(timmar?|timme|minuter?|minut)/i;
			const match = regex.exec(this.instruction);
			if (!match) return;

			const rawNumber = match[1].replace(",", ".");
			const unit = match[2].toLowerCase();

			const number = Number.parseFloat(rawNumber);
			if (Number.isNaN(number)) return;

			// Convert to minutes if it's timmar
			let minutes = unit.startsWith("tim") ? number * 60 : number;
			minutes = Math.round(minutes);

			const time = `0${Math.floor(minutes / 60)}:${minutes % 60}:00`;
			this.time = time;
			this.originalTime = time;

			document.querySelector(".time").innerHTML = time;
		},
    countdownTimer(e) {
      e.preventDefault();
      e.stopPropagation();
      
			// first check if already started
			if (this.started) return;
			// then start the timer
			this.started = true;
			const timer = setInterval(() => {
				// check if timer is stopped every second
				if (!this.started) {
					clearInterval(timer);
					return;
				}
				const time = this.time;
				const [hours, minutes, seconds] = time.split(":");
				const newSeconds = Number.parseInt(seconds, 10) - 1;
				const newMinutes = Number.parseInt(minutes, 10);
				const newHours = Number.parseInt(hours, 10);

				if (newSeconds <= 0) {
					if (newMinutes <= 0) {
						if (newHours <= 0) {
							clearInterval(timer);
							this.timerDone();
							return;
						}
						this.time = `${newHours - 1}:59:59`;
					} else {
						this.time = `${newHours}:${newMinutes - 1}:59`;
					}
				} else {
					this.time = `${newHours}:${newMinutes}:${newSeconds}`;
				}
			}, 1000);
		},
    stopTimer(e) {
      e.preventDefault();
      e.stopPropagation();
      this.started = false;
		},
    resetTimer(e) {
      e.preventDefault();
      e.stopPropagation();
      this.time = this.originalTime;
      this.started = false;
    },
    timerDone() {
      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
      );
      audio.play();
      this.showTimerDone = true;
    },
    rerunTimer() {
      this.showTimerDone = false;
      this.time = this.originalTime;
      this.started = false;
      this.countdownTimer({ preventDefault: () => {}, stopPropagation: () => {} });
    },
    stopTimerDone() {
      this.showTimerDone = false;
      this.resetTimer({ preventDefault: () => {}, stopPropagation: () => {} });
    },
  },
  mounted() {
    this.getTimeFromInstruction();
  },
};
</script>

<style lang="scss" scoped>
.timer {
  width: 100% !important;
  border-top: 1px solid lightgrey;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
 }

.timer-done-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background: rgba(255, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-done-content {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.timer-done-content h1 {
  color: white;
  font-size: 5vw;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2em;
  text-shadow: 2px 2px 8px #900;
}

.timer-done-buttons {
  position: absolute;
  bottom: 5vh;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: 2em;
}

.rerun-btn, .stop-btn {
  font-size: 2em;
  padding: 0.5em 2em;
  border: none;
  border-radius: 1em;
  background: white;
  color: #900;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.rerun-btn:hover {
  background: #f1c40f;
  color: #fff;
}
.stop-btn:hover {
  background: #e74c3c;
  color: #fff;
}

span {
  margin: auto 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.timerStart,
.timerStop,
.timerReset {
  float: right;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 1.2em;
  text-align: center;
  border: none;
  margin: 0px 5px;
  background-color: #4a8ee7;
  color: white;
  box-shadow: 1px 1px 4px rgba(128, 128, 128, 0.2);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #1e74e4;
    box-shadow: 1px 1px 4px rgba(128, 128, 128, 0.5);
  }
}
.timerStop {
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
}
.timerReset {
  background-color: #f1c40f;

  &:hover {
    background-color: #f39c12;
  }
}

</style>
