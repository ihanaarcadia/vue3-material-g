export default {
	emits:['update:modelValue'],
  props: {
    value: {},
    placeholder: String,
    name: String,
    maxlength: [String, Number],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    mdCounter: [String, Number]
  },
  data () {
    return {
      localValue: this.value,
      textareaHeight: false
    }
  },
  computed: {
    model: {
      get () {
        return  this.attributes.modelValue
      },
      set (value) {
				
				
        if (value.constructor.toString().match(/function (\w*)/)[1].toLowerCase() !== 'inputevent') {
          this.$nextTick(() => {
						
            this.localValue = value
            this.MdField.hasInvalidValue = this.isInvalidValue()

          })
        }
      }
    },
    clear () {
      return this.MdField.clear
    },
    attributes () {
      return {
        ...this.$attrs,
        //type: this.type,
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        placeholder: this.placeholder,
        readonly: this.readonly,
        maxlength: this.maxlength
      }
    }
  },
  watch: {
    model (val) {
			
      this.setFieldValue()
			
    },
		
    clear (clear) {
      if (clear) {
        this.clearField()
      }
    },
    placeholder () {
      this.setPlaceholder()
    },
    disabled () {
      this.setDisabled()
    },
    required () {
      this.setRequired()
    },
    maxlength () {
      this.setMaxlength()
    },
    mdCounter () {
      this.setMaxlength()
    },
    localValue (val) {
			
      this.$emit('update:modelValue', val)
    },
    value (val) {
			
      this.localValue = val
    }
  },
  methods: {
    clearField () {
      this.$el.value = ''
      this.model = ''
      this.setFieldValue()
    },
    setLabelFor () {
      if (this.$el.parentNode) {
        const label = this.$el.parentNode.querySelector('label')

        if (label) {
          const forAttribute = label.getAttribute('for')

          if (!forAttribute || forAttribute.indexOf('md-') >= 0) {
            label.setAttribute('for', this.id)
          }
        }
      }
    },
    setFormResetListener () {
      if (!this.$el.form) {
        return
      }
      const parentForm = this.$el.form
      parentForm.addEventListener('reset', this.onParentFormReset)
    },
    removeFormResetListener () {
      if (!this.$el.form) {
        return
      }
      const parentForm = this.$el.form
      parentForm.removeEventListener('reset', this.onParentFormReset)
    },
    onParentFormReset () {
      this.clearField()
    },
    isInvalidValue () {
      return this.$el.validity ? this.$el.validity.badInput : false
    },
    setFieldValue () {
			//console.log('aaa'+this.model);
      this.MdField.value = this.model
    },
    setPlaceholder () {
      this.MdField.placeholder = Boolean(this.placeholder)
    },
    setDisabled () {
      this.MdField.disabled = Boolean(this.disabled)
    },
    setRequired () {
      this.MdField.required = Boolean(this.required)
    },
    setMaxlength () {
      if (this.mdCounter) {
        this.MdField.counter = parseInt(this.mdCounter, 10)
      } else {
        this.MdField.maxlength = parseInt(this.maxlength, 10)
      }
    },
    onFocus () {
      this.MdField.focused = true
    },
    onBlur () {
      this.MdField.focused = false
    }
  },
  created () {
    this.setFieldValue()
    this.setPlaceholder()
    this.setDisabled()
    this.setRequired()
    this.setMaxlength()
  },
  mounted () {
    this.setLabelFor()
    this.setFormResetListener()
  },
  beforeUnmount () {
    this.removeFormResetListener()
  }
}
