import { h, Component } from 'preact';
import style from './style';

export default class DoNotTrack extends Component {
	state = {
		enabled: false
	};

	componentDidMount() {
		this.setState({ enabled: !!navigator.doNotTrack });
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { enabled }) {

		const enabledClass = this.state.enabled ? 'enabled' : 'disabled'
		return (
			<div class={style.donottrack}>
				<div class={enabled}>
					<div class="message">
						Do not track:
						 <span class="state"> {enabledClass} </span>
					</div>
				</div>
			</div>
		);
	}
}
