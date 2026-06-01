import React, { ElementType, ComponentPropsWithRef, ComponentPropsWithoutRef } from 'react';

/** as prop */
export type AsProp<C extends ElementType> = { as?: C };

/** props to omit */
export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

/** merged props (no ref) */
export type PolymorphicProps<C extends ElementType, P = {}> = React.PropsWithChildren<
  P & AsProp<C>
> &
  Omit<ComponentPropsWithRef<C>, PropsToOmit<C, P>>;

/** ref type */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

/** public component signature */
export type PolymorphicComponent<P, D extends ElementType> = <C extends ElementType = D>(
  props: PolymorphicProps<C, P> & { ref?: PolymorphicRef<C> }
) => React.ReactElement | null;

/**
 * ✅ Create polymorphic component
 * render MUST be non-generic to satisfy forwardRef
 */
// export function createPolymorphicComponent<P, D extends ElementType>(
//   render: (props: PolymorphicProps<D, P>, ref: PolymorphicRef<D>) => React.ReactElement | null
// ) {
//   return React.forwardRef(render as React.ForwardRefRenderFunction<D, any>) as PolymorphicComponent<
//     P,
//     D
//   >;
// }

/** Final polymorphic props with ref */
export type PolymorphicPropsWithRef<C extends ElementType, P = {}> = PolymorphicProps<C, P> & {
  ref?: PolymorphicRef<C>;
};

export function withDisplayName<T>(component: T, name: string): T {
  // @ts-expect-error - runtime property
  component.displayName = name;
  return component;
}

export function createPolymorphicComponent<P, D extends ElementType>(
  displayName: string,
  render: (
    props: React.PropsWithoutRef<PolymorphicProps<D, P>>,
    ref: PolymorphicRef<D>
  ) => React.ReactElement | null
) {
  return withDisplayName(
    React.forwardRef(render) as unknown as PolymorphicComponent<P, D>,
    displayName
  );
}

// export function createPolymorphicComponent<P, D extends ElementType>(
//   render: React.ForwardRefRenderFunction<D, React.PropsWithoutRef<PolymorphicProps<D, P>>>
// ) {
//   return React.forwardRef(render) as PolymorphicComponent<P, D>;
// }

// import React from 'react';

// // Utility type to extract props from an element type
// type AsProp<C extends React.ElementType> = {
//   as?: C;
// };

// // Merge component props with the 'as' prop, excluding conflicts
// type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// // Final polymorphic props type
// type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<
//   Props & AsProp<C>
// > &
//   Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// // Polymorphic ref type
// type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

// // Combined props with ref
// type PolymorphicComponentPropWithRef<
//   C extends React.ElementType,
//   Props = {}
// > = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// // Component type definition
// export type PolymorphicComponent<DefaultElement extends React.ElementType, Props = {}> = <
//   C extends React.ElementType = DefaultElement
// >(
//   props: PolymorphicComponentPropWithRef<C, Props>
// ) => React.ReactElement | null;

//******************************************************************************************************************** */
// // packages/react/src/utils/polymorphic.ts

// import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType } from 'react';

// /**
//  * Utility types for creating polymorphic components
//  * Components that can render as different HTML elements via the 'as' prop
//  */

// export type AsProp<T extends ElementType> = {
//   as?: T;
// };

// export type PropsToOmit<T extends ElementType, P> = keyof (AsProp<T> & P);

export type PolymorphicComponentProps<T extends ElementType, Props = {}> = Props &
  AsProp<T> &
  Omit<ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

// export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

// export type PolymorphicComponentPropsWithRef<
//   T extends ElementType,
//   Props = {}
// > = PolymorphicComponentProps<T, Props> & {
//   ref?: PolymorphicRef<T>;
// };

// export type PolymorphicComponent<T extends ElementType, Props = {}> = ((
//   props: PolymorphicComponentPropsWithRef<T, Props>
// ) => React.ReactElement | null) & {
//   displayName: string;
// };
