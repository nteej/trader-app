export const outletFormHbs = `
<div class="shop-form-container">
    <h2 class="text-center">{{mode}} Outlet</h2>
    
    <form id="outletForm" class="needs-validation" novalidate>
        <div class="mb-3">
            <label class="form-label"> Name</label>
            <input class="form-control" type="text" name="name" value="{{outlet.name}}" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Manager</label>
            <input class="form-control" type="text" name="manager" value="{{outlet.manager}}" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Address</label>
            <input class="form-control" type="text" name="address" value="{{outlet.address}}" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Working Hours</label>
            <input class="form-control" type="text" name="duration" value="{{outlet.duration}}" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Phone</label>
            <input class="form-control" type="tel" name="phone" value="{{outlet.phone}}" required>
        </div>
        
        <input type="hidden" name="shopId" value="{{shopId}}">
        
        <div class="error-message hidden"></div>
        
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">{{mode}} Outlet</button>
            <a href="#" class="btn btn-secondary">Back</a>
        </div>
    </form>
</div>
`;