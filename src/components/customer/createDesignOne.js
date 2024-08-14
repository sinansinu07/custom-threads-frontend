import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../Fabric.css';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { startGetCategoryProducts } from "../../actions/prodcutsAction";
import { fabric } from 'fabric';
import NavBar from '../NavBar';

export default function CreateDesignOne() {
    const dispatch = useDispatch();
    const [fabricImages, setFabricImages] = useState([]);
    const [selectedColor, setSelectedColor] = useState('#000000'); // add a state for the selected color
    const handleColorChange = (event) => {
        const hexColor = event.target.value;
        setSelectedColor(hexColor);

        fabricImages.forEach((image) => {
            image.filters = []; // Reset filters
            const colorFilter = new fabric.Image.filters.BlendColor({
                color: hexColor,
                mode: 'tint',
                alpha: 0.5
            });
            image.filters.push(colorFilter);
            image.applyFilters();
        });
    };
    const { categoryId, productId } = useParams();

    useEffect(() => {
        dispatch(startGetCategoryProducts(categoryId));
    }, [dispatch, categoryId]);

    const product = useSelector((state) => state.products.data.find(prod => prod._id === productId));

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    console.log('',currentSlide)
    useEffect(() => {
        if (product) {
            setImages([product.frontImage.image_url, product.backImage.image_url]);
        }
    }, [product]);

    useEffect(() => {
        const loadImages = async () => {
          const fabricImgArray = await Promise.all(
            images?.map((imgUrl) =>
              new Promise((resolve, reject) => {
                fabric.Image.fromURL(imgUrl, (img) => {
                  if (img) {
                    resolve(img)
                   
                  } else {
                    reject(new Error('Image failed to load'));
                  }
                },{ crossOrigin: 'anonymous' });
              })
            )
          );
          setFabricImages(fabricImgArray);
        };
    
        loadImages();
      }, [images]);
      console.log(fabricImages)
      console.log(images)


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
        beforeChange: (current, next) => setCurrentSlide(next),
    };

   
    
    const handlePrevClick = () => {
        sliderRef.current.slickPrev();
    };

    const handleNextClick = () => {
        sliderRef.current.slickNext();
    };

    const frontDesignCanvasRef = useRef(null);
    const fabricFrontDesignCanvasRef = useRef(null);
    const backDesignCanvasRef = useRef(null);
    const fabricBackDesignCanvasRef = useRef(null);

    useEffect(() => {
        if (product) {
          const frontDesignCanvas = frontDesignCanvasRef.current;
          const fabricFrontDesignCanvas = new fabric.Canvas(frontDesignCanvas, { width: 185, height: 275 });
          fabricFrontDesignCanvasRef.current = fabricFrontDesignCanvas;
      
          const backDesignCanvas = backDesignCanvasRef.current;
          const fabricBackDesignCanvas = new fabric.Canvas(backDesignCanvas, { width: 185, height: 275 });
          fabricBackDesignCanvasRef.current = fabricBackDesignCanvas;
        }
      }, [product]);

    useEffect(() => {
        const frontCanvas = document.getElementById('frontCanvas');
        const backCanvas = document.getElementById('backCanvas');
        if(frontCanvas&&backCanvas){
            if (currentSlide === 0) {
                frontCanvas.style.display = 'block';
                backCanvas.style.display = 'none';
            } else {
                frontCanvas.style.display = 'none';
                backCanvas.style.display = 'block';
            }
        }
       
    }, [currentSlide]);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const imgData = e.target.result;
            const fabricDesignCanvas = currentSlide === 0 ? fabricFrontDesignCanvasRef.current : fabricBackDesignCanvasRef.current;

            fabric.Image.fromURL(imgData, (img) => {
                const canvasWidth = fabricDesignCanvas.width;
                const canvasHeight = fabricDesignCanvas.height;
                const scaleFactor = Math.min(canvasWidth / img.width, canvasHeight / img.height);

                img.set({ scaleX: scaleFactor, scaleY: scaleFactor });
                fabricDesignCanvas.on('object:moving', (e) => {
                    const target = e.target;
                    const minX = 0;
                    const minY = 0;
                    const maxX = fabricDesignCanvas.width - target.getScaledWidth();
                    const maxY = fabricDesignCanvas.height - target.getScaledHeight();
                  
                    target.left = Math.max(minX, Math.min(target.left, maxX));
                    target.top = Math.max(minY, Math.min(target.top, maxY));
                  
                    // Toggle border style when object is moving
                    const canvasElement = document.getElementById(currentSlide === 0 ? 'frontCanvas' : 'backCanvas');
                    canvasElement.style.border = '2px dashed red';
                  });
                  
                  fabricDesignCanvas.on('object:modified', (e) => {
                    const target = e.target;
                    if (!target.isMoving) {
                      const canvasElement = document.getElementById(currentSlide === 0 ? 'frontCanvas' : 'backCanvas');
                      canvasElement.style.border = 'none';
                    }
                  });

                fabricDesignCanvas.add(img);
                fabricDesignCanvas.renderAll();
            });
        };
        reader.readAsDataURL(file);
    };

    const handleDelete = () => {
        const fabricDesignCanvas = currentSlide === 0 ? fabricFrontDesignCanvasRef.current : fabricBackDesignCanvasRef.current;
        const activeObject = fabricDesignCanvas.getActiveObject();
        if (activeObject) {
            fabricDesignCanvas.remove(activeObject);
            fabricDesignCanvas.renderAll();
        }
    };

    const handleAddText = () => {
        const fabricDesignCanvas = currentSlide === 0 ? fabricFrontDesignCanvasRef.current : fabricBackDesignCanvasRef.current;
        const text = new fabric.Textbox('Enter text', {
            left: 50,
            top: 50,
            width: 100,
            fontSize: 20,
            borderColor: 'black',
            editingBorderColor: 'red',
            cornerColor: 'green',
            cornerSize: 8,
        });

        fabricDesignCanvas.add(text);
        fabricDesignCanvas.setActiveObject(text);
        fabricDesignCanvas.renderAll();
    };

    const handleDownload = () => {
        const fabricDesignCanvas = currentSlide === 0 ? fabricFrontDesignCanvasRef.current : fabricBackDesignCanvasRef.current;
        const dataURL = fabricDesignCanvas.toDataURL({ format: 'png', quality: 1 });

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${currentSlide === 0 ? 'front' : 'back'}-design.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    return (
        <div>
            <NavBar />
            <h1>Create Design</h1>
            <div style={{ position: 'relative' }}>
                {product && (
                    <div className="d-flex flex-column justify-content-start align-items-center ml-3 mt-5" style={{ width: '40%' }}>
                        <h2 className="text-start">{product.name}</h2>
                        <div className="card mt-1" style={{ width: 475, height: 575 }}>
                        <Slider {...settings} ref={sliderRef}>
                            {fabricImages.map((image, index) => (
                                <div key={index}>
                                    <canvas
                                        ref={(canvas) => {
                                            const fabricCanvas = new fabric.Canvas(canvas, {
                                                width: 475,
                                                height: 575,
                                                selectable: false, // add this
                                                draggable: false, // add this
                                                resizable: false, // add this
                                            });
                                            fabricCanvas.add(image);
                                            fabricCanvas.renderAll();
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>
                            <div className='design-canvas'>
                               
                                <canvas
                                id="frontCanvas"
                                ref={frontDesignCanvasRef}
                                style={{ width: 185, height: 275, border: "none"}}
                                ><p>front</p></canvas>
                                <canvas
                                id="backCanvas"
                                ref={backDesignCanvasRef}
                                style={{ width: 185, height: 275,  border: "none" }}
                                ><p>back</p></canvas>
                                
                                
                            </div>
                            
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <button onClick={handlePrevClick} style={{ marginRight: '10px' }}>&lt;</button>
                            <span>{currentSlide === 0 ? 'Front View' : 'Back View'}</span>
                            <button onClick={handleNextClick} style={{ marginLeft: '10px' }}>&gt;</button>
                        </div>
                        <input type="file" onChange={handleImageUpload} style={{ margin: '10px 0' }} />
                        <button onClick={handleAddText} style={{ margin: '10px' }}>Add Text</button>
                        <button onClick={handleDelete} style={{ margin: '10px' }}>Delete Selected</button>
                        <button onClick={handleDownload} style={{ margin: '10px' }}>Download Design</button>
                        <input
                            type="color"
                            value={selectedColor}
                            onChange={handleColorChange}
                            style={{ margin: '10px' }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
