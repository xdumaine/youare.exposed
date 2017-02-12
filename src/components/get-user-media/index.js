import { h, Component } from 'preact';
import style from './style';

export default class GetUserMedia extends Component {
	state = {
		enabled: false,
		stream: false,
		pending: false
	};

	componentDidMount() {
		this.setState({ enabled: !!navigator.mediaDevices.getUserMedia });
		this.startMedia = this._startMedia.bind(this);
	}

	_startMedia(e) {
		this.setState({ pending: true });
		console.log('media', e, this);
		navigator.mediaDevices.getUserMedia({ audio: true, video: true })
			.then(stream => {
				this.setState({ pending: false })
				this.setState({ stream: stream });
				document.getElementById('video').srcObject = stream;
			});
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { enabled, stream, pending }) {
		if (!enabled) {
			return null;
		}

		let output;
		if (!stream && !pending) {
			output = (
				<button onclick={this.startMedia}>Capture Camera</button>
			);
		} else {
			output = (
				<video id="video" muted="true" autoplay="autoplay"/>
			);
		}
		return (
			<div class={style.getusermedia}>
				{output}
			</div>
		);
	}
}
