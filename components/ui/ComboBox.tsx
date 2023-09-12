'use client';

import { Button } from './Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './Command';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { compareIgnoreCase } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { ReactNode, forwardRef } from 'react';
import { filterOption } from '../../lib/filter';
import { ScrollArea } from './ScrollArea';
import { IOption } from '@/model/IOption';

export interface IComboBoxBaseProps {
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  filter?: (value: string, search: string) => number;
  handleSelect?: (value: string, fieldValue: any) => any;
  checkSelected?: (optionKey: string, fieldValue: any) => boolean;
  showValue?: (options: IOption[], fieldValue: any) => ReactNode | string | boolean;
  clearSelect?: () => void;
  options: IOption[];
}
export interface IComboBoxProps extends IComboBoxBaseProps {
  value: string | string[];
  onChange: Function;
}

export const ComboBox = forwardRef(
  (
    {
      placeholder,
      options,
      searchPlaceholder = 'Search, with @ referring key',
      emptyMessage = 'Not found.',
      filter = filterOption(options),
      handleSelect,
      checkSelected = (optionKey, fieldValue) => optionKey === fieldValue,
      showValue = defaultShowValue,
      clearSelect = undefined,
      value,
      onChange,
    }: IComboBoxProps,
    ref
  ) => {
    const handleChange = (onSelectValue: string): void => {
      const result = handleSelect ? handleSelect(onSelectValue, value) : onSelectValue;
      onChange(result);
    };
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' className={cn('w-full gap-2', !value && 'text-muted-foreground')}>
            <span className='grow space-x-1 overflow-hidden text-ellipsis whitespace-nowrap text-left'>
              {showValue(options, value) || placeholder}
            </span>
            {clearSelect && !!value && !!value.length && (
              <X className='h-4 w-4 shrink-0 opacity-50' onClick={() => clearSelect()} />
            )}
            <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          {options?.length > 0 && (
            <Command filter={filter}>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <ScrollArea
                className={cn('h-full', {
                  'h-[320px]': options.length > 10,
                })}
              >
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem key={option.value} value={option.value} onSelect={(value) => handleChange(value)}>
                      <Check className={cn('mr-2 h-4 w-4', checkSelected(option.value, value) ? 'opacity-100' : 'opacity-0')} />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    );
  }
);

ComboBox.displayName = 'ComboBox';

function defaultShowValue(options: IOption[], value: string) {
  if (typeof value !== 'string') return false;
  return value ? options.find((option) => compareIgnoreCase(option.value, value))?.label : false;
}
