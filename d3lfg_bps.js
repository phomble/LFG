(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<table>
				<tr>
					<td>Maximum value of gauge: <input id="bps_maxValue" type="number"></td>
				</tr>
				<tr>
					<td>Value: <input id="bps_val" type="number" step=0.01 min=1 max=100></td>
				</tr>
			</table>
			<input type="submit" style="display:none;">
		</form>
		<style>
			:host {
				display: block;
				padding: 1em 1em 1em 1em;
			}
		</style>
	`;
	class PwC_LFG_Bps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
			this._shadowRoot.getElementById("bps_maxValue").addEventListener("input", this._formSubmit.bind(this));
			this._shadowRoot.getElementById("bps_val").addEventListener("input", this._formSubmit.bind(this));
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
						maxValue: this.maxValue,
						value: this.value
					}
				}
			}));
		}
		set maxValue(newVal) {
			this._shadowRoot.getElementById("bps_maxValue").value = newVal;
		}
		get maxValue() {
			return this._shadowRoot.getElementById("bps_maxValue").value;
		}
		set value(newVal) {
			this._shadowRoot.getElementById("bps_val").value = newVal;
		}
		get value() {
			return this._shadowRoot.getElementById("bps_val").value;
		}
	}
	
	customElements.define("com-gmail-cse-ari007-d3lfg-bps", PwC_LFG_Bps);
})();