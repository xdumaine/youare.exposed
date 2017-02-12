import { h, Component } from 'preact';
import style from './style';

export default class BatteryLevel extends Component {
	state = {
		level: 1,
		charging: false
	};

	updateAllBatteryInfo() {
		this.updateChargeInfo();
		this.updateLevelInfo();
		this.updateChargingInfo();
		this.updateDischargingInfo();
	}


	updateChargingInfo(){
	  console.log("Battery charging time: "
				   + this.battery.chargingTime + " seconds");
	}

	updateDischargingInfo(){
	  console.log("Battery discharging time: "
				   + this.battery.dischargingTime + " seconds");
	}

	updateLevelInfo(){
	  console.log("Battery level: "
				  + this.battery.level * 100 + "%");
	  this.setState({ level: this.battery.level.toFixed(1) });
	}

	updateChargeInfo(){
	  console.log("Battery charging? "
				  + (this.battery.charging ? "Yes" : "No"));
	  this.setState({charging: this.battery.charging });
	}

	componentDidMount() {
		navigator.getBattery().then((battery) => {
		  	this.battery = battery;
			this.updateAllBatteryInfo();
			battery.addEventListener('chargingchange', ::this.updateChargeInfo);
			battery.addEventListener('levelchange', ::this.updateLevelInfo);
			battery.addEventListener('chargingtimechange', ::this.updateChargingInfo);
			battery.addEventListener('dischargingtimechange', ::this.updateDischargingInfo);
		});
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { level, charging }) {
		const isCharging = charging ? 'charging' : 'not charging'
		return (
			<div class={style.battery}>
				<meter max="1.0" min="0.0" value={ level } low=".30" optimum="0.5"></meter>
				<label>Battery at { level * 100 }%
				</label>
				<span class="charging"> ({isCharging}) </span>
			</div>
		);
	}
}
