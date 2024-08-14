import { useDispatch,useSelector} from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router"
import { startCreateCategory,startUpdateCategory } from "../../actions/categoriesAction"
import AdminNavBar from "./AdminNavBar"

export default function CreateCategory(props){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const categories = useSelector((state) => {
        return state.categories.data.find(ele => ele._id === props.editId)
    })
    const [form,setForm]=useState(categories?{
        name:categories.name,
        image:categories.image.image_url
    }:{
        name:"",
        image:null
    }
)

    const handleChange = (e) => {
        const { name } = e.target;
        if (name === "image") {
          setForm({...form, [name]: e.target.files[0] });
        } else {
          setForm({...form, [name]: e.target.value });
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });
        console.log(formData)
        if(categories){
            dispatch(startUpdateCategory(formData,categories._id,props.toggle))
        }else{
            dispatch(startCreateCategory(formData,navigate));
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
                            htmlFor="name">Category Name
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
                            htmlFor="image">image
                        </label>
                        <input
                            type="file"
                            files={form.image}
                            onChange={handleChange}
                            id="image"
                            name="image"
                            className="form-control"
                        />
                    </div>
                    <input type="submit" onClick={handleSubmit}  className="btn btn-primary"/>
                </form>
            </div>   
        </div>
    )
}