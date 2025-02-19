<template>
  <md-field :class="['md-datepicker', { 'md-native': !mdOverrideNative }]" :md-clearable="mdClearable" @md-clear="onClear" >
    <md-date-icon class="md-date-icon" @click="toggleDialog" />
    <md-input :type="type" ref="input" v-model="inputDate" @focus="onFocus" @blur="onBlur" :pattern="pattern" name="datepicker-input" />

    <slot />

    <keep-alive>
      <md-datepicker-dialog
        v-if="showDialog"
        ref="mdRef"
        v-model:mdDate="localDate"
        :md-disabled-dates="mdDisabledDates"
        :mdImmediately="mdImmediately"
        @mdClosed="toggleDialog"
        :md-placement="mdPlacement"
      />
    </keep-alive>

    <md-overlay class="md-datepicker-overlay" md-fixed :md-active="showDialog" @click="toggleDialog(false)" />
  </md-field>
</template>

<script>
import { computed } from 'vue'
import { inject } from 'vue'

  import format from 'date-fns/format/index.js'
  import parse from 'date-fns/parse/index.js'
  import isValid from 'date-fns/isValid/index.js'
  import MdPropValidator from '@/core/utils/MdPropValidator'
  import MdOverlay from '@/components/MdOverlay/MdOverlay.vue'
  import MdDatepickerDialog from './MdDatepickerDialog.vue'
  import MdDateIcon from '@/core/icons/MdDateIcon.vue'
  import MdDebounce from '@/core/utils/MdDebounce'
  import MdField from '@/components/MdField/MdField.vue'
  import MdInput from '@/components/MdField/MdInput/MdInput.vue'

  export default {
		emits: ['update:modelValue','md-opened','md-closed','md-clear'],
    name: 'MdDatepicker',
    components: {
      MdOverlay,
      MdDateIcon,
      MdField,
      MdInput,
      MdDatepickerDialog
    },
    props: {
      //modelValue: false,
      modelValue: [String, Number, Date],
      // value: [String, Number, Date],
      mdDisabledDates: [Array, Function],
      mdOpenOnFocus: {
        type: Boolean,
        default: true
      },
      mdCloseOnBlur: {
        type: Boolean,
        default: false
      },
      mdOverrideNative: {
        type: Boolean,
        default: true
      },
      mdImmediately: {
        type: Boolean,
        default: false
      },
      mdModelType: {
        type: Function,
        default: Date,
        ...MdPropValidator('md-model-type', [Date, String, Number])
      },
      MdDebounce: {
        type: Number,
        default: 1000
      },
      mdClearable: {
        type: Boolean,
        default: true
      },
      mdPlacement: {
        type: String,
        default: 'bottom-start'
      }
    },
    data: () => ({
      showDialog: false,
      // String for input
      inputDate: '',
      // Date for real value
      localDate: null
    }),
    setup(){
      const material = inject('material')

      const locale = computed(() => material.locale)

      return{
        locale
      }
    },
    computed: {
      // locale () {
      //   return this.$material.locale
      // },
      type () {
        return this.mdOverrideNative
          ? 'text'
          : 'date'
      },
      dateFormat() {
        return this.locale.dateFormat || 'dd.MM.yyyy';
      },
      modelType () {
        if (this.isModelTypeString) {
          return String
        } else if (this.isModelTypeNumber) {
          return Number
        } else if (this.isModelTypeDate) {
          return Date
        } else {
          return this.mdModelType
        }
      },
      isModelNull () {
        return this.modelValue === null || this.modelValue === undefined
      },
      isModelTypeString () {
        return typeof this.modelValue === 'string'
      },
      isModelTypeNumber () {
        return Number.isInteger(this.modelValue) && this.value >= 0
      },
      isModelTypeDate () {
        return typeof this.modelValue === 'object' && this.modelValue instanceof Date && isValid(this.modelValue)
      },
      localString () {
        return this.localDate && format(this.localDate, this.dateFormat)
      },
      localNumber () {
        return this.localDate && Number(this.localDate)
      },
      parsedInputDate () {
        const parsedDate = parse(this.inputDate, this.dateFormat, new Date())
        return parsedDate && isValid(parsedDate) ? parsedDate : null
      },
      pattern() {
        return this.dateFormat.replace(/yyyy|MM|dd/g, match => {
          switch (match) {
            case 'yyyy':
              return '[0-9]{4}';
            case 'MM':
            case 'dd':
              return '[0-9]{2}';
          }
        });
      }
    },
    watch: {
			modelValue:{
        immediate: true,
        handler (value) {

          this.valueDateToLocalDate()
          if(this.inputDate != value) {
            this.inputDate = value;
          }
        }

			},
      inputDate (value) {
        this.inputDateToLocalDate()
      },
      localDate () {
				//console.log(this.localDate);
				//console.log(this.localString);
        this.inputDate = this.localString
        if (this.modelType === Date) {
          this.$emit('update:modelValue', this.localDate)
        }
      },
      localString () {
        if (this.modelType === String) {
          this.$emit('update:modelValue', this.localString)
        }
      },
      localNumber () {
        if (this.modelType === Number) {
          this.$emit('update:modelValue', this.localNumber)
        }
      },
      // value: {
      //   immediate: true,
      //   handler () {

      //     this.valueDateToLocalDate()
      //   }
      // },

      mdModelType (type) {
        switch (type) {
        case Date:
          this.$emit('update:modelValue', this.localDate)
          break
        case String:
          this.$emit('update:modelValue', this.localString)
          break
        case Number:
          this.$emit('update:modelValue', this.localNumber)
          break
        }
      },
      dateFormat () {
        if (this.localDate) {
          this.inputDate = format(this.localDate, this.dateFormat)
        }
      }
    },
    methods: {
      toggleDialog (newState = null) {
				var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (!isFirefox || this.mdOverrideNative) {
          this.showDialog = newState === null ? !this.showDialog : newState
          //this.showDialog = !this.showDialog;
          if (this.showDialog) {
            this.$emit('md-opened')
          } else {
            this.$emit('md-closed')
          }
        } else {
          this.$refs.input.$el.click()
        }
      },
			// onBlur (event) {
			// 	if(event && !event.relatedTarget || !event) {
      //   	this.showDialog = false;
			// 		this.$emit('md-closed');
			// 	}
      // },
      onFocus () {
        if (this.mdOpenOnFocus ) {
          this.toggleDialog(true)
        }
      },
      // onBlur(event){
      //   if (this.mdCloseOnBlur && event && !event.relatedTarget || !event) {
      //     this.toggleDialog(false)
      //   }
      // },
      onBlur(e){
        if (this.mdCloseOnBlur) {
          const mdRefElement = this.$refs.mdRef.$el
          const relatedTarget = e.relatedTarget

          if (!mdRefElement.contains(relatedTarget)) {
            this.toggleDialog(false)
          }
        }
      },
      // onFocusOut (event) {
      //   if (this.mdCloseOnBlur && event && !event.relatedTarget || !event) {
      //     this.toggleDialog(false)
      //   }
      // },
      inputDateToLocalDate () {
        if (this.inputDate) {
          if (this.parsedInputDate) {
            this.localDate = this.parsedInputDate
          }
        } else {
          this.localDate = null
        }
      },
      valueDateToLocalDate () {
        if (this.isModelNull) {
          this.localDate = null
        } else if (this.isModelTypeNumber) {
          this.localDate = new Date(this.modelValue)
        } else if (this.isModelTypeDate) {
          this.localDate = this.modelValue
        } else if (this.isModelTypeString) {
          let parsedDate = parse(this.modelValue, this.dateFormat, new Date())

          if (isValid(parsedDate)) {
            this.localDate = parse(this.modelValue, this.dateFormat, new Date())

          } else {
           	console.log(`The datepicker value is not a valid date. Given value: ${this.modelValue}, format: ${this.dateFormat}`)
          }
        } else {
          console.log(`The datepicker value is not a valid date. Given value: ${this.modelValue}`)
        }

      },
      onClear () {

				this.inputDate = "";
        this.$emit('md-clear')
      }
    },
    created () {
      this.inputDateToLocalDate = MdDebounce(this.inputDateToLocalDate, this.MdDebounce)
			this.inputDate = this.modelValue
    }
  }
</script>

<style lang="scss">
  @use "@/components/MdAnimation/variables";
  @use "@/components/MdLayout/mixins";

  .md-datepicker-overlay {
    opacity: 0;

    @include mixins.md-layout-xsmall {
      opacity: 1;
    }
  }

  .md-datepicker {
    &.md-native {
      label {
        top: 0 !important;
      }
    }

    .md-date-icon {
      cursor: pointer;
    }

    input[type=date]::-webkit-clear-button,
    input[type=date]::-webkit-inner-spin-button,
    input[type=date]::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
</style>
