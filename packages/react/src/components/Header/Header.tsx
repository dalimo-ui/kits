import { Children, ElementType, isValidElement, ReactNode } from 'react';
import { c, cn, PolymorphicComponentProps } from '../../utils';
import { TextProps } from '../Text';

const H = c('header');

// ─── Slot marker types ───────────────────────────────────────────────────────

const TOP = 'Header.Top';
const LEADING = 'Header.Leading';
const TITLE = 'Header.Title';
const TRAILING = 'Header.Trailing';
const SUBTITLE = 'Header.Subtitle';
const DESCRIPTION = 'Header.Description';
const ACTIONS = 'Header.Actions';
const BOTTOM = 'Header.Bottom';

type SlotType =
  | typeof TOP
  | typeof LEADING
  | typeof TITLE
  | typeof TRAILING
  | typeof SUBTITLE
  | typeof DESCRIPTION
  | typeof ACTIONS
  | typeof BOTTOM;

// ─── Slot components ─────────────────────────────────────────────────────────

interface SlotProps {
  children?: ReactNode;
  className?: string;
}

const createSlot = (displayName: SlotType, wrapperClass: string) => {
  const Slot = ({ children, className }: SlotProps) => (
    <div className={cn(wrapperClass, className)}>{children}</div>
  );
  Slot.displayName = displayName;
  Slot._slotType = displayName;
  return Slot;
};

const Top = createSlot(TOP, H.e('top'));
const Leading = createSlot(LEADING, H.e('leading'));
const Trailing = createSlot(TRAILING, H.e('trailing'));
const Subtitle = createSlot(SUBTITLE, H.e('subtitle'));
const Description = createSlot(DESCRIPTION, H.e('subtitle')); // alias, same class
const Actions = createSlot(ACTIONS, H.e('actions'));
const Bottom = createSlot(BOTTOM, H.e('bottom'));

interface TitleProps extends SlotProps {
  as?: TextProps<ElementType>['as'];
}

const Title = ({ children, as: As = 'h2', className }: TitleProps) => (
  <As className={cn(H.e('title'), className)}>{children}</As>
);
Title.displayName = TITLE;
Title._slotType = TITLE;

// ─── Slot extraction helper ───────────────────────────────────────────────────

function extractSlots(children: ReactNode) {
  const slots: Partial<Record<SlotType, ReactNode[]>> = {};
  const rest: ReactNode[] = [];

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      const type = child.type as { _slotType?: SlotType };
      if (type._slotType) {
        const key = type._slotType;
        slots[key] = [...(slots[key] ?? []), child];
        return;
      }
    }
    rest.push(child);
  });

  return { slots, rest };
}

type Exclusive<T, U> = (T & { [K in keyof U]?: never }) | (U & { [K in keyof T]?: never });

export type HeaderProps = Exclusive<
  {
    title: ReactNode;
    subtitle?: ReactNode;
    leading?: ReactNode;
    trailing?: ReactNode;
    actions?: ReactNode;
    top?: ReactNode;
    bottom?: ReactNode;
    titleAs?: TextProps<ElementType>['as'];
  },
  { children: ReactNode }
> & {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  spacing?: boolean;
};

// export interface HeaderProps {
//   title: ReactNode;
//   subtitle?: ReactNode;
//   leading?: ReactNode;
//   trailing?: ReactNode;
//   actions?: ReactNode;
//   top?: ReactNode;
//   bottom?: ReactNode;
//   level?: VariantMap['heading'];
//   size?: 'lg' | 'md' | 'sm' | 'xs';
//   titleAs?: TextProps<'heading', ElementType>['as'];
//   spacing?: boolean;
// }

export const Header = <T extends ElementType = 'header'>({
  as,
  size = 'md',
  spacing,
  className,
  children,
  // props API
  title,
  subtitle,
  leading,
  trailing,
  actions,
  top,
  bottom,
  titleAs,
}: PolymorphicComponentProps<T, HeaderProps>) => {
  const Component = (as ?? 'header') as ElementType;
  const isSlotMode = !!children;

  // ── Slot mode ──────────────────────────────────────────────────────────────
  if (isSlotMode) {
    const { slots } = extractSlots(children);

    const resolvedTop = slots[TOP];
    const resolvedLeading = slots[LEADING];
    const resolvedTitle = slots[TITLE];
    const resolvedTrailing = slots[TRAILING];
    const resolvedSubtitle = slots[SUBTITLE] ?? slots[DESCRIPTION];
    const resolvedActions = slots[ACTIONS];
    const resolvedBottom = slots[BOTTOM];

    return (
      <Component className={cn(H.b, H.m(size), spacing && `header--spacing`, className)}>
        {resolvedTop}
        <div className={H.e('main')}>
          <div className={H.e('body')}>
            {resolvedLeading}
            <div className={H.e('content')}>
              <div className={H.e('title-wrapper')}>
                {resolvedTitle}
                {resolvedTrailing}
              </div>
              {resolvedSubtitle}
            </div>
          </div>
          {resolvedActions}
        </div>
        {resolvedBottom}
      </Component>
    );
  }

  // ── Props mode ─────────────────────────────────────────────────────────────
  const HeadingComponent = (titleAs ?? 'h2') as ElementType;

  return (
    <Component className={cn(H.b, H.m(size), spacing && `header--spacing`, className)}>
      {top && <div className={H.e('top')}>{top}</div>}
      <div className={H.e('main')}>
        <div className={H.e('body')}>
          {leading && <div className={H.e('leading')}>{leading}</div>}
          <div className={H.e('content')}>
            <div className={H.e('title-wrapper')}>
              <HeadingComponent className={H.e('title')}>{title}</HeadingComponent>
              {trailing && <div className={H.e('trailing')}>{trailing}</div>}
            </div>
            {subtitle && <div className={H.e('subtitle')}>{subtitle}</div>}
          </div>
        </div>
        {actions && <div className={H.e('actions')}>{actions}</div>}
      </div>
      {bottom && <div className={H.e('bottom')}>{bottom}</div>}
    </Component>
  );
};

Header.Top = Top;
Header.Leading = Leading;
Header.Title = Title;
Header.Trailing = Trailing;
Header.Subtitle = Subtitle;
Header.Description = Description;
Header.Actions = Actions;
Header.Bottom = Bottom;
