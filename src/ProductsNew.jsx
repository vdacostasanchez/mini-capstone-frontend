export function ProductsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateProduct(params, () => event.target.reset());
  };
  return (
    <div>
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <div>
          Price: <input name="price" type="number" />
        </div>
        <div>
          Supplier:{" "}
          <select name="supplier_id" id="supplier">
            <option value="1">A24</option>
            <option value="2">Disney</option>
            <option value="3">Warner Bros</option>
            <option value="4">Pixar</option>
          </select>
        </div>
        <div>
          Image url: <input name="image_url" type="text" />
        </div>
        <div>
          Categories: <input name="categories" type="text" />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
