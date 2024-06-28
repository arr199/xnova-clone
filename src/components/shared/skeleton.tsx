import { twMerge } from 'tailwind-merge';

interface SkeletonProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: React.ReactNode;
}

export function Skeleton({ className, children, ...props }: SkeletonProps): JSX.Element {
	return (
		<div className={twMerge('anima animate-pulse bg-[#a0a0a0]', className)} {...props}>
			{children}
		</div>
	);
}
