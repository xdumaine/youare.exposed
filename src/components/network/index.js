import { h, Component } from 'preact';
import style from './style';

export default class DoNotTrack extends Component {
	state = {
		online: false
	};

	checkState() {
		this.setState({ online: !!navigator.onLine });
	}

	componentDidMount() {
		this.checkState();
		this.timer = setInterval(::this.checkState, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { online }) {
		const res = `Your device is ${ online ? 'online' : 'offline'}`;
		return (
			<div class={style.network}>
				{res}
			</div>
		);
	}
}
