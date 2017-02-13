import { h, Component } from 'preact';
import style from './style';

export default class BatteryLevel extends Component {
	state = {
		level: 1,
		charging: false,
		enabled: true
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
		if (!navigator.getBattery) {
			this.setState({ enabled: false });
			return;
		}

		navigator.getBattery().then((battery) => {
		  	this.battery = battery;
			this.updateAllBatteryInfo();
			battery.addEventListener('chargingchange', ::this.updateChargeInfo);
			battery.addEventListener('levelchange', ::this.updateLevelInfo);
			battery.addEventListener('chargingtimechange', ::this.updateChargingInfo);
			battery.addEventListener('dischargingtimechange', ::this.updateDischargingInfo);
		});
	}

	render({}, { level, charging, enabled }) {
		if (!enabled) {
			return (
				<div class={style.battery}>
					Battery information not available
					<pre>navigator.getBattery</pre>
				</div>
			);
		}

		const battery = charging ? 'battery_charging_full' : (level < 0.3 ? 'battery_alert' : 'battery_std');
		return (
			<div class={style.battery}>
				<meter max="1.0" min="0.0" value={ level } low=".30" optimum="0.5"></meter>
				<label><icon class="ico">{ battery }</icon> { level * 100 }%
				</label>
			</div>
		);
	}
}
