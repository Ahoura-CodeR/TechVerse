/* Methods mixed into <products-detail> (see detail.js). */

export class CategoryRenderers {
  /* Phones */

  renderPhones(boxProduct, product) {
    const specs = this.getSpecs(product);

    const storageOptions = Array.isArray(product.storage_options) ? product.storage_options : [];
    const storageButtons = storageOptions
      .map(
        (storage, index) => `

          <button
            class="storage-btn ${index === 0 ? "active" : ""}"
            type="button"
          >
            ${storage}
          </button>

      `,
      )
      .join("");

    const heroSpecs = [
      ["📱", "Display", specs.display],
      ["⚙️", "CPU", specs.processor],
      ["🧩", "RAM", specs.ram],
      ["📸", "Main Camera", specs.main_camera],
      ["🤳", "Front Camera", specs.front_camera],
      ["🔋", "Battery", specs.battery],
    ];
    const detailsGroups = [
      {
        title: "Display",
        rows: [
          ["Screen diagonal", specs.display],
          ["Screen resolution", specs.resolution],
          ["Refresh rate", specs.refresh_rate],
          ["Screen type", specs.screen_type],
        ],
      },

      {
        title: "Performance",
        rows: [
          ["Processor", specs.processor],
          ["Number of cores", specs.cores],
          ["RAM", specs.ram],
          ["Storage", specs.storage],
          ["Operating system", specs.operating_system],
        ],
      },

      {
        title: "Camera",
        rows: [
          ["Main camera", specs.main_camera],
          ["Front camera", specs.front_camera],
        ],
      },

      {
        title: "Battery & Charging",
        rows: [
          ["Battery capacity", specs.battery],
          ["Charging", specs.charging],
        ],
      },

      {
        title: "Connectivity",
        rows: [["Network", specs.network]],
      },

      {
        title: "Protection",
        rows: [["Protection class", specs.protection]],
      },
    ];
    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs, {
        storage: storageButtons,
      })}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }

  /* Smartwatches */

  renderSmartwatches(boxProduct, product) {
    const specs = this.getSpecs(product);

    const heroSpecs = [
      ["⌚", "Display", specs.display],
      ["❤️", "Sensors", specs.sensors],
      ["🔋", "Battery", specs.battery],
      ["📍", "GPS", specs.gps],
      ["📡", "Connectivity", specs.connectivity],
      ["📱", "Compatibility", specs.compatibility],
    ];
    const detailsGroups = [
      {
        title: "Display",
        rows: [
          ["Display", specs.display],
          ["Resolution", specs.resolution],
          ["Screen type", specs.screen_type],
          ["Protection", specs.protection],
        ],
      },

      {
        title: "Health & Connectivity",
        rows: [
          ["Sensors", specs.sensors],
          ["Health features", specs.health_features],
          ["GPS", specs.gps],
          ["Connectivity", specs.connectivity],
          ["Compatibility", specs.compatibility],
        ],
      },

      {
        title: "Battery & Charging",
        rows: [
          ["Battery", specs.battery],
          ["Charging", specs.charging],
          ["Storage", specs.storage],
        ],
      },
    ];
    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs)}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }

  /* Cameras */

  renderCameras(boxProduct, product) {
    const specs = this.getSpecs(product);

    const heroSpecs = [
      ["📷", "Sensor", specs.sensor],
      ["🔍", "Resolution", specs.resolution],
      ["🎥", "Video", specs.video],
      ["🔭", "Lens", specs.lens],
      ["🎯", "Autofocus", specs.autofocus],
      ["⚖️", "Weight", specs.weight],
    ];
    const detailsGroups = [
      {
        title: "Image & Sensor",
        rows: [
          ["Sensor", specs.sensor],
          ["Resolution", specs.resolution],
          ["Lens mount", specs.lens_mount],
          ["Lens", specs.lens],
          ["Stabilization", specs.stabilization],
          ["Autofocus", specs.autofocus],
        ],
      },

      {
        title: "Video & Exposure",
        rows: [
          ["Video", specs.video],
          ["ISO range", specs.iso_range],
          ["Shutter speed", specs.shutter_speed],
          ["Screen", specs.screen],
        ],
      },

      {
        title: "Battery & Connectivity",
        rows: [
          ["Battery", specs.battery],
          ["Connectivity", specs.connectivity],
          ["Weight", specs.weight],
        ],
      },
    ];
    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs)}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }

  /* Headphones */

  renderHeadphones(boxProduct, product) {
    const specs = this.getSpecs(product);

    const heroSpecs = [
      ["🎧", "Type", specs.type],
      ["🔊", "Driver", specs.driver],
      ["🔇", "Noise Cancellation", specs.noise_cancellation],
      ["🔋", "Battery", specs.battery],
      ["📡", "Connection", specs.connection],
      ["⚖️", "Weight", specs.weight],
    ];
    const detailsGroups = [
      {
        title: "Audio",
        rows: [
          ["Type", specs.type],
          ["Driver", specs.driver],
          ["Frequency Response", specs.frequency_response],
          ["Noise Cancellation", specs.noise_cancellation],
        ],
      },

      {
        title: "Connectivity",
        rows: [
          ["Connection", specs.connection],
          ["Codec", specs.codec],
        ],
      },

      {
        title: "Battery & Design",
        rows: [
          ["Battery", specs.battery],
          ["Charging", specs.charging],
          ["Weight", specs.weight],
          ["Water Resistance", specs.water_resistance],
          ["Microphone", specs.microphone],
        ],
      },
    ];
    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs)}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }

  /* Computers */

  renderComputers(boxProduct, product) {
    const specs = this.getSpecs(product);

    const storageOptions = Array.isArray(product.storage_options) ? product.storage_options : [];
    const storageButtons = storageOptions
      .map(
        (storage, index) => `

          <button
            class="storage-btn ${index === 0 ? "active" : ""}"
            type="button"
          >
            ${storage}
          </button>

      `,
      )
      .join("");

    const heroSpecs = [
      ["🖥️", "Display", specs.screen],
      ["⚙️", "Processor", specs.processor],
      ["🧩", "RAM", specs.ram],
      ["💾", "Storage", specs.storage],
      ["🎮", "GPU", specs.gpu],
      ["🧠", "GPU Memory", specs.gpu_memory],
    ];
    const detailsGroups = [
      {
        title: "Display",
        rows: [
          ["Screen", specs.screen],
          ["Resolution", specs.resolution],
          ["Refresh Rate", specs.refresh_rate],
        ],
      },

      {
        title: "Performance",
        rows: [
          ["Processor", specs.processor],
          ["CPU Cores", specs.cores],
          ["RAM", specs.ram],
          ["Storage", specs.storage],
          ["GPU", specs.gpu],
          ["GPU Memory", specs.gpu_memory],
        ],
      },

      {
        title: "System & Connectivity",
        rows: [
          ["Operating System", specs.operating_system],
          ["Ports", specs.ports],
          ["Connectivity", specs.connectivity],
          ["Battery", specs.battery],
          ["Weight", specs.weight],
        ],
      },
    ];
    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs, {
        storage: storageButtons,
      })}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }
}
