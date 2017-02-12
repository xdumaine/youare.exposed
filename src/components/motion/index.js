import { h, Component } from 'preact';
import style from './style';

export default class Motion extends Component {
	state = {
		enabled: false,
		moving: true,
		lastMotion: new Date().getTime()
	};

	detectMotion (e) {
		const previousMotion = this.state.lastMotion;
		const now = new Date().getTime();
		const timeDiff = now - previousMotion;

		if (e && (Math.abs(e.acceleration.x) + Math.abs(e.acceleration.y) + Math.abs(e.acceleration.z)) > 1) {
			console.log('Motion event', timeDiff, e);
			this.setState({ lastMotion: now });
		}
		this.setState({ moving: timeDiff < 1000 });
	}

	componentDidMount() {
		if (window.DeviceMotionEvent) {
			this.setState({ enabled: true });
		}
		window.addEventListener('devicemotion', ::this.detectMotion, false);
		this.timer = setInterval(::this.detectMotion, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { moving, enabled }) {
		let result = '';
		if (!this.state.enabled) {
			result = 'Motion data not available.';
		} else if (!this.state.moving) {
			result = 'Your device is likely sitting on a table.';
		} else {
			result = 'Your device is likely in your hand.';
		}
		return (
			<div class={style.motion}>
				{ result }
			</div>
		);
	}
}
