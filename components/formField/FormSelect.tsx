import { FormWrapper, IFormWrapperBaseProps } from '@/components/formField/FormWrapper';
import { Selector } from '@/components/ui/Selector';
import { IOption } from '@/model/IOption';

export interface IFormSelectProps extends IFormWrapperBaseProps {
	placeholder: string;
	options: IOption[];
}

export function FormSelect(props: IFormSelectProps) {
	return <FormWrapper {...props} render={({ field }) => <Selector {...props} {...field} />} />;
}
