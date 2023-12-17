/**
 * Button component
 */

type StatusType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'discovery';

export interface BaseProps {
	/**
	 * visual style
	 * @default 'outline'
	 */
	variant?: 'solid' | 'soft' | 'outline'/*  | 'text' */;

	/**
	 * Only applies when {@linkcode variant} is either `solid` or `soft`.
	 *
	 * @default 'primary'
	 * @todo
	 */
	color?: StatusType;
}

interface ButtonProps extends Omit<preact.ComponentProps<'button'>, 'color'>, BaseProps {}

export function Button(props: ButtonProps) {
	const {variant, color, ...other} = props;

	return <button
		class={'button'}
		{...other}
		data-color={color}
		data-variant={variant}
	/>
}

interface LinkButtonProps extends Omit<preact.ComponentProps<'a'>, 'color'>, BaseProps {}

export function LinkButton(props: LinkButtonProps) {
	const {variant, color, ...other} = props;

	return <a
		class={'button'}
		{...other}
		data-color={color}
		data-variant={variant}
	/>
}
