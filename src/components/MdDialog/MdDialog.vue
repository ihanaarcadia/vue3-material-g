<template>
  <md-portal :mdTarget="mdTarget" :ref="'portalRef'">
    <transition name="md-dialog">
      <div class="md-dialog" :class=" mdTarget ? 'with-target' : '' " v-if="mdActive">
        <md-focus-trap>
          <div
            class="md-dialog-container"
            :class="[dialogContainerClasses, $mdActiveTheme]"

            @keydown.esc="onEsc"
          >
            <slot />
            <keep-alive>
              <md-overlay
                :class="mdBackdropClass"
                :mdTarget="mdTarget"
                :md-fixed=" mdTarget ? false : true "
                :md-active="mdActive"
                @click="onClick"
                v-if="mdBackdrop"
              />
            </keep-alive>
          </div>
        </md-focus-trap>
      </div>
    </transition>
  </md-portal>
</template>

<script>
	import MdComponent from "@/core/MdComponent";
	import MdPortal from "@/components/MdPortal/MdPortal";
	import MdOverlay from "@/components/MdOverlay/MdOverlay.vue";
	import MdFocusTrap from "@/components/MdFocusTrap/MdFocusTrap";

	export default new MdComponent({
		emits:["update:mdActive","md-clicked-outside","md-closed","md-opened"],
		name: "MdDialog",
		components: {
			MdPortal,
			MdOverlay,
			MdFocusTrap,
		},
		props: {
			mdActive: Boolean,
			mdTarget: {
				type: null,
				default: null,
			},
			mdBackdrop: {
				type: Boolean,
				default: true,
			},
			mdBackdropClass: {
				type: String,
				default: "md-dialog-overlay",
			},
			mdCloseOnEsc: {
				type: Boolean,
				default: true,
			},
			mdClickOutsideToClose: {
				type: Boolean,
				default: true,
			},
			mdFullscreen: {
				type: Boolean,
				default: true,
			},
			mdAnimateFromSource: Boolean,
		},
		data: () => ({
			I_mdTargetLastScroll: false,

		}),
		computed: {
			dialogClasses() {
				return {
					"md-active": this.mdActive,
				};
			},
			dialogContainerClasses() {
				return {
					"md-dialog-fullscreen": this.mdFullscreen,
				};
			},
		},
		watch: {
			mdActive(isActive) {

				if (this.mdTarget) {
					if (isActive) {
						this.I_mdTargetLastScroll = this.mdTarget.scrollTop;

						this.mdTarget.style.overflow = "hidden";
					} else {
						this.mdTarget.style.overflow = "auto";
						this.mdTarget.scrollTop = this.I_mdTargetLastScroll;
					}
				}
				//this.$nextTick().then(() => {
				//	if (isActive) {
				//		this.$emit("md-opened");
				//	} else {
				//		this.$emit("md-closed");
				//	}
				//});
			},
		},
		methods: {
			closeDialog() {
				//console.log(this)
				//this.$emit("update:mdActive", false);
			},
			onClick() {

				if (this.mdClickOutsideToClose) {
					this.closeDialog();
				}
				this.$emit("md-clicked-outside");
			},
			onEsc() {
				if (this.mdCloseOnEsc) {
					this.closeDialog();
				}
			},
		},
	});
</script>

<style lang="scss">
	@use "@/components/MdAnimation/variables";
	@use "@/components/MdLayout/mixins" as layoutmixins;
	@use "@/components/MdElevation/mixins" as elevationmixins;

	$opacity-transition-duration: 0.15s;
	$transform-transition-duration: 0.2s;
	$max-duration: max(
		$opacity-transition-duration,
		$transform-transition-duration
	);

	.md-dialog {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		display: flex;
		transition-duration: $max-duration;
		z-index: 110;



		&.md-dialog-leave,
		&.md-dialog-enter-to {
			.md-dialog-container {
				opacity: 1;
				transform: scale(1);
			}

			.md-dialog-fullscreen {
				@include layoutmixins.md-layout-xsmall {
					opacity: 0;
					transform: translate(0, 30%);
				}
			}
		}

		&.md-dialog-enter-from,
		&.md-dialog-leave-to {
			.md-dialog-container {
				opacity: 0;
				transform: scale(0.9);
			}

			.md-dialog-fullscreen {
				@include layoutmixins.md-layout-xsmall {
					opacity: 1;
					transform: translate(0, 0);
				}
			}
		}
	}

	.md-dialog-container {
		@include elevationmixins.md-elevation(24);
		min-width: 280px;
		max-width: 80%;
		max-height: 80%;
		margin: auto;
		display: flex;
		flex-flow: column;
		overflow: hidden;
		border-radius: 2px;
		backface-visibility: hidden;
		pointer-events: auto;
		opacity: 1;
		transform-origin: center center;
		transition: opacity $opacity-transition-duration variables.$md-transition-stand-timing,
			transform $transform-transition-duration variables.$md-transition-stand-timing;
		will-change: opacity, transform;

		&.md-dialog-leave,
		&.md-dialog-enter-to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}

		&.md-dialog-enter-from,
		&.md-dialog-leave-to {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.9);
		}
	}

	.md-dialog-container {
		.md-tabs {
			flex: 1;
			max-width: 100%;
		}

		.md-tabs-navigation {
			padding: 0 12px;
		}

		.md-tab {
			@include layoutmixins.md-layout-xsmall {
				padding: 12px;
			}
		}
	}

	.md-dialog-fullscreen {
		@include layoutmixins.md-layout-xsmall {
			width: 100%;
			height: 100%;
			max-width: 100%;
			max-height: 100%;
			border-radius: 0;
			transform: none;

			&.md-dialog-from,
			&.md-dialog-leave-to {
				opacity: 0;
				transform: translate3D(0, 30%, 0);
			}

			&.md-dialog-leave,
			&.md-dialog-enter-to {
				opacity: 1;
				transform: translate3D(0, 0, 0);
			}
		}
	}
</style>
