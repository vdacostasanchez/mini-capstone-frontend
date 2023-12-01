export function ProductShow(props) {
  console.log(props, props.product);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateProduct(props.product.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyProduct(props.product);
  };
  return (
    <div>
      <h1>{props.product.name}</h1>
      <img src={props.product.images[0].url} id="modal-img" />
      <p>{props.product.description}</p>
      <p>{props.product.categories[0].name}</p>
      <p>{props.product.price}</p>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input defaultValue={props.product.name} name="name" type="text" />
        </div>
        <div>
          Description: <input defaultValue={props.product.description} name="description" type="text" />
        </div>
        <div>
          Price: <input defaultValue={props.product.price} name="price" type="number" />
        </div>
        <div>
          Supplier:{" "}
          <select defaultValue={props.product.supplier_id} name="supplier_id" id="supplier">
            <option value="1">A24</option>
            <option value="2">Disney</option>
            <option value="3">Warner Bros</option>
            <option value="4">Pixar</option>
          </select>
        </div>
        <div>
          Image url: <input defaultValue={props.product.images[0].url} name="image_url" type="text" />
        </div>
        <div>
          Categories: <input defaultValue={props.product.categories[0].name} name="categories" type="text" />
        </div>
        <button type="submit">Update Product</button>
      </form>

      <button onClick={handleClick}>Destroy Product</button>
    </div>
  );
}
