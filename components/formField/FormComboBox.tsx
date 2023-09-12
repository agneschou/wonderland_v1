import { ComboBox, IComboBoxBaseProps } from '../ui/ComboBox';
import { FormWrapper, IFormWrapperBaseProps } from './FormWrapper';

export interface IFormComboBoxProps extends IComboBoxBaseProps, IFormWrapperBaseProps {}

export function FormComboBox(props: IFormComboBoxProps) {
	return <FormWrapper {...props} render={({ field }) => <ComboBox {...props} {...field} />} />;
}
