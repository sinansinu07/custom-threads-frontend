import { useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router";
import { startCreateProduct,startUpdateProduct } from "../../actions/prodcutsAction";
import AdminNavBar from "./AdminNavBar"

export default function CreateProduct (props){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {categoryId} = useParams()
    const products = useSelector((state) => {
        return state.products.data.find(ele => ele._id === props.editId)
    })
    const [form,setForm]=useState(products?{
        name:products.name,
        description:products.description,
        price:products.price,
        sizes:products.sizes,
        colors:products.colors,
        frontImage:products.frontImage.image_url,
        backImage:products.backImage.image_url
    }:{
        name:"",
        description:"",
        price:0.0,
        sizes:[],
        colors:[],
        frontImage:null,
        backImage:null
    }
    )
    const handleChange = (e) => {
        const { name} = e.target;
        setForm({...form, [name]: e.target.value });
        console.log(form)
    };

    const handleChangeSize = (e) => {
        const selectedSizes = [...form.sizes];
        const selectedIndex = selectedSizes.indexOf(e.target.value);
        if (selectedIndex > -1) {
            selectedSizes.splice(selectedIndex, 1);
        } else {
            selectedSizes.push(e.target.value);
        }
        setForm({...form, sizes: selectedSizes });
        console.log(selectedSizes)
    }
    const handleChangeColor = (e) => {
        const selectedColors = [...form.colors];
        const selectedIndex = selectedColors.indexOf(e.target.value);
        if (selectedIndex > -1) {
            selectedColors.splice(selectedIndex, 1);
        } else {
            selectedColors.push(e.target.value);
        }
        setForm({...form, colors: selectedColors });
        console.log()
    }
    const handleChangeFrontImage =(e)=>{
        setForm({...form, frontImage: e.target.files[0] });
    }
    const handleChangeBackImage =(e)=>{
        setForm({...form, backImage: e.target.files[0] });
    }

      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });
        console.log(formData)
        if(products){
            dispatch(startUpdateProduct(formData,categoryId,products._id,props.toggle))
        }else{
            dispatch(startCreateProduct(formData,categoryId,navigate));
        }
        
      };

    return (
        <div>
            <AdminNavBar />
            <div>
                <form>
                    <div className="form-group">
                        <label 
                            className="form-label"
                            htmlFor="name">Product Name
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            id="name"
                            name="name"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label 
                            className="form-label"
                            htmlFor="description">Product description
                        </label>
                        <input
                            type="text"
                            value={form.description}
                            onChange={handleChange}
                            id="description"
                            name="description"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label 
                            className="form-label"
                            htmlFor="price">Product price
                        </label>
                        <input
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            id="price"
                            name="price"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="sizes">Product sizes</label>
                        <select
                            multiple
                            value={form.sizes}
                            onChange={handleChangeSize}
                            id="sizes"
                            name="sizes"
                            className="form-control">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="colors">Product colors</label>
                        <select
                            multiple
                            value={form.colors}
                            onChange={handleChangeColor}
                            id="colors"
                            name="colors"
                            className="form-control">
                            <option value="black">black</option>
                            <option value="red">red</option>
                            <option value="violet">violet</option>
                            <option value="navy">navy blue</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="image">Product image front</label>
                        <input
                            type="file"
                            files={form.frontImage}
                            onChange={handleChangeFrontImage}
                            id="image"
                            name="images"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="image">Product image back</label>
                        <input
                            type="file"
                            files={form.backImage}
                            onChange={handleChangeBackImage}
                            id="image"
                            name="images"
                            className="form-control"
                        />
                    </div>
                    <input type="submit" onClick={handleSubmit}  className="btn btn-primary"/>
                </form>
            </div> 
            
        </div>
        
    )
}