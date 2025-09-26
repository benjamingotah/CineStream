'use client';

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';

import { getStrictContext } from '@/lib/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';

type CollapsibleContextType = {
  isOpen: boolean;
  setIsOpen: CollapsibleProps['onOpenChange'];
};

const [CollapsibleProvider, useCollapsible] =
  getStrictContext<CollapsibleContextType>('CollapsibleContext');

type CollapsibleProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>;

function Collapsible(props: CollapsibleProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });

  return (
    <CollapsibleProvider value={{ isOpen, setIsOpen }}>
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        {...props}
        onOpenChange={setIsOpen}
      />
    </CollapsibleProvider>
  );
}

type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Trigger
>;

function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

type CollapsibleContentProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Content
> &
  HTMLMotionProps<'div'> & {
    keepRendered?: boolean;
  };

function CollapsibleContent({
  transition = { type: 'spring', stiffness: 150, damping: 22 },
  keepRendered = false,
  ...props
}: CollapsibleContentProps) {
  const { isOpen } = useCollapsible();

  return (
    <AnimatePresence>
      {keepRendered ? (
        <CollapsiblePrimitive.Content
          forceMount
          asChild
          children={
            <motion.div
              key="collapsible-content"
              data-slot="collapsible-content"
              initial={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
              animate={
                isOpen
                  ? { height: 'auto', opacity: 1, '--mask-stop': '100%' }
                  : { height: 0, opacity: 0, '--mask-stop': '0%' }
              }
              transition={transition}
              style={{
                maskImage:
                  'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                WebkitMaskImage:
                  'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                overflow: 'hidden',
              }}
              {...props}
            />
          }
        />
      ) : (
        isOpen && (
          <CollapsiblePrimitive.Content
            forceMount
            asChild
            children={
              <motion.div
                key="collapsible-content"
                data-slot="collapsible-content"
                initial={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
                animate={{ height: 'auto', opacity: 1, '--mask-stop': '100%' }}
                exit={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
                transition={transition}
                style={{
                  maskImage:
                    'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                  WebkitMaskImage:
                    'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                  overflow: 'hidden',
                }}
                {...props}
              />
            }
          />
        )
      )}
    </AnimatePresence>
  );
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  useCollapsible,
  type CollapsibleProps,
  type CollapsibleTriggerProps,
  type CollapsibleContentProps,
  type CollapsibleContextType,
};