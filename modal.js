class Modal extends HTMLElement {
    get visible() {
        return this.hasAttribute("visible");
    }

    set visible(value) {
        if (value) {
            this.setAttribute("visible", "");
        } else {
            this.removeAttribute("visible");
        }
    }

    get title() {
        return this.getAttribute('title');
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    get videoURL() {
        return this.getAttribute('videoURL');
    }

    set videoURL(value) {
        this.setAttribute('videoURL', value);
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this._render();
        this._attachEventHandlers();
    }

    static get observedAttributes() {
        return ["visible", "title"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "title" && this.shadowRoot) {
            this.shadowRoot.querySelector(".title").textContent = newValue;
        }
        if (name === "visible" && this.shadowRoot) {
            if (newValue === null) {
                this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
                this.dispatchEvent(new CustomEvent("close"));
            } else {
                this.shadowRoot.querySelector(".wrapper").classList.add("visible");
                this.dispatchEvent(new CustomEvent("open"))
            }
        }
    }

    _render() {
        const wrapperClass = this.visible ? "wrapper visible" : "wrapper";
        const container = document.createElement("div");
        container.innerHTML = `
          <style>
            .wrapper {
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.3);
              opacity: 0;
              visibility: hidden;
              transform: scale(1.1);
              transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
              z-index: 1;
            }
            .visible {
              opacity: 1;
              visibility: visible;
              transform: scale(1);
              transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
            }
            .modal {
                display: flex;
                font-size: 14px;
                padding: 10px 10px 5px 10px;
                background-color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                min-height: 200px;
                transform: translate(-50%,-50%);
                border-radius: 2px;
                min-width: 600px;
                flex-direction: column;
                flex-wrap: nowrap;
                align-content: flex-start;
                justify-content: space-between;
                border-radius: 5px;
            }
            .title {
              color: black;
              font-size: 18px;
              margin-bottom: 10px;
            }
            .button-container {
              text-align: right;
            }
            button {
              min-width: 80px;
              background-color: #848e97;
              border-color: #848e97;
              border-style: solid;
              border-radius: 2px;
              padding: 3px;
              color:white;
              cursor: pointer;
              margin-top: 10px;
            }
            button:hover {
              background-color: #6c757d;
              border-color: #6c757d;
            }
            @media (max-width: 540px) {
                .modal {
                    min-width: 90%;
                }
            }
          </style>
          <div class='${wrapperClass}'>
            <div class='modal'>
              <span class='title'>${this.title}</span>
              <div class='content'>
                <slot></slot>
                <iframe 
                class="youtube-video-container"
                width="100%"
                 height="315"
                  src="${this.videoURL}"
                   title="YouTube video player" 
                   frameborder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                   allowfullscreen
                   >
                </iframe>
              </div>
              <div class='button-container'>
                <button class='ok'>Close</button>
              </div>
            </div>
          </div>`;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(container);
    }

    _attachEventHandlers() {
        const okButton = this.shadowRoot.querySelector(".ok");
        okButton.addEventListener('click', e => {
            this.dispatchEvent(new CustomEvent("ok"))
            this.removeAttribute("visible");
        });
    }
}

window.customElements.define('modal-dialog', Modal);