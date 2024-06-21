import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label?: string;
}

export function Input({ className = '', label = '', ...rest }: InputProps): JSX.Element {
	return (
		<div className="flex flex-col py-2 w-full">
			{label !== '' ? <label htmlFor="">{label}</label> : null}
			<input
				className={twMerge('text-black px-4 py-2  rounded-md mt-1', className)}
				{...rest}
			/>
		</div>
	);
}
