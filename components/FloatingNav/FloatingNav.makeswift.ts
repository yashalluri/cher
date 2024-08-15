import { lazy } from 'react'
import { List, Shape, Slot, Style } from '@makeswift/runtime/controls'
import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
  lazy(() => import('./FloatingNav')),
  {
    type: 'floating-nav',
    label: 'Custom / FloatingNav',
    props: {
      className: Style(),
      navItems: List({
        label: 'Navigation Items',
        type: Shape({
          type: {
            name: Slot(),
            link: Slot(),
            icon: Slot(),
          },
        }),
        getItemLabel(item) {
          if (!item) return 'Nav Item'; 
          return item.name ?? 'Nav Item';
        },
      }),
    },
  }
)
