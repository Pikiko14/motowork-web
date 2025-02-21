<template>
  <div class="date-selected">
    <figure class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M25.6665 4.00033H12.3332V0.666992H8.99984V4.00033H0.666504V11.0837H37.3332V4.00033H28.9998V0.666992H25.6665V4.00033ZM0.666504 37.3337V13.5837H37.3332V37.3337H0.666504ZM16.9165 18.167V23.5837H11.4998V27.7503H16.9165V33.167H21.0832V27.7503H26.4998V23.5837H21.0832V18.167H16.9165Z"
          fill="#ED1C24" />
      </svg>
    </figure>

    <div class="content full-width">
      <span class="day">
        {{ selectedDate?.day }}
      </span>
      <div class="month">
        {{ selectedDate?.month }}, {{ selectedDate?.year }}
        <span class="float-right hour" v-if="hour">{{ hour }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// props
defineProps({
  selectedDate: {
    type: Object,
    default: () => {
      return {}
    }
  },
  hour: {
    type: String,
    default: () => ''
  }
})
</script>

<style scoped lang="scss">
.date-selected {
  padding: 24px 32px;
  background: #F5F5F5;
  display: flex;
  padding: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;

  figure {
    width: 36px;
    height: 36px;
  }

  .content {
    display: flex;
    flex-direction: column;

    .day {
      color: #898384;
      font-family: Ubuntu;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 125%;
      /* 20px */
    }

    .month {
      color: #000;
      font-family: Ubuntu;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: 125%;
      /* 30px */

      .hour {
        color: #898384;
        text-align: right;

        /* Desktop/Body/Text/Medium */
        font-family: Ubuntu;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 125%; /* 20px */
      }
    }
  }
}
</style>
