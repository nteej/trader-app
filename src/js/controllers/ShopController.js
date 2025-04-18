import Handlebars from 'handlebars';
import { shopFormHbs } from '../templates/shopForm.js';
import { shopDetailsHbs } from '../templates/shopDetails.js';

import router from '../router.js';

export default class ShopController {
    constructor(service) {
        this.service = service;
        this.selectedShop = null;
        this.mode = "Create";
        this.formTemplate = Handlebars.compile(shopFormHbs);
        this.detailsTemplate = Handlebars.compile(shopDetailsHbs);
        
    }

    async readById(shopId) {
        try {
            const response = await fetch(`${this.service.baseUrl}/shops/${shopId}`, {
                headers: this.service.getAuthHeaders()
            });
            
            if (!response.ok) throw new Error('Shop not found');
            
            const result = await response.json();
            if (result.status === 1) {
                this.selectedShop = result.data;
                return this.renderDetails();
            }
            throw new Error('Failed to load shop');
        } catch (error) {
            return `<p class="error">${error.message}</p>`;
        }
    }

    renderCreate() {
        this.mode = "Create";
        this.selectedShop = { name: '', address: '', outlets: [] };
        return this.formTemplate({
            shop: this.selectedShop,
            mode: this.mode
        });
    }

    async renderEdit(shopId) {
        try {
            const response = await fetch(`${this.service.baseUrl}/shops/${shopId}`, {
                headers: this.service.getAuthHeaders()
            });
            
            if (!response.ok) throw new Error('Shop not found');
            
            const result = await response.json();
            if (result.status === 1) {
                this.selectedShop = result.data;
                this.mode = "Update";
                return this.formTemplate({
                    shop: this.selectedShop,
                    mode: this.mode
                });
            }
            throw new Error('Failed to load shop');
        } catch (error) {
            return `<p class="error">${error.message}</p>`;
        }
    }

    renderForm() {
        return this.formTemplate({
            shop: this.selectedShop,
            mode: this.mode
        });
    }

    renderDetails() {
        return this.detailsTemplate({
            shop: this.selectedShop
        });
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const shopData = {
            name: formData.get('name'),
            address: formData.get('address'),
            owner: formData.get('owner'),
            postalCode: formData.get('postalCode'),
            phone: formData.get('phone'),
            outlets: this.getOutletsFromForm(formData)
        };

        if (this.mode === "Update") {
            shopData.id = this.selectedShop.id;
        }

        try {
            const response = await fetch(`${this.service.baseUrl}/shops${shopData.id ? '/'+shopData.id+'/update' : ''}`, {
                method: shopData.id ? 'PUT' : 'POST',
                headers: {
                    ...this.service.getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(shopData)
            });

            if (!response.ok) throw new Error('Failed to save shop');
            router.load('');
        } catch (error) {
            const errorMsg = document.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = error.message;
                errorMsg.classList.remove('hidden');
            }
        }
        
    }
    deleteShop = async (shopId) => {
        if (!confirm('Are you sure you want to delete this shop?')) return;

        try {
            const response = await fetch(`${this.service.baseUrl}/shops/${shopId}`, {
                method: 'DELETE',
                headers: this.service.getAuthHeaders()
            });

            if (!response.ok) throw new Error('Failed to delete shop');
            router.load('');
        } catch (error) {
            alert('Failed to delete shop: ' + error.message);
        }
    }

    getOutletsFromForm(formData) {
        const outlets = [];
        const outletCount = formData.get('outletCount');
        
        for (let i = 0; i < outletCount; i++) {
            if (formData.get(`outletName${i}`)) {
                outlets.push({
                    name: formData.get(`outletName${i}`),
                    address: formData.get(`outletAddress${i}`),
                    manager: formData.get(`outletManager${i}`),
                    duration: formData.get(`outletDuration${i}`),
                    phone: formData.get(`outletPhone${i}`)
                });
            }
        }
        return outlets;
    }

    addOutletField = () => {
        const outletContainer = document.getElementById('outletsContainer');
        const outletCount = document.getElementById('outletCount');
        const index = parseInt(outletCount.value);
        
        const outletHtml = `
            <div class="outlet-form" data-index="${index}">
                <h4>Outlet #${index + 1}</h4>
                <div class="form-group">
                    <input type="text" name="outletName${index}" placeholder="Outlet Name" required>
                </div>
                <div class="form-group">
                    <input type="text" name="outletAddress${index}" placeholder="Address" required>
                </div>
                <div class="form-group">
                    <input type="text" name="outletManager${index}" placeholder="Manager Name" required>
                </div>
                <div class="form-group">
                    <input type="text" name="outletDuration${index}" placeholder="Working Hours" required>
                </div>
                <div class="form-group">
                    <input type="tel" name="outletPhone${index}" placeholder="Phone Number" required>
                </div>
                <button type="button" class="btn btn-danger" onclick="removeOutlet(${index})">Remove Outlet</button>
            </div>
        `;
        
        outletContainer.insertAdjacentHTML('beforeend', outletHtml);
        outletCount.value = index + 1;
    }
   
    setupEventHandlers() {
        const form = document.getElementById('shopForm');
        if (form) {
            form.onsubmit = this.handleSubmit;
        }
        // Add delete handlers
        const deleteShopBtn = document.querySelector('.btn-danger[onclick*="deleteShop"]');
        if (deleteShopBtn) {
            deleteShopBtn.onclick = () => this.deleteShop(this.selectedShop.id);
        }
    }

    
}