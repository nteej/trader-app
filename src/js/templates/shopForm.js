export const shopFormHbs = `
<div class="shop-form-container" >
    <h2 style="text-align:center">{{#if shop.id}}Edit{{else}}Create New{{/if}} Shop</h2>
    
    <form id="shopForm">
        <div class="mb-3">
            <label class="form-label">Shop</label>
            <input class="form-control" type="text" name="name" value="{{shop.name}}" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Owner</label>
            <input class="form-control" type="text" name="owner" value="{{shop.owner}}" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Address</label>
            <input class="form-control" type="text" name="address" value="{{shop.address}}">
        </div>
        <div class="mb-3">
            <label class="form-label">PostCode</label>
            <input class="form-control" type="text" name="postalCode" value="{{shop.postalCode}}">
        </div>
        <div class="mb-3">
            <label class="form-label">Phone</label>
            <input class="form-control" type="text" name="phone" value="{{shop.phone}}">
        </div>
        <div class="error-message hidden"></div>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="submit" class="btn btn-success">Submit</button>
            <button type="reset" class="btn btn-warning">Undo</button>
            <a type="button" class="btn btn-info" href="#">Home</a>
        </div>
        
    </form>
</div>
`;