import { h, Component } from 'preact';
import style from './style';

import System from '../system';
import BatteryLevel from '../battery-level';
import DoNotTrack from '../do-not-track';
import IpAddresses from '../ip-addresses';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<System/>
				<BatteryLevel/>
				<DoNotTrack/>
				<IpAddresses/>
			</div>
		);
	}
}
