import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface IModalGround extends HTMLAttributes<HTMLDivElement> {
  close?: () => void;
}

export function ModalGround({ children, className, close, ...props }: IModalGround) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
        className
      )}
      {...props}
    >
      {close && <div className='w-screen h-screen bg-transparent -z-10 absolute' onClick={close}></div>}

      {children}
    </div>
  );
}
