import { h, Component } from 'preact';
import style from './style';

export default class Vibrate extends Component {
	state = {
		enabled: false,
		stream: false,
		pending: false
	};

	componentDidMount() {
		this.setState({ enabled: !!navigator.vibrate });
	}

	vibrate(e) {
		navigator.vibrate([100, 200, 300, 200, 100]);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { enabled, stream, pending }) {
		if (!enabled) {
			return null;
		}
		return (
			<div class={style.vibrate}>
				<button onclick={this.vibrate}>Vibrate</button>
			</div>
		);
	}
}
