import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>youare.exposed</h1>
				<nav>
					<Link href="/">Home</Link>
					<Link href="/about">About</Link>
				</nav>
			</header>
		);
	}
}
