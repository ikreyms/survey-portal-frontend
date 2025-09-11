import { useQuasar } from "quasar";
import { computed } from "vue";


export const useScreen = () => {
  const q = useQuasar();

  const isScreenLtSm = computed(() => q.screen.lt.sm);
  const isScreenLtMd = computed(() => q.screen.lt.md);
  const isScreenLtLg = computed(() => q.screen.lt.lg);
  const isScreenLtXl = computed(() => q.screen.lt.xl);

  const isScreenGtXs = computed(() => q.screen.gt.xs);
  const isScreenGtSm = computed(() => q.screen.gt.sm);
  const isScreenGtMd = computed(() => q.screen.gt.md);
  const isScreenGtLg = computed(() => q.screen.gt.lg);

  return {
    isScreenLtSm,
    isScreenLtMd,
    isScreenLtLg,
    isScreenLtXl,
    isScreenGtXs,
    isScreenGtSm,
    isScreenGtMd,
    isScreenGtLg,
  }
}
