import type {AttributifyAttributes} from '@unocss/preset-attributify';

// Make typescript happy with attributify mode of unocss: https://github.com/unocss/unocss/tree/main/packages/preset-attributify#react
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/naming-convention
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
