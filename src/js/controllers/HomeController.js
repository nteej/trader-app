import Handlebars from 'handlebars'
import { navbarHbs } from '../templates/navbar.js';
import { shopHbs } from '../templates/shop.js';


export default class HomeController {
    constructor(service) {
        this.service = service;
        this.navbarTemplate = Handlebars.compile(navbarHbs);
        this.shopsTemplate = Handlebars.compile(shopHbs);
    }

    render = () => {
        const username = localStorage.getItem('username') || 'User';
        return `
            ${this.navbarTemplate({
                isAuthenticated: this.service.token !== null,
                username: username,
                active: ''
            })}
            
            <div id="content">
                <div class="shops-container">
                    <h1 style="text-align: center;">My Business</h1>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="searchString" placeholder="Search shops..." aria-label="Recipient's username" aria-describedby="button-addon2">
                        <button class="btn btn-success"  type="button" id="button-addon2" >Refresh</button>
                    </div>
                </div>
                <div id="shops-list"></div>
            </div>
        `;
    }

    findByName = async (searchEvent) => {
        try {
            const searchTerm = searchEvent?.target?.value || '';
            const response = await fetch(`${this.service.baseUrl}/shops/search?q=${encodeURIComponent(searchTerm)}`, {
                headers: this.service.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Failed to fetch shops');
            }

            const result = await response.json();
            
            if (result.status === 1 && result.data) {
                document.getElementById('shops-list').innerHTML = 
                    this.shopsTemplate({ shops: result.data });
            } else {
                document.getElementById('shops-list').innerHTML = 
                    '<p class="error">No shops found</p>';
            }
        } catch (error) {
            console.error('Error fetching shops:', error);
            document.getElementById('shops-list').innerHTML = 
                '<p class="error">Failed to load shops</p>';
        }
    }
    
}