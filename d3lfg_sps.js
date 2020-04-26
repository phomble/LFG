(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<table>
				<tr>
					<td>Circle color: <input id="sps_circleColor" type="color" value="#178BCA"></td>
				</tr>
				<tr>
					<td>Circle thickness (as % of Radius): <input id="sps_circleThickness" type="number" min="0.05" max="0.4" step="0.01"></td>
				</tr>
				<tr>
					<td>Wave color: <input id="sps_color" type="color" value="#178BCA"></td>
				</tr>
				<tr>
					<td>Wave height: <input id="sps_waveHeight" type="number" min="0" max="0.2" step="0.01"></td>
				</tr>
				<tr>
					<td>Text color outside wave: <input id="sps_textColor" type="color" value="#045681"></td>
				</tr>
				<tr>
					<td>Text color within wave: <input id="sps_waveTextColor" type="color" value="#A4DBf8"></td>
				</tr>
				<tr>
					<td><input id="sps_perc_disp" type="checkbox" checked>Display as percentage</td>
				</tr>
				<tr>
					<td><input id="sps_waveAnimate" type="checkbox" checked>Animate wave</td>
				</tr>
				<tr>
					<td>Number of full waves: <input id="sps_waveCount" type="number" min="1" max="5"></td>
				</tr>
			</table>
			<input type="submit" style="display:none;">
		</form>
		<style>
			input:out-of-range {
			  background-color: rgba(255, 0, 0, 0.25);
			}
		</style>
	`;
	class PwC_LFG_Sps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
			this._shadowRoot.getElementById("sps_perc_disp").addEventListener("change", this._formSubmit.bind(this));
			this._shadowRoot.getElementById("sps_waveAnimate").addEventListener("change", this._formSubmit.bind(this));
			this._shadowRoot.getElementById("sps_color").addEventListener("change", this._formSubmit.bind(this));
			this._shadowRoot.getElementById("sps_waveTextColor").addEventListener("change", this._formSubmit.bind(this));
			this._shadowRoot.getElementById("sps_textColor").addEventListener("change", this._formSubmit.bind(this));
			this._shadowRoot.getElementById("sps_circleColor").addEventListener("change", this._formSubmit.bind(this));
			this._shadowRoot.getElementById("sps_waveCount").addEventListener("input", this._formSubmit.bind(this));
			this._shadowRoot.getElementById("sps_circleThickness").addEventListener("input", this._formSubmit.bind(this));
			this._shadowRoot.getElementById("sps_waveHeight").addEventListener("input", this._formSubmit.bind(this));
		}
		
		_formSubmit(e){
			e.preventDefault();
			this._shadowRoot.getElementById("form").dispatchEvent(new Event('submit'));
		}
		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
				detail: {
					properties: {
						waveColor: this.waveColor,
						waveCount: this.waveCount,
						waveHeight: this.waveHeight,
						circleColor: this.circleColor,
						waveTextColor: this.waveTextColor,
						textColor: this.textColor,
						displayPercent: this.displayPercent,
						waveAnimate: this.waveAnimate,
						circleThickness: this.circleThickness
					}
				}
			}));
		}
		set circleColor(newColor) {
			this._shadowRoot.getElementById("sps_circleColor").value = newColor;
		}
		get circleColor() {
			return this._shadowRoot.getElementById("sps_circleColor").value;
		}
		set waveColor(newColor) {
			this._shadowRoot.getElementById("sps_color").value = newColor;
		}
		get waveColor() {
			return this._shadowRoot.getElementById("sps_color").value;
		}
		set waveTextColor(newColor) {
			this._shadowRoot.getElementById("sps_waveTextColor").value = newColor;
		}
		get waveTextColor() {
			return this._shadowRoot.getElementById("sps_waveTextColor").value;
		}
		set textColor(newColor) {
			this._shadowRoot.getElementById("sps_textColor").value = newColor;
		}
		get textColor() {
			return this._shadowRoot.getElementById("sps_textColor").value;
		}
		set displayPercent(flag) {
			this._shadowRoot.getElementById("sps_perc_disp").checked = flag;
		}
		get displayPercent() {
			return this._shadowRoot.getElementById("sps_perc_disp").checked;
		}
		set waveAnimate(flag) {
			this._shadowRoot.getElementById("sps_waveAnimate").checked = flag;
		}
		get waveAnimate() {
			return this._shadowRoot.getElementById("sps_waveAnimate").checked;
		}
		set waveCount(newVal) {
			if(newVal >=0 && newVal <=5){
				this._shadowRoot.getElementById("sps_waveCount").value = newVal;
			} else{
				this._shadowRoot.getElementById("sps_waveCount").value = 3;
			}
		}
		get waveCount() {
			var count = this._shadowRoot.getElementById("sps_waveCount").value;
			if(count < 0){
				return "0";
			}
			else if(count > 5){
				return "5";
			}
			else if(count == null || count == undefined || (count+'') == ''){
				return "3";
			}
			else return count;
		}
		set waveHeight(newVal) {
			if(newVal >=0 && newVal <=0.2){
				this._shadowRoot.getElementById("sps_waveHeight").value = newVal;
			} else{
				this._shadowRoot.getElementById("sps_waveHeight").value = 0.05;
			}
		}
		get waveHeight() {
			var ht = this._shadowRoot.getElementById("sps_waveHeight").value;
			if(ht < 0){
				return "0";
			}
			else if(ht > 0.2){
				return "0.2";
			}
			else if(ht == null || ht == undefined || (ht+'') == ''){
				return "0.05";
			}
			else return ht;
		}
		set circleThickness(newVal) {
			if(newVal >=0.05 && newVal <=0.4){
				this._shadowRoot.getElementById("sps_circleThickness").value = newVal;
			} else{
				this._shadowRoot.getElementById("sps_circleThickness").value = 0.05;
			}
		}
		get circleThickness() {
			var thk = this._shadowRoot.getElementById("sps_circleThickness").value;
			if(thk < 0.05){
				return "0.05";
			}
			else if(thk > 0.4){
				return "0.4";
			}
			else if(thk == null || thk == undefined || (thk+'') == ''){
				return "0.05";
			}
			else return thk;
		}
	}
	
	customElements.define("com-gmail-cse-ari007-d3lfg-sps", PwC_LFG_Sps);
})();