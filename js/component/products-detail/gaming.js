/* Methods mixed into <products-detail> (see detail.js). */

export class GamingRenderer {
  /* Gaming */

  renderGaming(boxProduct, product) {
    const specs = this.getSpecs(product);

    const deviceType = specs.device_type;
    const configurations = {
      "Gaming Monitor": {
        hero: [
          ["🖥️", "Display", specs.display],
          ["📐", "Resolution", specs.resolution],
          ["⚡", "Refresh Rate", specs.refresh_rate],
          ["⏱️", "Response Time", specs.response_time],
          ["🎨", "Panel Type", specs.panel_type],
          ["✨", "HDR", specs.hdr],
        ],
        details: [
          ["Display", specs.display],
          ["Resolution", specs.resolution],
          ["Refresh Rate", specs.refresh_rate],
          ["Response Time", specs.response_time],
          ["Panel Type", specs.panel_type],
          ["HDR", specs.hdr],
          ["Connectivity", specs.connectivity],
          ["Lighting", specs.lighting],
        ],
      },

      "Gaming Keyboard": {
        hero: [
          ["⌨️", "Type", specs.type],
          ["🔌", "Connection", specs.connection],
          ["⌨️", "Switches", specs.switches],
          ["🔤", "Layout", specs.layout],
          ["💻", "Compatibility", specs.compatibility],
          ["💡", "Lighting", specs.lighting],
        ],
        details: [
          ["Type", specs.type],
          ["Connection", specs.connection],
          ["Switches", specs.switches],
          ["Layout", specs.layout],
          ["Compatibility", specs.compatibility],
          ["Lighting", specs.lighting],
          ["Polling Rate", specs.polling_rate],
          ["Warranty", product.warranty],
        ],
      },

      "Gaming Mouse": {
        hero: [
          ["🔌", "Connection", specs.connection],
          ["🎯", "Sensor", specs.sensor],
          ["🎚️", "DPI", specs.dpi],
          ["🔘", "Buttons", specs.buttons],
          ["⚡", "Polling Rate", specs.polling_rate],
          ["🔋", "Battery", specs.battery],
        ],
        details: [
          ["Connection", specs.connection],
          ["Sensor", specs.sensor],
          ["DPI", specs.dpi],
          ["Buttons", specs.buttons],
          ["Polling Rate", specs.polling_rate],
          ["Compatibility", specs.compatibility],
          ["Lighting", specs.lighting],
          ["Battery", specs.battery],
        ],
      },

      "Gaming Headset": {
        hero: [
          ["🔌", "Connection", specs.connection],
          ["💻", "Compatibility", specs.compatibility],
          ["🎙️", "Microphone", specs.microphone],
          ["🔇", "Noise Cancellation", specs.noise_cancellation],
          ["🔋", "Battery", specs.battery],
          ["💡", "Lighting", specs.lighting],
        ],
        details: [
          ["Connection", specs.connection],
          ["Compatibility", specs.compatibility],
          ["Microphone", specs.microphone],
          ["Noise Cancellation", specs.noise_cancellation],
          ["Battery", specs.battery],
          ["Lighting", specs.lighting],
          ["Warranty", product.warranty],
        ],
      },

      "Game Controller": {
        hero: [
          ["🔌", "Connection", specs.connection],
          ["💻", "Compatibility", specs.compatibility],
          ["🔋", "Battery", specs.battery],
          ["🔘", "Buttons", specs.buttons],
          ["〰️", "Vibration", specs.vibration],
          ["📡", "Wireless Range", specs.wireless_range],
        ],
        details: [
          ["Connection", specs.connection],
          ["Compatibility", specs.compatibility],
          ["Battery", specs.battery],
          ["Buttons", specs.buttons],
          ["Vibration", specs.vibration],
          ["Wireless Range", specs.wireless_range],
          ["Lighting", specs.lighting],
          ["Warranty", product.warranty],
        ],
      },

      "Gaming Desktop": {
        hero: [
          ["⚙️", "Processor", specs.processor],
          ["🧩", "Cores", specs.cores],
          ["🧠", "RAM", specs.ram],
          ["💾", "Storage", specs.storage],
          ["🎮", "GPU", specs.gpu],
          ["🧠", "GPU Memory", specs.gpu_memory],
        ],
        details: [
          ["Processor", specs.processor],
          ["Cores", specs.cores],
          ["RAM", specs.ram],
          ["Storage", specs.storage],
          ["GPU", specs.gpu],
          ["GPU Memory", specs.gpu_memory],
          ["Power Supply", specs.power_supply],
          ["Operating System", specs.operating_system],
          ["Connectivity", specs.connectivity],
        ],
      },
    };
    const config = configurations[deviceType];
    if (!config) {
      this.renderNotFound(boxProduct, "This gaming product type is not supported yet.");

      return;
    }

    const visibleSpecs = config.details.slice(0, 6);

    const extraSpecs = config.details.slice(6);

    const detailGroups = [
      {
        title: "Technical Specifications",
        rows: visibleSpecs.map((item) => [item[1], item[2]]),
      },
    ];
    if (extraSpecs.length) {
      detailGroups.push({
        title: "Additional Information",
        rows: extraSpecs.map((item) => [item[1], item[2]]),
      });
    }

    boxProduct.innerHTML = `

      ${this.renderHero(product, config.hero, {
        showOriginalPrice: false,
      })}


      ${this.renderDetails(
        product,
        detailGroups,
        `Detailed specifications and technical information about this ${deviceType.toLowerCase()}.`,
        extraSpecs.length > 0,
      )}

    `;
  }
}
