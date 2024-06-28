import { twMerge } from 'tailwind-merge';
import { Label } from '../ui/label';
import { Input as ShadcnInput } from '../ui/input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label?: string;
	error: string | '';
	register: any;
	name: string;
}

export function Input({
	name = '',
	className = '',
	label = '',
	error = '',
	register,
	...rest
}: InputProps): JSX.Element {
	return (
		<div className="flex flex-col py-2 w-full">
			{label !== '' ? <Label htmlFor="">{label}</Label> : null}
			<ShadcnInput
				{...register(name)}
				className={twMerge(' px-4 py-2  rounded-md mt-1  ', className)}
				{...rest}
			/>
			{error !== '' ? <span className="text-red-500 mt-2 text-sm">{error}</span> : null}
		</div>
	);
}
