export const outletDetailsHbs = `
<div class="shop-form-container">
    <h2 class="text-center">{{mode}} Outlet</h2>
    
    <form id="outletForm" class="needs-validation" novalidate>
        <div class="mb-3">
            <label class="form-label"> Name</label>
            <input class="form-control" type="text" name="name" value="{{outlet.name}}" disabled>
        </div>
        <div class="mb-3">
            <label class="form-label">Manager</label>
            <input class="form-control" type="text" name="manager" value="{{outlet.manager}}" disabled>
        </div>
        <div class="mb-3">
            <label class="form-label">Address</label>
            <input class="form-control" type="text" name="address" value="{{outlet.address}}" disabled>
        </div>
        <div class="mb-3">
            <label class="form-label">Working Hours</label>
            <input class="form-control" type="text" name="duration" value="{{outlet.duration}}" disabled>
        </div>
        <div class="mb-3">
            <label class="form-label">Phone</label>
            <input class="form-control" type="tel" name="phone" value="{{outlet.phone}}" disabled>
        </div>
        <div class="form-actions">
            <a href="#" class="btn btn-secondary">Back</a>
        </div>
    </form>
</div>
`;