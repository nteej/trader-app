export const shopDetailsHbs = `
<div class="shop-details-container">
    <div class="shop-details-header">
        <div class="header-content">
            <h1>{{shop.name}}</h1>
            <p class="address"><i class="fa fa-map-marker-alt"></i> {{shop.address}}</p>
            <p class="created-at">Created: {{formatDate shop.createdAt}}</p>
        </div>
        <div class="btn-group" role="group" aria-label="">
            <button type="button" class="btn btn-warning">Edit</button>
            <button type="button" class="btn btn-danger">Delete</button>
        </div>
    </div>

    <div class="outlets-section">
        <div class="section-header">
            <h2>Outlets</h2>
            <span class="outlet-count">{{shop.outlets.length}} locations</span>
        </div>

        <div class="outlets-grid">
            {{#each shop.outlets}}
            <div class="outlet-card">
                <div class="outlet-header">
                    <h3>{{name}}</h3>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btn btn-warning" onclick="editOutlet('{{../shop.id}}', '{{id}}')">Edit</i></button>
                        <button type="button" class="btn btn-danger" onclick="deleteOutlet('{{../shop.id}}', '{{id}}')">Delete</button>
                    </div>
                </div>
                
                <div class="outlet-info">
                    <p><i class="fa fa-map-marker-alt"></i> {{address}}</p>
                    <p><i class="fa fa-user"></i> Manager: {{manager}}</p>
                    <p><i class="fa fa-clock"></i> {{duration}}</p>
                    <p><i class="fa fa-phone"></i> <a href="tel:{{phone}}">{{phone}}</a></p>
                </div>
            </div>
            {{/each}}
        </div>
    </div>

    <div class="shop-actions">
        <a href="#" class="btn btn-link">Back to Shops</a>
    </div>
</div>
`;