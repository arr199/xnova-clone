import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: React.ReactNode;
}

export function Button({ className, children, ...rest }: ButtonProps): JSX.Element {
	return (
		<button
			className={twMerge(
				'bg-white px-4 py-2  text-black  rounded-md hover:opacity-85',
				className
			)}
			{...rest}>
			{children}
		</button>
	);
}
