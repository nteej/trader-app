import Handlebars from 'handlebars'
import { outletFormHbs } from '../templates/outletForm.js';
import { outletDetailsHbs } from '../templates/outletDetails.js';

import router from '../router.js';

export default class OutletController {
    constructor(service) {
        this.service = service;
        this.selectedOutlet = null;
        this.mode = "Create";
        this.formTemplate = Handlebars.compile(outletFormHbs);
        this.detailsTemplate = Handlebars.compile(outletDetailsHbs);
        this.shopId = null;
    }

    async readById(outletId) {
        try {
            const response = await fetch(`${this.service.baseUrl}/outlets/${outletId}`, {
                headers: this.service.getAuthHeaders()
            });

            if (!response.ok) throw new Error('Outlet not found');

            const result = await response.json();
            if (result.status === 1) {
                this.selectedOutlet = result.data;
                return this.renderDetails();
            }
            throw new Error('Failed to load shop');
        } catch (error) {
            return `<p class="error">${error.message}</p>`;
        }
    }

    renderCreate(shopId=null) {
        this.mode = "Create";
        this.selectedOutlet = { name: '', address: '',phone:'',manager:'',duration:'' };
        return this.formTemplate({
            outlet: this.selectedOutlet,
            shopId: shopId,
            mode: this.mode
        });
    }

    renderDetails() {
        return this.detailsTemplate({
            outlet: this.selectedOutlet,
            mode: "View"
        });
    }

    setupEventHandlers() {
        const form = document.getElementById('outletForm');
        if (form) {
            form.onsubmit = this.handleSubmit;
        }

        const addOutletBtn = document.getElementById('addOutlet');
        if (addOutletBtn) {
            addOutletBtn.onclick = this.addOutletField;
        }
        // Make editOutlet available globally
        window.editOutlet = this.editOutlet;
        window.deleteOutlet = this.deleteOutlet;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const message = document.querySelector('.error-message');
        const formData = new FormData(event.target);
        const outletData = {
            name: formData.get('name'),
            address: formData.get('address'),
            phone: formData.get('phone'),
            manager: formData.get('manager'),
            duration: formData.get('duration'),
            shopId:formData.get('shopId'),
        };

        try {
            const response = await fetch(`${this.service.baseUrl}/outlets/shop/${outletData.shopId}`, {
                method: 'POST',
                headers: {
                    ...this.service.getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(outletData)
            });
            if (response.ok){
                console.log(response);
                message.textContent = response.message;
                message.classList.remove('hidden');
                setTimeout(
                    router.load(''),2000
                )
                
            }else{
                throw new Error('Failed to save outlet');
            } 
            ;
        } catch (error) {
            message.textContent = error.message;
            message.classList.remove('hidden');
        }

    }
    async renderEdit(outletId) {
        try {
            const response = await fetch(`${this.service.baseUrl}/outlets/${outletId}`, {
                headers: this.service.getAuthHeaders()
            });
            
            if (!response.ok) throw new Error('Outlet not found');
            
            const result = await response.json();
            if (result.status === 1) {
                this.selectedOutlet = result.data;
                this.mode = "Update";
                return this.formTemplate({
                    outlet: this.selectedOutlet,
                    mode: this.mode
                });
            }
            throw new Error('Failed to load shop');
        } catch (error) {
            return `<p class="error">${error.message}</p>`;
        }
    }

    deleteOutlet = async (shopId, outletId) => {
        if (!confirm('Are you sure you want to delete this outlet?')) return;

        try {
            const response = await fetch(`${this.service.baseUrl}/shops/${shopId}/outlets/${outletId}`, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'include',
                headers: this.service.getAuthHeaders()
            });

            if (!response.ok) throw new Error('Failed to delete outlet');

            // Refresh the shop list
            this.findByName();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete outlet: ' + error.message);
        }
    }
    async renderOutletForm(shopId, outletId = null) {
        try {
            let outlet = { shopId };

            if (outletId) {
                const response = await fetch(
                    `${this.service.baseUrl}/shops/${shopId}/outlets/${outletId}`,
                    {
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'include',
                        headers: this.service.getAuthHeaders()
                    }
                );

                if (!response.ok) throw new Error('Outlet not found');

                const result = await response.json();
                if (result.status === 1) {
                    outlet = { ...result.data, shopId };
                } else {
                    throw new Error('Failed to load outlet');
                }
            }

            return this.outletTemplate({ outlet, shopId });
        } catch (error) {
            return `
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-circle"></i> ${error.message}
                </div>
            `;
        }
    }
}