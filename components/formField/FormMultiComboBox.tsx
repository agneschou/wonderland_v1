import { IMultiComboBoxProps, MultiComboBox } from '../ui/MultiComboBox';
import { FormWrapper, IFormWrapperBaseProps } from './FormWrapper';
interface IFormMultiComboBoxProps extends Omit<IMultiComboBoxProps, 'value' | 'onChange'>, IFormWrapperBaseProps {
	selectedList?: string[];
}

export function FormMultiComboBox({ ...props }: IFormMultiComboBoxProps) {
	return <FormWrapper {...props} render={({ field }) => <MultiComboBox {...props} {...field} />} />;
}
