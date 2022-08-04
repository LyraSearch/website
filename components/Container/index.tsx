import { FC } from "react"
import clx from 'classnames';

type ContainerProps = {
  children: React.ReactNode,
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full',
  className?: string
}

export const Container: FC<ContainerProps> = ({ children, size = 'xl', className }) => (
  <div className={
    clx('m-auto', className, {
      'w-full': size === 'full',
      'w-5/6': size === 'xl',
      'w-4/6': size === 'lg',
      'w-3/6': size === 'md',
      'w-2/6': size === 'sm',
    })
  }>
    {children}
  </div>
)