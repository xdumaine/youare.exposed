import { h, Component } from 'preact';
import style from './style';

export default class Location extends Component {
	state = {
		location: null
	}

	componentDidMount() {

		const http = new XMLHttpRequest();
		const url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAuzBX3VW1x1ThzSgvF33lYx0ISuP0pdY0";
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		http.onreadystatechange = () => {
		    if (http.readyState === 4 && http.status === 200) {
		        this.setState({ location: JSON.parse(http.responseText).location });
				window.initMap();
		    }
		};
		http.send();

		window.initMap = () => {
			if (this.state.mapLoaded || !this.state.location) {
				return;
			}
			var loc = { lat: this.state.location.lat, lng: this.state.location.lng };
	        var map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 4,
	          center: loc
	        });
	        var marker = new google.maps.Marker({
	          position: loc,
	          map: map
	        });
			this.setState({ mapLoaded: true });
		}
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { location }) {
		if (this.props.map === "map") {
			return (
				<div class={style.map}>
					<div id="map"></div>
					<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuzBX3VW1x1ThzSgvF33lYx0ISuP0pdY0&callback=initMap"></script>
				</div>
			);
		} else {
			const data = !this.state.location ? null : (
				<div>
					<div>Lat: { location.lat }</div>
					<div>Lng: { location.lng }</div>
				</div>
			);
			return (
				<div class={style.location}>
					{ data }
				</div>
			);
		}
	}
}
