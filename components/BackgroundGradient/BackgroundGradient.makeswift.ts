import { lazy } from 'react';
import { runtime } from '@/lib/makeswift/runtime';
import { Style, Checkbox, Slot } from '@makeswift/runtime/controls';

runtime.registerComponent(
  lazy(() => import('./BackgroundGradient').then(module => ({ default: module.BackgroundGradient }))),
  {
    type: 'background-gradient',
    label: 'Custom / Background Gradient',
    props: {
      className: Style(),
      containerClassName: Style(),
      animate: Checkbox({ label: 'Animate' }),
      children: Slot(),
    },
  }
);
