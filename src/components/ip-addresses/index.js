import { h, Component } from 'preact';
import style from './style';

export default class DoNotTrack extends Component {
	state = {
		localIp: 'unknown',
		publicIp: 'unknown',
		enabled: true
	};

	gotCandidate(evt) {
		console.log(evt);
		if (!evt.candidate || !evt.candidate.candidate) {
			return;
		}
		const candidate = evt.candidate.candidate;
		const ip = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
		const matches = candidate.match(ip);
		if (!matches || matches.length !== 1) {
			return;
		}
		if (candidate.indexOf('host') > -1) {
			this.setState({ localIp: matches[0] });
		} else if (candidate.indexOf('srflx') > -1) {
			this.setState({ publicIp: matches[0] });
		}
	}

	componentDidMount() {
		if (!window.RTCPeerConnection) {
			this.setState({ enabled: false });
			return;
		}
		const config = {
			iceServers: [
				{
					urls: ['stun:stun1.l.google.com:19302']
				}
			]
		};
		const pc1 = new window.RTCPeerConnection(config);
		const pc2 = new window.RTCPeerConnection(config);
		pc1.onicecandidate = ::this.gotCandidate;
		pc2.onicecandidate = ::this.gotCandidate;
		pc1.createDataChannel('test');
		pc1.createOffer()
			.then(o => {
				pc1.setLocalDescription(o);
				return new Promise(resolve => {
					setTimeout(t => resolve(o), 3000);
				});
			})
			.then(o => {
				pc2.setRemoteDescription(o);
				return pc2.createAnswer();
			})
			.then(a => {
				pc2.setLocalDescription(a);
				return new Promise(resolve => {
					setTimeout(t => resolve(a), 3000);
				});
			})
			.then(a => {
				pc1.setRemoteDescription(a);
			});
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { localIp, publicIp, enabled }) {
		console.log('rendering', enabled);
		if (!enabled) {
			return (
				<div class={style.ipaddresses}>
					No IP address information available from client
					<pre>(RTCPeerConnection)</pre>
				</div>
			);
		}

		const enabledClass = this.state.enabled ? 'enabled' : 'disabled'
		return (
			<div class={style.ipaddresses}>
				<div>Local IP: {localIp}</div>
				<div>Public IP: {publicIp}</div>
			</div>
		);
	}
}
