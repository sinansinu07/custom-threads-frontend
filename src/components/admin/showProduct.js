import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from "react-router"
import { useSelector,useDispatch } from "react-redux"
import { useEffect,useState } from "react"
import { startGetCategoryProducts } from "../../actions/prodcutsAction"
import AdminNavBar from "./AdminNavBar"

export default function ShowProduct(){
    const dispatch = useDispatch()
    const {categoryId,productId} = useParams()

    useEffect(()=>{
        dispatch(startGetCategoryProducts(categoryId))
    },[dispatch, categoryId])

    const product = useSelector((state)=>{
        return state.products.data.find(prod=> prod._id === productId)
    })

    const [images, setImages] = useState([]);
    useEffect(() => {
        if (product) {
            setImages([
                product.frontImage.image_url,
                product.backImage.image_url
            ]);
        }
    }, [product]);

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
    };
    return (
        <div>
            <AdminNavBar />
            <div>
                 {product&&
                 <div className="d-flex flex-column justify-content-start align-items-center ml-3 mt-5" style={{ width: '40%' }}>
                    <h2 className="text-start">{product.name}</h2>
                    <div className="card mt-1" style={{ width: '25rem',height:'40rem' }}>
                        
                        <Slider 
                        {...settings}
                        >
                            {images&&images.map((image, index) => (
                                <div key={index}>
                                    <img src = {image} className="card-img-top" alt={`${product.name} `} style={{height: '32rem', maxWidth: '100%', objectFit: 'cover', padding:'5px'}}/>
                                </div>
                            ))}
                        </Slider>
                        <h5>{product.description}</h5>
                        <div className="d-flex justify-content-between">
                            <div >
                            <p className="text-start">sizes: {product && product.sizes? product.sizes.map((ele)=>{ return ele.size+',' }) : ''}</p>
                            <p className="text-start">colors: {product && product.colors? product.colors.map((ele)=>{ return ele.color+',' }) : ''}</p>
                            </div>
                            <div>
                                <h6>price: {`${product.price}/-`}</h6>
                            </div>
                        </div>

                    </div>
                 </div>
                 }
            </div>

        </div>
    )
}