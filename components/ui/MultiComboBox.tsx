'use client';
import { compareIgnoreCase } from '@/lib/helper';
import { forwardRef } from 'react';
import { Badge } from './Badge';
import { ComboBox } from './ComboBox';
import { X } from 'lucide-react';
import { IOption } from '@/model/IOption';

export interface IMultiComboBoxProps extends IMultiComboBoxBaseProps {
  options: IOption[];
}

export type ISelectedList = string[];

export interface IMultiComboBoxBaseProps {
  value: string[];
  onChange: Function;
  selectedList?: ISelectedList;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  filter?: (value: string, search: string) => number;
}

export const MultiComboBox = forwardRef<HTMLDivElement, IMultiComboBoxProps>(
  ({ selectedList, ...props }: IMultiComboBoxProps, ref) => {
    return (
      <ComboBox
        {...props}
        showValue={showListValue}
        checkSelected={checkSelected}
        handleSelect={handleSelect}
        clearSelect={() => props.onChange([])}
      />
    );

    function checkSelected(optionKey: string, fieldValue: string[]) {
      const selectedValues = [...(selectedList || fieldValue)];
      return !!selectedValues.find((value: string | number) => compareIgnoreCase(value, optionKey));
    }

    function handleSelect(value: string, fieldValue: string[]) {
      const currenctList = [...fieldValue];
      const index = currenctList.findIndex((field) => compareIgnoreCase(field, value));
      const alreadySelected = checkSelected(String(value), fieldValue);

      if (index < 0 && !alreadySelected) {
        currenctList.push(value);
      } else if (index >= 0 && alreadySelected) {
        currenctList.splice(index, 1);
      }

      return currenctList;
    }

    function showListValue(options: IOption[], fieldValue: string[]) {
      if (!fieldValue || fieldValue.length === 0) return false;

      return (
        <>
          {fieldValue.map((key: string) => {
            const option = options.find((option) => option.value.toLowerCase() === key);
            if (!option) return false;
            return (
              <Badge key={option.value}>
                {option.label}
                <X className='ml-1 h-3 w-3 stroke-[3px]' onClick={() => cancelSelect(option.value, fieldValue)} />
              </Badge>
            );
          })}
        </>
      );
    }

    function cancelSelect(value: string, fieldValue: string[]) {
      props.onChange(handleSelect(value, fieldValue));
    }
  }
);

MultiComboBox.displayName = 'MultiComboBox';
