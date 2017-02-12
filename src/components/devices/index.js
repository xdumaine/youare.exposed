import { h, Component } from 'preact';
import style from './style';
import browserama from 'browserama';

export default class Devices extends Component {
	state = {
		outputs: 0,
		mics: 0,
		cameras: 0,
		enabled: false
	};

	componentDidMount() {
		this.setState({ enabled: true });
		navigator.mediaDevices.enumerateDevices()
			.then(devices => {
				this.setState({ outputs: devices.filter(d => d.kind === 'audiooutput' && d.deviceId !== 'default').length });
				this.setState({ mics: devices.filter(d => d.kind === 'audioinput' && d.deviceId !== 'default').length });
				this.setState({ cameras: devices.filter(d => d.kind === 'videoinput' && d.deviceId !== 'default').length });
			});
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {

	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { enabled, cameras, mics, outputs }) {
		if (!enabled) {
			return null;
		}
		return (
			<div class={style.devices}>
				<div class="cameras">You have {cameras} camera(s)</div>
				<div class="mics">You have {mics} microphone(s)</div>
				<div class="ouputs">You have {outputs} output device(s)</div>
			</div>
		);
	}
}
