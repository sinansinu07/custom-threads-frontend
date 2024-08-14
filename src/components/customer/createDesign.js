import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../Fabric.css'
import { useParams } from "react-router"
import { useSelector,useDispatch } from "react-redux"
import { useEffect,useState,useRef} from "react"
import { startGetCategoryProducts } from "../../actions/prodcutsAction"
import { fabric } from 'fabric';
import NavBar from '../NavBar';
export default function CreateDesign(){
    const dispatch = useDispatch()
    const {categoryId,productId} = useParams()
    useEffect(()=>{
        dispatch(startGetCategoryProducts(categoryId))
    },[])
    const product = useSelector((state)=>{
        return state.products.data.find(prod=> prod._id == productId)
    })
    const [images, setImages] = useState([]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        if (product) {
            setImages([
                product.frontImage.image_url,
                product.backImage.image_url
            ]);
        }
    }, [product]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(currentSlide);
        }
    }, [currentSlide]);
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        beforeChange: (current, next) => {
            setCurrentSlide(next);
        },
    };

    const handlePrevClick = () => {
        sliderRef.current.slickPrev();
    };

    const handleNextClick = () => {
        sliderRef.current.slickNext();
    };

    //fabric//
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);

    const designCanvasRef = useRef(null);
    const fabricDesignCanvasRef = useRef(null);

    const deleteButtonRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const fabricCanvas = new fabric.Canvas(canvas, {
            width: 400, // Set the width of the Fabric.js canvas
            height: 500 // Set the height of the Fabric.js canvas
        });
        fabricCanvasRef.current = fabricCanvas;

        const designCanvas = designCanvasRef.current;
        const fabricDesignCanvas = new fabric.Canvas(designCanvas, {
            width: 175, // Set the width of the Fabric.js canvas
            height: 250 // Set the height of the Fabric.js canvas
        });
        fabricDesignCanvasRef.current = fabricDesignCanvas;
        

        // Clean up fabric canvas instance on component unmount
        return () => {
            fabricCanvas.dispose();
            fabricDesignCanvas.dispose();
        };
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const imgData = e.target.result;
            fabric.Image.fromURL(imgData, (img) => {
                const fabricDesignCanvas = fabricDesignCanvasRef.current;
                const canvasWidth = fabricDesignCanvas.width;
                const canvasHeight = fabricDesignCanvas.height;

                // Calculate the scale factor to fit the image to the canvas size
                const scaleFactor = Math.min(canvasWidth / img.width, canvasHeight / img.height);

                // Set the image's scale properties to fit the canvas size
                img.set({
                    scaleX: scaleFactor,
                    scaleY: scaleFactor
                });
                

                fabricDesignCanvas.on('object:moving', function(e) {
                    var target = e.target; // Get the target object (in this case, the image)
                    var minX = 0;
                    var minY = 0;
                    var maxX = fabricDesignCanvas.width - target.getScaledWidth()  // Adjusted for scaleX
                    var maxY = fabricDesignCanvas.height - target.getScaledHeight()  // Adjusted for scaleY
                    console.log('moving')
                    // Restrict the movement of the target object within the canvas boundaries
                    if (target.left < minX) {
                      target.left = minX;
                    } else if (target.left > maxX) {
                      target.left = maxX;
                    }
                  
                    if (target.top < minY) {
                      target.top = minY;
                    } else if (target.top > maxY) {
                      target.top = maxY;
                    }
            
                    // if (target.bottom < minY) {
                    //   target.bottom = minY;
                    // } else if (target.bottom > maxY) {
                    //   target.bottom = maxY;
                    // }
                    
                  });

                fabricDesignCanvas.add(img); // Add the image object to the Fabric.js canvas instance
                fabricDesignCanvas.renderAll();
            });

            
        };
        reader.readAsDataURL(file);
    };

    const handleDelete = () => {
        const fabricDesignCanvas = fabricDesignCanvasRef.current;
        const activeObject = fabricDesignCanvas.getActiveObject();

        if (activeObject) {
            fabricDesignCanvas.remove(activeObject);
            fabricDesignCanvas.renderAll();
        }
    };
    return(
        <div>
            <NavBar/>
            <h1>Create Design</h1>
            <div style={{position: 'relative'}}> 
                 {product&&
                 <div className="d-flex flex-column justify-content-start align-items-center ml-3 mt-5" style={{ width: '40%' }}>
                    <h2 className="text-start">{product.name}</h2>
                    <div id = "" className="card mt-1" style={{ width: 400,height:500 }}>
                       

                                <Slider 
                                {...settings}
                                ref={sliderRef}
                                className=''
                                >
                                    {images&&images.map((image, index) => (
                                        <div  key={index}>
                                            <img src = {image} className="card-img-top" alt={`${product.name} `} style={{objectFit:'cover', padding:'5px'}}/>
                                        </div>
                                    ))}
                                </Slider>
                                <div className='design-canvas'>
                                    <canvas ref={designCanvasRef} style={{width:175,height:250,border:2,borderStyle:"dashed",borderColor:'red'}} id="canvas"></canvas>
                                </div>
                           
                    </div>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>
                        <button onClick={handlePrevClick} style={{marginRight:'10px'}}>&lt;</button>
                            <span>{currentSlide == 0? 'Front View' : 'Back View'}</span>
                        <button onClick={handleNextClick} style={{marginLeft:'10px'}}>&gt;</button>
                    </div>
                    <input type="file" onChange={handleImageUpload} />
                 </div>
                 }
            </div>
        </div>
    )
}