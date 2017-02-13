import { h, Component } from 'preact';
import style from './style';


export default class About extends Component {
	render() {
		return (
			<div class={style.about}>
				<p>
					youare.exposed is a little project designed to show
					various bits of information and functionality that are
					exposed to any website just via javascript. This means that
					any website you visit can do or see these things.
					I got plenty of inspiration from <a
						href="http://webkay.robinlinus.com/">webkay</a>.
				</p>
				<p>
					This project was made by me, <a
						href="https://xdumaine.com">Xander Dumaine</a> using <a
						href="https://github.com/developit/preact-boilerplate">
							preact-boilerplate</a> for the <a
					   	href="http://pearlhacks.com">Pearl Hacks</a> 2017
					event, in between helping the hackers. I'd never used
					react or preact before, and wanted to try it with a small
					project. Code is available on <a
						href="https://github.com/xdumaine/youare.exposed/">
					Github</a>, licensed under MIT.
				</p>
				<p>
					No information is
					collected or stored from your visit, except maybe
					normal web analytics (like web traffic, etc).
				</p>

			</div>
		);
	}
}
