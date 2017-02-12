import { h, Component } from 'preact';
import style from './style';
import browserama from 'browserama';

export default class System extends Component {
	state = {
		browser: null,
		os: null,
		version: null
	};

	componentDidMount() {
		for (let key in browserama) {
			if (browserama.hasOwnProperty(key)) {
				console.log(key);
				if (browserama[key]) {
					this.setState({ browser: key.substr(2) });
					return;
				}
			}
		}
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {

	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { browser, os, version }) {
		return (
			<div class={style.system}>
				{ browser }
			</div>
		);
	}
}
