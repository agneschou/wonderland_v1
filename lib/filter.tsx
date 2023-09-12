import { IOption } from '@/model/IOption';

export function filterOption(options: IOption[]): (value: string, search: string) => number {
  return (value, search) =>
    (search.startsWith('@') && value.includes(search.slice(1))) ||
    options
      ?.find((option) => option.value.toLowerCase() === value)
      ?.label?.toString()
      .includes(search)
      ? 1
      : 0;
}
