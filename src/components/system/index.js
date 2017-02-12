import { h, Component } from 'preact';
import style from './style';
import browserama from 'browserama';

function getBrowser () {
	for (let key in browserama) {
		if (browserama.hasOwnProperty(key)) {
			console.log(key);
			if (browserama[key]) {
				return key.substr(2);
			}
		}
	}
}

export default class System extends Component {
	state = {
		system: null
	};

	componentDidMount() {
		const props = [];
		props.push(getBrowser());
		props.push(navigator.platform);
		props.push(`${navigator.hardwareConcurrency} cores`)
		this.setState({ system: props.join(', ') });
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {

	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { system }) {
		return (
			<div class={style.system}>
				{ system }
			</div>
		);
	}
}
