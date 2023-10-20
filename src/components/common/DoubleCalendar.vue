<script setup lang="ts">
import { ref } from "vue";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";

const props = defineProps<{
  inputType: string[];
}>();
const emits = defineEmits(["changeValue"]);

const fromDate = ref("");
const toDate = ref("");
const date = ref();
const datepicker = ref<DatePickerInstance>(null);
const selectDate = () => {
  if (datepicker.value) {
    datepicker.value.selectDate();
  }
};

const format = (dates: any) => {
  let string = "";

  dates.forEach((element: any, index: number) => {
    const day = element.getDate();
    const month = element.getMonth() + 1;
    const year = element.getFullYear();
    console.log(element);

    if (index === 0) {
      string += "від ";
      fromDate.value = day + "-" + month + "-" + year;
    }
    if (index === 1) {
      string += " до ";
      toDate.value = day + "-" + month + "-" + year;
    }

    string += day + "." + month + "." + year;
  });
  return string;
};

const fromD = ref("");
const changeStartDate = (from: any) => {
  fromD.value = from;
  datepicker.value?.updateInternalModelValue(from);
};

const changeEndDate = (to: any) => {
  datepicker.value?.parseModel([fromD.value, to]);
  selectDate();
  datepicker.value?.closeMenu();
};

const onChangeDate = () => {
  let value = "";
  props.inputType.forEach((type: string, index: number) => {
    if (index === 0) {
      value = fromDate.value;
    }
    if (index === 1) {
      value = toDate.value;
    }
    emits("changeValue", type, value);
  });
};
</script>

<template>
  <div class="text-[12px] flex flex-col gap-[7px]">
    <span class="ml-[10px]"><slot /></span>

    <VueDatePicker
      class="date_picker"
      v-model="date"
      @range-start="changeStartDate"
      @range-end="changeEndDate"
      @update:model-value="onChangeDate"
      range
      locale="uk"
      ref="datepicker"
      :format="format"
      :enable-time-picker="false"
      :multi-calendars="{ solo: false }"
    >
      <template #dp-input="{ value }">
        <button
          class="self-end w-full relative rounded-[26px] font-medium text-[14px] border border-white py-[10px] pl-[16px] pr-[63px]"
        >
          <span
            class="text-[14px] text-left truncate w-[120%] inline-block whitespace-nowrap"
            >{{ value || "від 00.00.00 до 00.00.00 " }}</span
          >
          <span
            v-if="!date"
            class="absolute w-[30px] h-[30px] flex justify-center items-center bg-primary-200 right-[3px] top-0 bottom-0 my-auto rounded-[50%]"
          >
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L6 6L10 2"
                stroke="black"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </template>
    </VueDatePicker>
  </div>
</template>

<style>
.date_picker.dp__theme_light {
  --dp-border-radius: 15px;
  background-color: transparent;
}

.date_picker.dp__theme_light .dp__menu {
  background-color: #264233;
  border: none;
  --dp-text-color: #ffffff;
}

.date_picker.dp__theme_light .dp__menu:focus {
  border: none;
  outline: none;
}

.date_picker.dp__theme_light .dp__pointer {
  background-color: transparent;
  border-radius: 26px;
  color: #ffffff;
}
.date_picker.dp__theme_light .dp__range_end,
.date_picker.dp__theme_light .dp__range_start,
.date_picker.dp__theme_light .dp__active_date,
.date_picker.dp__theme_light .dp__date_hover_start:hover,
.date_picker.dp__theme_light .dp__date_hover:hover,
.date_picker.dp__theme_light .dp__date_hover_end:hover {
  background: #568e6f;
  color: #ffffff;
}
.date_picker.dp__theme_light .dp__arrow_top {
  display: none;
}

.date_picker.dp__theme_light .dp__today {
  border: none;
  color: #568e6f;
}

.date_picker.dp__theme_light .dp__calendar_header_separator {
  display: none;
}

.date_picker.dp__theme_light .dp__month_year_row {
  margin-bottom: 20px;
}
.date_picker.dp__theme_light .dp__action_row {
  display: none;
}

.date_picker.dp__theme_light .dp__menu_inner {
  padding: 0;
}

.date_picker.dp__theme_light
  .dp__menu_inner
  .dp__instance_calendar:first-child {
  border-right: 1px solid #ffffff;
}

.date_picker.dp__theme_light .dp__menu_inner .dp__instance_calendar {
  padding: 13px 10px;
}

.date_picker.dp__theme_light .dp__overlay {
  background-color: #264233;
  border-radius: 26px;
}

.date_picker.dp__theme_light .dp__overlay_cell_active {
  background: #568e6f;
}
</style>
