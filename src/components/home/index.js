import { h, Component } from 'preact';
import style from './style';

import System from '../system';
import BatteryLevel from '../battery-level';
import DoNotTrack from '../do-not-track';
import IpAddresses from '../ip-addresses';
import Location from '../location';
import Motion from '../motion';
import Network from '../network';
import Devices from '../devices';

import adapter from 'webrtc-adapter';
window.adapter = adapter;

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<System/>
				<BatteryLevel/>
				<Network/>
				<Devices/>
				<DoNotTrack/>
				<IpAddresses/>
				<Motion/>
				<Location/>
				<Location map="map"/>
			</div>
		);
	}
}
